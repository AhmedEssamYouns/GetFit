import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface WorkoutListProps {
  workouts: { workoutNumber: number; weight: number }[] | undefined;
  currentMuscle: string;
  handleDeleteWorkout: (workoutNumber: number) => void;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, currentMuscle, handleDeleteWorkout }) => {
  if (!workouts || workouts.length === 0) {
    return <Text>No workouts available for {currentMuscle}</Text>;
  }

  return (
    <View style={styles.workoutListContainer}>
      <ScrollView>
        {workouts.map((item) => (
          <View key={item.workoutNumber} style={styles.workoutItem}>
            <Text style={styles.workoutText}>Workout {item.workoutNumber}: {item.weight} kg</Text>
            <TouchableOpacity onPress={() => handleDeleteWorkout(item.workoutNumber)}>
              <Feather name="trash" size={20} color="red" />
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  workoutListContainer: {
    width: '100%',
    marginVertical: 10,
  },
  workoutItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  workoutText: {
    fontSize: 16,
  },
});

export default WorkoutList;
