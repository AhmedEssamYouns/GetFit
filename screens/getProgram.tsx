import React, { useState } from 'react';
import { View, TouchableOpacity, StyleSheet ,Text} from 'react-native';
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
        <TouchableOpacity
          style={styles.button}
          onPress={() => setSuggestProgramModalVisible(true)}
        >
        <Text style={styles.buttonText}>Suggest Program</Text>
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
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
