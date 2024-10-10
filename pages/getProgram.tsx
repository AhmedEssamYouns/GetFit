import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';

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

  const levels: string[] = ['Beginner', 'Intermediate', 'Advanced'];
  const plans: string[] = ['Push-Pull-Legs', 'Pro Split', 'Arnold Split'];

  const suggestPlan = (days: string) => {
    const numDays = parseInt(days);
    if (isNaN(numDays) || numDays < 1) {
      Alert.alert('Invalid Input', 'Please enter a valid number of days.');
      return;
    }

    let suggestedPlan = '';
    if (numDays === 1 || numDays === 2) {
      suggestedPlan = 'Upper-Lower Split';
    } else if (numDays === 3 || numDays === 4) {
      suggestedPlan = 'Push-Pull-Legs';
    } else if (numDays >= 5) {
      suggestedPlan = 'Pro Split';
    }

    setProgramPlan(suggestedPlan);
    setProgramLevel(level);
    setSuggestProgramModalVisible(false);
    navigation.navigate('Suggested Workout', { plan: suggestedPlan, level });
  };

  return (
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

      <Modal
        animationType="slide"
        transparent={true}
        visible={suggestProgramModalVisible}
        onRequestClose={() => {
          setSuggestProgramModalVisible(!suggestProgramModalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => setSuggestProgramModalVisible(false)}
        >
          <TouchableOpacity style={styles.modalView} activeOpacity={1}>
            <Text style={styles.modalText}>
              Enter days you are free to workout:
            </Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., 3"
              keyboardType="numeric"
              value={days}
              onChangeText={setDays}
            />
            <Text style={styles.modalText}>Choose your level:</Text>
            <View style={styles.buttonGroup}>
              {levels.map((lvl) => (
                <TouchableOpacity
                  key={lvl}
                  style={[
                    styles.levelButton,
                    level === lvl && styles.selectedButton,
                  ]}
                  onPress={() => setLevel(lvl)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      level === lvl && styles.selectedButtonText,
                    ]}
                  >
                    {lvl}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                suggestPlan(days);
              }}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={chooseProgramModalVisible}
        onRequestClose={() => {
          setChooseProgramModalVisible(!chooseProgramModalVisible);
        }}
      >
        <TouchableOpacity
          style={styles.modalContainer}
          activeOpacity={1}
          onPressOut={() => setChooseProgramModalVisible(false)}
        >
          <TouchableOpacity style={styles.modalView} activeOpacity={1}>
            <Text style={styles.modalText}>Choose your level:</Text>
            <View style={styles.buttonGroup}>
              {levels.map((lvl) => (
                <TouchableOpacity
                  key={lvl}
                  style={[
                    styles.levelButton,
                    programLevel === lvl && styles.selectedButton,
                  ]}
                  onPress={() => setProgramLevel(lvl)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      programLevel === lvl && styles.selectedButtonText,
                    ]}
                  >
                    {lvl}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <Text style={styles.modalText}>Choose your plan:</Text>
            <View style={styles.buttonGroup}>
              {plans.map((plan) => (
                <TouchableOpacity
                  key={plan}
                  style={[
                    styles.levelButton,
                    programPlan === plan && styles.selectedButton,
                  ]}
                  onPress={() => setProgramPlan(plan)}
                >
                  <Text
                    style={[
                      styles.buttonText,
                      programPlan === plan && styles.selectedButtonText,
                    ]}
                  >
                    {plan}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                setChooseProgramModalVisible(false);
                navigation.navigate('Suggested Workout', {
                  plan: programPlan,
                  level: programLevel,
                });
              }}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  button: {
    backgroundColor: 'tomato',
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  levelButton: {
    backgroundColor: 'lightgray',
    padding: 10,
    margin: 5,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'tomato',
  },
  selectedButtonText: {
    color: '#fff',
  },
});

export default GetProgram;
