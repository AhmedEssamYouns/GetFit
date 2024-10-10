import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SavedWorkoutsScreen from './GetSavedWorkouts';

const SavedWorkout = () => {
  const [savedWorkouts, setSavedWorkouts] = useState([]);
  const [savedPrograms, setSavedPrograms] = useState([]);
  const [viewType, setViewType] = useState('workouts'); // 'workouts' or 'programs'

  useEffect(() => {
    const fetchSavedData = async () => {
      try {
        const workoutsJson = await AsyncStorage.getItem('@workout_programs');
        if (workoutsJson != null) {
          setSavedWorkouts(JSON.parse(workoutsJson));
        } else {
          Alert.alert('No Data', 'No saved workout programs found.');
        }

        const programsJson = await AsyncStorage.getItem('@saved_workout');
        if (programsJson != null) {
          setSavedPrograms(JSON.parse(programsJson));
        } else {
          Alert.alert('No Data', 'No saved custom programs found.');
        }
      } catch (e) {
        Alert.alert('Error', 'Failed to load the workout programs.');
      }
    };

    fetchSavedData();
  }, []);

  const deleteWorkout = async (id) => {
    try {
      const updatedWorkouts = savedWorkouts.filter(workout => workout.id !== id);
      await AsyncStorage.setItem('@workout_programs', JSON.stringify(updatedWorkouts));
      setSavedWorkouts(updatedWorkouts);
      Alert.alert('Success', 'Workout program deleted successfully.');
    } catch (e) {
      Alert.alert('Error', 'Failed to delete the workout program.');
    }
  };



  const renderExercises = ({ item: exercise }) => (
    <Text style={styles.itemText}>Exercise: {exercise}</Text>
  );

  const renderMuscles = ({ item: muscle }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Muscle: {muscle.name}</Text>
      <FlatList
        data={muscle.exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderExercises}
      />
    </View>
  );

  const renderDays = ({ item: day }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Day: {day.name}</Text>
      <FlatList
        data={day.muscles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMuscles}
      />
    </View>
  );

  const renderWorkouts = ({ item: workout }) => (
    <View style={styles.workoutContainer}>
      <Text style={styles.workoutTitle}>Workout: {workout.name}</Text>
      <FlatList
        data={workout.days}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderDays}
      />
      <TouchableOpacity style={styles.deleteButton} onPress={() => deleteWorkout(workout.id)}>
        <Text style={styles.buttonText}>Delete Workout</Text>
      </TouchableOpacity>
    </View>
  );



  return (
    <View style={styles.container}>
      <View style={styles.buttonGroup}>
        <TouchableOpacity
          style={[styles.toggleButton, viewType === 'workouts' && styles.activeButton]}
          onPress={() => setViewType('workouts')}
        >
          <Text style={styles.buttonText}>customized Programs</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.toggleButton, viewType === 'programs' && styles.activeButton]}
          onPress={() => setViewType('programs')}
        >
          <Text style={styles.buttonText}>suggested Programs</Text>
        </TouchableOpacity>
      </View>

      {viewType === 'workouts' ? (
        <FlatList
          data={savedWorkouts}
          renderItem={renderWorkouts}
        />
      ) : (
     <SavedWorkoutsScreen/>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#eeee',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  toggleButton: {
    padding: 6,
    borderRadius: 5,
    backgroundColor: '#6c757d',
  },
  activeButton: {
    backgroundColor: 'tomato',
  },
  workoutContainer: {
    marginBottom: 20,
    padding: 10,
    margin:20,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  workoutTitle: {
    padding: 5,
    fontSize: 20,
    fontWeight: 'bold',
  },
  sectionContainer: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  sectionTitle: {
    padding: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  itemText: {
    padding: 5,
    fontSize: 16,
    marginLeft: 10,
  },
  deleteButton: {
    backgroundColor: 'red',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SavedWorkout;
