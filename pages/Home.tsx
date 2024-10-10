import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import BodyScreen from '../components/BodyChart';
import GradientBackground from '../components/GradientBackground';
import colors from '../consts/colors';
import Header from '../components/header';
type HomeScreenProps = {
  navigation: StackNavigationProp<any>;
};

export default function HomeScreen({ navigation }: HomeScreenProps) {

  const [showWaterModal, setShowWaterModal] = useState<boolean>(false);
  const [showProteinModal, setShowProteinModal] = useState<boolean>(false);
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [bmi, setBmi] = useState<string>('');
  const [waterResult, setWaterResult] = useState<string>('');
  const [proteinResult, setProteinResult] = useState<string>('');
  const [caloriesResult, setCaloriesResult] = useState<string>('');

  const openWaterModal = (): void => {
    setShowWaterModal(true);
  };

  const closeWaterModal = (): void => {
    setShowWaterModal(false);
    setWeight('');
    setWaterResult('');
  };

  const openProteinModal = (): void => {
    setShowProteinModal(true);
  };

  const closeProteinModal = (): void => {
    setShowProteinModal(false);
    setWeight('');
    setHeight('');
    setProteinResult('');
    setBmi('');
    setCaloriesResult('');
  };

  const calculateWater = (): void => {
    if (!weight) {
      alert('Please enter weight to calculate.');
      return;
    }

    const waterNeeded = parseFloat(weight) * 30; 
    setWaterResult(`Water needed per day: ${waterNeeded.toFixed(2)} ml`);
  };

  const calculateProteinAndCalories = (goal: string): void => {
    if (!weight || !height) {
      alert('Please enter weight and height to calculate.');
      return;
    }

    const parsedWeight = parseFloat(weight);
    const parsedHeight = parseFloat(height);

    let proteinNeeded: number;
    let caloriesNeeded: number;

    // BMI calculation
    const bmi = parsedWeight / ((parsedHeight / 100) ** 2);

    // Calculate BMR (Basal Metabolic Rate)
    let bmr: number;
    if (goal === 'gainMuscleWeight') {
      bmr = 10 * parsedWeight + 6.25 * parsedHeight - 5 * 30 + 5; 
    } else if (goal === 'loseWeightGainMuscle') {
      bmr = 10 * parsedWeight + 6.25 * parsedHeight - 5 * 30 - 161;
    } else if (goal === 'gainPureMuscle') {
      bmr = 10 * parsedWeight + 6.25 * parsedHeight - 5 * 30 + 5;
    }

    const activityFactor = 1.2; 
    const tdee = bmr * activityFactor;

    if (goal === 'gainMuscleWeight') {
      caloriesNeeded = tdee + 500;
    } else if (goal === 'loseWeightGainMuscle') {
      caloriesNeeded = tdee - 500; 
    } else if (goal === 'gainPureMuscle') {
      caloriesNeeded = tdee + 300; 
    }

    if (goal === 'gainMuscleWeight') {
      proteinNeeded = parsedWeight * 2.2; 
    } else if (goal === 'loseWeightGainMuscle') {
      proteinNeeded = parsedWeight * 1.8; 
    } else if (goal === 'gainPureMuscle') {
      proteinNeeded = parsedWeight * 2.5; 
    }

    setBmi(bmi.toFixed(2));
    setProteinResult(`Protein needed: ${proteinNeeded.toFixed(2)} grams`);
    setCaloriesResult(`Calories needed per day: ${caloriesNeeded.toFixed(2)} kcal`);
  };

  return (
    <GradientBackground>
    <View style={styles.container}>
    <Header text='Home'/>

      <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 15 }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Program')}>
          <Text style={styles.buttonText}>Get A Program</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Create Workout')}>
          <Text style={styles.buttonText}>Customize A Program</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('My Program')}>
          <Text style={styles.buttonText}>My Program</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={showWaterModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Calculate Water Intake</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your weight (kg)"
              keyboardType="numeric"
              onChangeText={(text) => setWeight(text)}
            />
            <TouchableOpacity style={styles.modalButton} onPress={calculateWater}>
              <Text style={styles.buttonText}>Calculate</Text>
            </TouchableOpacity>
            <Text style={styles.resultText}>{waterResult}</Text>
            <TouchableOpacity style={[styles.modalButton, { marginTop: 15 }]} onPress={closeWaterModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal visible={showProteinModal} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Calculate Protein and Calories Intake</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your weight (kg)"
              keyboardType="numeric"
              onChangeText={(text) => setWeight(text)}
            />
            <TextInput
              style={styles.input}
              placeholder="Enter your height (cm)"
              keyboardType="numeric"
              onChangeText={(text) => setHeight(text)}
            />
            <TouchableOpacity style={styles.modalButton} onPress={() => calculateProteinAndCalories('gainMuscleWeight')}>
              <Text style={styles.buttonText}>Gain Muscle and Weight</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => calculateProteinAndCalories('loseWeightGainMuscle')}>
              <Text style={styles.buttonText}>Lose Weight and Gain Muscle</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => calculateProteinAndCalories('gainPureMuscle')}>
              <Text style={styles.buttonText}>Gain Pure Muscle</Text>
            </TouchableOpacity>
            <Text style={styles.resultText}>{proteinResult}</Text>
            <Text style={styles.resultText}>{caloriesResult}</Text>
            <TouchableOpacity style={[styles.modalButton, { marginTop: 15 }]} onPress={closeProteinModal}>
              <Text style={styles.buttonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 15 }}>
        <TouchableOpacity style={styles.button} onPress={openWaterModal}>
          <Text style={styles.buttonText}>Calculate Water</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openProteinModal}>
          <Text style={styles.buttonText}>Calculate Protein</Text>
        </TouchableOpacity>
      </View>
      <BodyScreen />
    </View>
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: colors.Button,
    marginHorizontal: 3,
    padding:10,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 4,
  },
  buttonText: {
    fontSize: 10,
    color: '#ffffff',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    width: 200,
    height: 40,
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  modalButton: {
    backgroundColor: 'tomato',
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
  },
  resultText: {
    marginTop: 10,
    fontSize: 16,
  },
});
