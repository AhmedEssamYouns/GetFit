import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import SavedWorkoutList from '../components/SavedWorkoutList';
import SavedWorkoutsScreen from '../components/SavedProgramList';
import GradientBackground from '../components/GradientBackground';

const SavedWorkout = () => {
  const [viewType, setViewType] = useState('workouts');

  return (
    <GradientBackground>
      <View style={styles.container}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={[styles.toggleButton, viewType === 'workouts' && styles.activeButton]}
            onPress={() => setViewType('workouts')}
          >
            <Text style={styles.buttonText}>Customized Programs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewType === 'programs' && styles.activeButton]}
            onPress={() => setViewType('programs')}
          >
            <Text style={styles.buttonText}>Suggested Programs</Text>
          </TouchableOpacity>
        </View>

        {viewType === 'workouts' ? (
          <SavedWorkoutList />
        ) : (
          <SavedWorkoutsScreen />
        )}
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default SavedWorkout;
