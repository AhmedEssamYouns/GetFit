import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import BodyScreen from '../components/BodyChart';
import GradientBackground from '../components/GradientBackground';
import colors from '../consts/colors';
import Header from '../components/header';
import WaterIntakeModal from '../components/WaterIntakeModal';
import ProteinAndCaloriesModal from '../components/ProteinAndCaloriesModal';

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

  const calculateWater = (weight: string): void => {
    if (!weight) {
      alert('Please enter weight to calculate.');
      return;
    }

    const waterNeeded = parseFloat(weight) * 30;
    setWaterResult(`Water needed per day: ${waterNeeded.toFixed(2)} ml`);
  };

  const calculateProteinAndCalories = (weight: string, height: string, goal: string): void => {
    if (!weight || !height) {
      alert('Please enter weight and height to calculate.');
      return;
    }

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    const proteinNeeded = goal === 'gainMuscleWeight' ? weightNum * 1.5 : weightNum * 1.2;
    const caloriesNeeded = goal === 'gainMuscleWeight' ? weightNum * 30 : weightNum * 25;

    setProteinResult(`Protein needed: ${proteinNeeded.toFixed(2)} g`);
    setCaloriesResult(`Calories needed: ${caloriesNeeded.toFixed(2)} kcal`);
  };

  return (
    <GradientBackground>
      <Header text="Home" />
      <View style={styles.buttonContainer}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Program')}>
            <Text style={styles.buttonText}>Get A Program</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Create Workout')}>
            <Text style={styles.buttonText}>Customize A Program</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity style={styles.button} onPress={openWaterModal}>
            <Text style={styles.buttonText}>Water Intake</Text>
          </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={openProteinModal}>
          <Text style={styles.buttonText}>Protein Intake</Text>
        </TouchableOpacity>
        </View>

      </View>
      <BodyScreen />

      <WaterIntakeModal
        visible={showWaterModal}
        onClose={closeWaterModal}
        onCalculate={calculateWater}
        waterResult={waterResult}
      />
      <ProteinAndCaloriesModal
        visible={showProteinModal}
        onClose={closeProteinModal}
        onCalculate={calculateProteinAndCalories}
        proteinResult={proteinResult}
        caloriesResult={caloriesResult}
      />
    </GradientBackground>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: '90%',
    marginVertical: 20,
    alignItems:'center'
  },
  button: {
    backgroundColor: colors.Button,
    padding: 10,
    margin: 5,
    alignItems:'center',
    width:170,
    borderRadius: 15,
  },
  buttonText: {
    color: colors.buttonTextColor,
  },
});
