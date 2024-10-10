import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

interface WorkoutListProps {
  workouts: { workoutNumber: number; weight: number }[] | undefined;
  currentMuscle: string;
  handleDeleteWorkout: (workoutNumber: number) => void;
}

const WorkoutList: React.FC<WorkoutListProps> = ({ workouts, currentMuscle, handleDeleteWorkout }) => {
  return (
    <View style={styles.workoutListContainer}>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.workoutNumber.toString()}
        renderItem={({ item }) => (
          <View style={styles.workoutItem}>
            <Text style={styles.workoutText}>Workout {item.workoutNumber}: {item.weight} kg</Text>
            <Feather name="trash" size={20} color="red" onPress={() => handleDeleteWorkout(item.workoutNumber)} />
          </View>
        )}
      />
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
