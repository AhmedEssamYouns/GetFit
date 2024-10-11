import React, { useState, useEffect, useRef } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Animated } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import GradientBackground from '../components/GradientBackground';
import colors from '../consts/colors';
import Header from '../components/header';
import SuggestProgramModal from '../components/SuggestProgramModal';
import ChooseProgramModal from '../components/ChooseProgramModal';

type RootStackParamList = {
  'Suggested Workout': { plan: string; level: string };
  GetProgram: undefined;
};

type GetProgramNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GetProgram'
>;

type GetProgramProps = {
  navigation: GetProgramNavigationProp;
};

const GetProgram: React.FC<GetProgramProps> = ({ navigation }) => {
  const [suggestProgramModalVisible, setSuggestProgramModalVisible] =
    useState<boolean>(false);
  const [chooseProgramModalVisible, setChooseProgramModalVisible] =
    useState<boolean>(false);

  const [days, setDays] = useState<string>('');
  const [level, setLevel] = useState<string>('Beginner');
  const [programLevel, setProgramLevel] = useState<string>('Beginner');
  const [programPlan, setProgramPlan] = useState<string>('');

  const opacityMotivational = useRef(new Animated.Value(0)).current;
  const opacitySuggest = useRef(new Animated.Value(0)).current;
  const opacityChoose = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(opacityMotivational, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacitySuggest, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(opacityChoose, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start();
  }, [opacityMotivational, opacitySuggest, opacityChoose]);

  const suggestPlan = (days: string, level: string) => {
    const numDays = parseInt(days);
    let suggestedPlan = '';
    if (numDays === 1 || numDays === 2) {
      suggestedPlan = 'Upper-Lower Split';
    } else if (numDays === 3 || numDays === 4) {
      suggestedPlan = 'Push-Pull-Legs';
    } else if (numDays >= 5) {
      suggestedPlan = 'Pro Split';
    }

    setProgramPlan(suggestedPlan);
    setSuggestProgramModalVisible(false);
    navigation.navigate('Suggested Workout', { plan: suggestedPlan, level });
  };

  return (
    <GradientBackground>
      <Header text={'Program'} arrowBack={true} onBackPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <Animated.Text style={[styles.hintText, { opacity: opacityMotivational }]}>
          Start your fitness journey by selecting or getting a program!
        </Animated.Text>

        <Animated.Text style={[styles.motivationalText, { opacity: opacitySuggest }]}>
          Click here to suggest a plan based on your daily routine!
        </Animated.Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setSuggestProgramModalVisible(true)}
        >
          <Text style={styles.buttonText}>Suggest Program</Text>
        </TouchableOpacity>

        <Animated.Text style={[styles.motivationalText, { opacity: opacityChoose }]}>
          Or choose a program that suits you!
        </Animated.Text>

        <TouchableOpacity
          style={styles.button}
          onPress={() => setChooseProgramModalVisible(true)}
        >
          <Text style={styles.buttonText}>Choose Program</Text>
        </TouchableOpacity>

        <SuggestProgramModal
          visible={suggestProgramModalVisible}
          onClose={() => setSuggestProgramModalVisible(false)}
          onSuggest={suggestPlan}
          level={level}
          setLevel={setLevel}
          days={days}
          setDays={setDays}
        />

        <ChooseProgramModal
          visible={chooseProgramModalVisible}
          onClose={() => setChooseProgramModalVisible(false)}
          onChoose={(plan, level) => {
            setProgramPlan(plan);
            setProgramLevel(level);
            navigation.navigate('Suggested Workout', { plan, level });
          }}
          programLevel={programLevel}
          setProgramLevel={setProgramLevel}
          programPlan={programPlan}
          setProgramPlan={setProgramPlan}
        />
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  motivationalText: {
    fontSize: 18,
    color: '#fff',
    marginTop:20,
    backgroundColor: colors.cardBackgroundColor,
    padding: 15,
    borderRadius: 20,
    marginHorizontal: 20,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  hintText: {
    fontSize: 24,
    fontStyle:'italic',
    color: '#fff',
    marginBottom: 60,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: colors.header,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: colors.primaryButtonColor,
    padding: 15,
    margin: 10,
    borderRadius: 25,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default GetProgram;
