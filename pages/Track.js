import React, { useRef, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Button, FlatList, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

const ExerciseScreen = () => {
  const [currentMuscle, setCurrentMuscle] = useState(muscles[0].value);
  const [currentWeight, setCurrentWeight] = useState('');
  const [workouts, setWorkouts] = useState({});

  // Function to load workouts from AsyncStorage on component mount
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

  // Function to save workouts to AsyncStorage whenever workouts state changes
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

  const calculateIntensity = (muscle, latestWeight) => {
    switch (muscle) {
      case 'chest':
        if (latestWeight >= 90) return 5;
        if (latestWeight >= 70) return 4;
        if (latestWeight >= 50) return 3;
        if (latestWeight >= 30) return 2;
        if (latestWeight >= 10) return 1;
        return 1;

      case 'forearm':
        if (latestWeight >= 20) return 5;
        if (latestWeight > 10) return 4;
        return 3;

      case 'trapezius':
      case 'upper-back':
      case 'lower-back':
        if (latestWeight >= 50) return 5;
        if (latestWeight >= 40) return 4;
        if (latestWeight >= 30) return 3;
        if (latestWeight >= 20) return 2;
        if (latestWeight >= 10) return 1;
        return 1;

      // Add cases for other muscles here

      default:
        return 3; // Default intensity for other muscles
    }
  };

  const getLatestWeight = (muscleWorkouts) => {
    if (!muscleWorkouts || muscleWorkouts.length === 0) return 0;
    return muscleWorkouts[muscleWorkouts.length - 1].weight;
  };

  const muscleData = muscles.map(muscle => {
    const latestWeight = getLatestWeight(workouts[muscle.value]);
    const intensity = calculateIntensity(muscle.value, latestWeight);
    return {
      slug: muscle.value,
      intensity,
    };
  });

  // Prepare data points for the chart based on the selected muscle
  const dataPoints = (workouts[currentMuscle] || []).map((workout, index) => ({
    day: `${index + 1}`,
    value: workout.weight,
  }));

  // Determine the maximum value in dataPoints for scaling
  const maxDataPoint = Math.max(...dataPoints.map(point => point.value));

  // Calculate the height scale (adjust this as per your requirement)
  const chartHeight = 120; // Fixed chart height
  const scale = maxDataPoint ? chartHeight / maxDataPoint : 1; // Avoid division by zero

  // Reference to the ScrollView
  const scrollViewRef = useRef(null);

  useEffect(() => {
    // Scroll to the end when the component mounts
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: false });
    }
  }, [currentMuscle, workouts]);

  // Function to delete a workout from the list
  const handleDeleteWorkout = async (workoutNumber) => {
    try {
      const updatedWorkouts = {
        ...workouts,
        [currentMuscle]: workouts[currentMuscle].filter(item => item.workoutNumber !== workoutNumber)
      };

      // After filtering, update workout numbers sequentially
      updatedWorkouts[currentMuscle].forEach((item, index) => {
        item.workoutNumber = index + 1; // Update workout numbers starting from 1
      });

      setWorkouts(updatedWorkouts);
    } catch (error) {
      console.error('Error deleting workout:', error);
      Alert.alert('Error', 'Failed to delete workout. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Exercise Screen</Text>
      {/* Line chart visualization */}
      <View style={{ width: 300 }}>
        <ScrollView
          ref={scrollViewRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chartContainer}
        >
          {dataPoints.map((point, index) => (
            <View key={index} style={styles.chartItem}>
              <Text style={styles.barValue}>{point.value}</Text>
              <View style={[styles.bar, { height: point.value * scale }]}></View>
              <Text style={styles.barLabel}>{point.day}</Text>
            </View>
          ))}
          {dataPoints.length === 0 && (
            <View style={styles.noDataContainer}>
              <Text style={styles.noDataText}>No workout data exist</Text>
            </View>
          )}
        </ScrollView>
      </View>
      <ScrollView horizontal>
        <View style={styles.muscleButtonsContainer}>
          {muscles.map((muscle) => (
            <TouchableOpacity
              key={muscle.value}
              style={[
                styles.muscleButton,
                currentMuscle === muscle.value && styles.selectedMuscleButton
              ]}
              onPress={() => setCurrentMuscle(muscle.value)}
            >
              <Text style={styles.muscleButtonText}>{muscle.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      <View style={{alignItems:"center"}}>
        <Text style={styles.muscleTitle}>{muscles.find(muscle => muscle.value === currentMuscle)?.label}</Text>
        <View style={{ maxHeight: 150, width: 300,minHeight:150 }}>
          {workouts[currentMuscle] && workouts[currentMuscle].length > 0 ? (
            <FlatList
              data={workouts[currentMuscle]}
              keyExtractor={(item) => `${currentMuscle}-${item.workoutNumber}`}
              renderItem={({ item }) => (
                <View style={styles.workoutItem}>
                  <Text style={styles.workoutText}>Workout {item.workoutNumber}: {item.weight} kg</Text>
                  <Feather
                    name="trash"
                    size={20}
                    color="red"
                    onPress={() => handleDeleteWorkout(item.workoutNumber)}
                  />
                </View>
              )}
              contentContainerStyle={styles.workoutList}
            />
          ) : (
            <Text style={{alignSelf:"center",fontSize:17,paddingTop:50}}>No workouts recorded for {muscles.find(muscle => muscle.value === currentMuscle)?.label}</Text>
          )}
        </View>
        <TextInput
          style={styles.input}
          placeholder="Add your Max Weight for today workout"
          value={currentWeight}
          onChangeText={setCurrentWeight}
          keyboardType="numeric"
        />
        <TouchableOpacity style={{ backgroundColor: "tomato", padding: 6, borderRadius: 10,width:200,alignItems:"center" }} onPress={handleSaveWorkout}>
          <Text style={{ color: "white" }}>save workout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  chartContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 10,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    backgroundColor: '#f1f1f1',
    minWidth: 300,
    height: 190, // Fixed height for the chart container
  },
  noDataContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: '100%',
    marginTop: 50, // Adjust spacing as needed
  },
  noDataText: {
    fontSize: 20,
    textAlign: 'center',
  },
  chartItem: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginHorizontal: 3,
  },
  bar: {
    backgroundColor: 'tomato',
    borderRadius: 5,
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 5,
    width: 30, // Fixed width for each bar
  },
  barValue: {
    color: 'black',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  barLabel: {
    marginTop: 5,
    color: '#333',
    fontWeight: 'bold',
  },
  muscleButtonsContainer: {
    flexDirection: 'column',
    height: 70,
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 10,
  },
  muscleButton: {
    padding: 10,
    margin: 5,
    backgroundColor: '#ddd',
    borderRadius: 5,
  },
  selectedMuscleButton: {
    backgroundColor: 'gray',
  },
  muscleButtonText: {
    color: 'black',
  },
  workoutList: {
    width: '100%',
    paddingHorizontal: 20,
  },
  workoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  workoutText: {
    fontSize: 16,
    color: '#333',
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
  muscleTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

export default ExerciseScreen;
