import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import SavedWorkoutList from '../components/SavedWorkoutList';
import SavedWorkoutsScreen from '../components/SavedProgramList';
import GradientBackground from '../components/GradientBackground';
import colors from '../consts/colors';

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
            <Text style={[styles.buttonText, viewType === 'workouts' && styles.activeButtonText]}
            >Customized Programs</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.toggleButton, viewType === 'programs' && styles.activeButton]}
            onPress={() => setViewType('programs')}
          >
            <Text style={[styles.buttonText, viewType === 'programs' && styles.activeButtonText]}
            >Suggested Programs</Text>
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
    marginBottom: 20,
    gap: 15,
  },
  toggleButton: {
    padding: 10,
    borderRadius: 15,
    backgroundColor: colors.Button,
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderColor: colors.primaryButtonColor,
  },
  activeButton: {
    backgroundColor: colors.primaryButtonColor,
  },
  buttonText: {
    color: '#fff',
    fontSize: 13,
  },
  activeButtonText: {
    color: 'black',
    fontSize: 13,

  }
});

export default SavedWorkout;
