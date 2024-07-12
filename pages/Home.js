import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput } from 'react-native';
import BodyScreen from './BodyScreen';

export default function HomeScreen({ navigation }) {

  const [showWaterModal, setShowWaterModal] = useState(false);
  const [showProteinModal, setShowProteinModal] = useState(false);
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [bmi, setBmi] = useState('');
  const [waterResult, setWaterResult] = useState('');
  const [proteinResult, setProteinResult] = useState('');
  const [caloriesResult, setCaloriesResult] = useState('');

  const openWaterModal = () => {
    setShowWaterModal(true);
  };

  const closeWaterModal = () => {
    setShowWaterModal(false);
    setWeight('');
    setWaterResult('');
  };

  const openProteinModal = () => {
    setShowProteinModal(true);
  };

  const closeProteinModal = () => {
    setShowProteinModal(false);
    setWeight('');
    setHeight('');
    setProteinResult('');
    setBmi('')
    setCaloriesResult('');
  };

  const calculateWater = () => {
    if (!weight) {
      alert('Please enter weight to calculate.');
      return;
    }

    const waterNeeded = weight * 30; // Example calculation: 30 ml per kg of body weight
    setWaterResult(`Water needed per day: ${waterNeeded.toFixed(2)} ml`);
  };

  const calculateProteinAndCalories = (goal) => {
    if (!weight || !height) {
      alert('Please enter weight and height to calculate.');
      return;
    }

    let proteinNeeded;
    let caloriesNeeded;

    // BMI calculation
    const bmi = weight / ((height / 100) ** 2);

    // Calculate BMR (Basal Metabolic Rate) using Mifflin-St Jeor equation
    let bmr;
    if (goal === 'gainMuscleWeight') {
      bmr = 10 * weight + 6.25 * height - 5 * 30 + 5; // Example calculation for a 30-year-old male
    } else if (goal === 'loseWeightGainMuscle') {
      bmr = 10 * weight + 6.25 * height - 5 * 30 - 161; // Example calculation for a 30-year-old female
    } else if (goal === 'gainPureMuscle') {
      bmr = 10 * weight + 6.25 * height - 5 * 30 + 5; // Example calculation for a 30-year-old male
    }

    // Calculate TDEE (Total Daily Energy Expenditure)
    const activityFactor = 1.2; // Assuming sedentary lifestyle for example
    const tdee = bmr * activityFactor;

    // Adjust caloriesNeeded based on goal
    if (goal === 'gainMuscleWeight') {
      caloriesNeeded = tdee + 500; // Example: Increase by 500 calories for gaining muscle and weight
    } else if (goal === 'loseWeightGainMuscle') {
      caloriesNeeded = tdee - 500; // Example: Decrease by 500 calories for losing weight and gaining muscle
    } else if (goal === 'gainPureMuscle') {
      caloriesNeeded = tdee + 300; // Example: Increase by 300 calories for gaining pure muscle
    }

    // Calculate proteinNeeded based on goal
    if (goal === 'gainMuscleWeight') {
      proteinNeeded = weight * 2.2; // Example: Protein needed for gaining muscle and weight
    } else if (goal === 'loseWeightGainMuscle') {
      proteinNeeded = weight * 1.8; // Example: Protein needed for losing weight and gaining muscle
    } else if (goal === 'gainPureMuscle') {
      proteinNeeded = weight * 2.5; // Example: Protein needed for gaining pure muscle
    }

    // Display or use the calculated values as needed
    setBmi(bmi.toFixed(2))
    setProteinResult(`Protein needed: ${proteinNeeded.toFixed(2)} grams`);
    setCaloriesResult(`Calories needed per day: ${caloriesNeeded.toFixed(2)} kcal`);
  };


  
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 15 }}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GetPlan')}>
          <Text style={styles.buttonText}>Get A Program</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CustomizePlan')}>
          <Text style={styles.buttonText}>Customize A Program</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('MyPlan')}>
          <Text style={styles.buttonText}>My Program</Text>
        </TouchableOpacity>
      </View>

      {/* Water Modal */}
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

      {/* Protein Modal */}
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

      {/* Buttons for Calculating Water and Protein */}
      <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 15 }}>
        <TouchableOpacity style={styles.button} onPress={openWaterModal}>
          <Text style={styles.buttonText}>Calculate Water</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={openProteinModal}>
          <Text style={styles.buttonText}>Calculate Protein</Text>
        </TouchableOpacity>
      </View>
      <BodyScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    paddingHorizontal: 20,
  },
  button: {
    backgroundColor: 'tomato',
    paddingVertical: 8,
    paddingHorizontal:1,
    marginHorizontal: 3,
    borderRadius: 10,
    width: 110,
    alignItems: 'center',
    elevation: 2,
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
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    marginBottom: 10,
  },
  modalButton: {
    backgroundColor: 'tomato',
    padding: 7,
    marginVertical: 5,
    borderRadius: 10,
    width: 150,
    alignItems: 'center',
    elevation: 2,
  },
  resultText: {
    fontSize: 14,
    marginTop: 10,
  },
});
