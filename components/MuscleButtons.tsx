import React from 'react';
import { View, ScrollView, TouchableOpacity, Text, StyleSheet } from 'react-native';

interface MuscleButtonsProps {
  muscles: { label: string; value: string }[];
  currentMuscle: string;
  setCurrentMuscle: (muscle: string) => void;
}

const MuscleButtons: React.FC<MuscleButtonsProps> = ({ muscles, currentMuscle, setCurrentMuscle }) => {
  return (
      <ScrollView horizontal  showsHorizontalScrollIndicator={false}>
        {muscles.map((muscle) => (
          <TouchableOpacity
            key={muscle.value}
            style={[styles.muscleButton, currentMuscle === muscle.value && styles.selectedMuscleButton]}
            onPress={() => setCurrentMuscle(muscle.value)}
          >
            <Text style={styles.muscleButtonText}>{muscle.label}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  muscleButtonsContainer: {
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
});

export default MuscleButtons;
