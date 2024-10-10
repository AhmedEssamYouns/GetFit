import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, FlatList } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MuscleButtons from '../components/MuscleButtons';
import WorkoutList from '../components/WorkoutList';
import Chart from '../components/TrackChart';
import Header from '../components/header';
import GradientBackground from '../components/GradientBackground';


const muscles = [
  { label: "Forearm", value: "forearm" },
  { label: "Abs", value: "abs" },
  { label: "Chest", value: "chest" },
  { label: "Trapezius", value: "trapezius" },
  { label: "Upper-back", value: "upper-back" },
  { label: "Lower-back", value: "lower-back" },
  { label: "Biceps", value: "biceps" },
  { label: "Triceps", value: "triceps" },
  { label: "Back-deltoids", value: "back-deltoids" },
  { label: "Front-deltoids", value: "front-deltoids" },
  { label: "Obliques", value: "obliques" },
  { label: "Adductor", value: "adductor" },
  { label: "Hamstring", value: "hamstring" },
  { label: "Quadriceps", value: "quadriceps" },
  { label: "Abductors", value: "abductors" },
  { label: "Calves", value: "calves" },
  { label: "Gluteal", value: "gluteal" },
  { label: "Head", value: "head" },
  { label: "Neck", value: "neck" },
];

const ExerciseScreen: React.FC = () => {
  const [currentMuscle, setCurrentMuscle] = useState(muscles[0].value);
  const [currentWeight, setCurrentWeight] = useState('');
  const [workouts, setWorkouts] = useState<Record<string, Array<{ workoutNumber: number; weight: number }>>>({});

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        const jsonWorkouts = await AsyncStorage.getItem('workouts');
        if (jsonWorkouts !== null) {
          setWorkouts(JSON.parse(jsonWorkouts));
        }
      } catch (error) {
        console.error('Error loading workouts from AsyncStorage:', error);
      }
    };

    loadWorkouts();
  }, []);

  useEffect(() => {
    const saveWorkouts = async () => {
      try {
        await AsyncStorage.setItem('workouts', JSON.stringify(workouts));
      } catch (error) {
        console.error('Error saving workouts to AsyncStorage:', error);
      }
    };

    saveWorkouts();
  }, [workouts]);

  const handleSaveWorkout = () => {
    if (currentMuscle && currentWeight) {
      const workoutNumber = (workouts[currentMuscle]?.length || 0) + 1;
      const newWorkout = { workoutNumber, weight: parseFloat(currentWeight) };

      setWorkouts(prevWorkouts => ({
        ...prevWorkouts,
        [currentMuscle]: [...(prevWorkouts[currentMuscle] || []), newWorkout],
      }));

      setCurrentWeight('');
    }
  };

  const getLatestWeight = (muscleWorkouts: Array<{ workoutNumber: number; weight: number }>) => {
    if (!muscleWorkouts || muscleWorkouts.length === 0) return 0;
    return muscleWorkouts[muscleWorkouts.length - 1].weight;
  };

  const muscleData = muscles.map(muscle => {
    const latestWeight = getLatestWeight(workouts[muscle.value]);
    const intensity = latestWeight >= 90 ? 5 : latestWeight >= 70 ? 4 : latestWeight >= 50 ? 3 : latestWeight >= 30 ? 2 : 1;
    return {
      slug: muscle.value,
      intensity,
    };
  });

  const dataPoints = (workouts[currentMuscle] || []).map((workout, index) => ({
    day: `${index + 1}`,
    value: workout.weight,
  }));

  const maxDataPoint = Math.max(...dataPoints.map(point => point.value));

  const scale = maxDataPoint ? 120 / maxDataPoint : 1;

  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, [currentMuscle, workouts]);

  const handleDeleteWorkout = async (workoutNumber: number) => {
    try {
      const updatedWorkouts = {
        ...workouts,
        [currentMuscle]: workouts[currentMuscle].filter(item => item.workoutNumber !== workoutNumber),
      };

      updatedWorkouts[currentMuscle].forEach((item, index) => {
        item.workoutNumber = index + 1;
      });

      setWorkouts(updatedWorkouts);
    } catch (error) {
      console.error('Error deleting workout:', error);
    }
  };

  return (
    <GradientBackground>
      <Header text='Prograss' />
      <Chart dataPoints={dataPoints} />
      <Text style={styles.muscleTitle}>{muscles.find(muscle => muscle.value === currentMuscle)?.label}</Text>
      <WorkoutList workouts={workouts[currentMuscle]} currentMuscle={currentMuscle} handleDeleteWorkout={handleDeleteWorkout} />
      <View style={{ height: 50, paddingLeft: 10 }}>
        <MuscleButtons muscles={muscles} currentMuscle={currentMuscle} setCurrentMuscle={setCurrentMuscle} />
      </View>

      <TextInput
        style={styles.input}
        placeholder="Add your Max Weight for today's workout"
        value={currentWeight}
        onChangeText={setCurrentWeight}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveWorkout}>
        <Text style={styles.saveButtonText}>Save Workout</Text>
      </TouchableOpacity>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  muscleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  input: {
    height: 40,
    backgroundColor: '#f1f1f1',
    elevation: 2,
    borderRadius: 14,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '80%',
  },
  saveButton: {
    backgroundColor: "tomato",
    padding: 6,
    borderRadius: 10,
    width: 200,
    alignItems: "center",
  },
  saveButtonText: {
    color: "white",
  },
});

export default ExerciseScreen;
