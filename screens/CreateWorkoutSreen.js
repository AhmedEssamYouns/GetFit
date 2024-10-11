import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, FlatList, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const CreateWorkout = () => {
  const navigation = useNavigation()
  const [workoutDays, setWorkoutDays] = useState([]);
  const [currentDay, setCurrentDay] = useState('');
  const [currentMuscle, setCurrentMuscle] = useState('');
  const [currentExercise, setCurrentExercise] = useState('');
  const [selectedDayIndex, setSelectedDayIndex] = useState(null);
  const [selectedMuscleIndex, setSelectedMuscleIndex] = useState(null);
  const [selectedExerciseIndex, setSelectedExerciseIndex] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalType, setModalType] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [workoutName, setWorkoutName] = useState('');
  const [allWorkouts, setAllWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('@workout_programs');
        if (jsonValue != null) {
          setAllWorkouts(JSON.parse(jsonValue));
        }
      } catch (e) {
        Alert.alert('Error', 'Failed to load the workout programs.');
      }
    };

    fetchWorkouts();
  }, []);

  const handleAddDay = () => {
    if (currentDay) {
      setWorkoutDays([...workoutDays, { name: currentDay, muscles: [] }]);
      setCurrentDay('');
    }
  };

  const handleAddMuscle = () => {
    if (selectedDayIndex !== null && currentMuscle) {
      const updatedDays = [...workoutDays];
      updatedDays[selectedDayIndex].muscles.push({ name: currentMuscle, exercises: [] });
      setWorkoutDays(updatedDays);
      setCurrentMuscle('');
    }
  };

  const handleAddExercise = () => {
    if (selectedDayIndex !== null && selectedMuscleIndex !== null && currentExercise) {
      const updatedDays = [...workoutDays];
      updatedDays[selectedDayIndex].muscles[selectedMuscleIndex].exercises.push(currentExercise);
      setWorkoutDays(updatedDays);
      setCurrentExercise('');
    }
  };

  const handleEditMuscle = () => {
    if (selectedDayIndex !== null && selectedMuscleIndex !== null && currentMuscle) {
      const updatedDays = [...workoutDays];
      updatedDays[selectedDayIndex].muscles[selectedMuscleIndex].name = currentMuscle;
      setWorkoutDays(updatedDays);
      setCurrentMuscle('');
    }
  };

  const handleEditExercise = () => {
    if (selectedDayIndex !== null && selectedMuscleIndex !== null && selectedExerciseIndex !== null && currentExercise) {
      const updatedDays = [...workoutDays];
      updatedDays[selectedDayIndex].muscles[selectedMuscleIndex].exercises[selectedExerciseIndex] = currentExercise;
      setWorkoutDays(updatedDays);
      setCurrentExercise('');
    }
  };

  const handleDeleteDay = (index) => {
    const updatedDays = workoutDays.filter((_, i) => i !== index);
    setWorkoutDays(updatedDays);
  };

  const handleDeleteMuscle = (dayIndex, muscleIndex) => {
    const updatedDays = [...workoutDays];
    updatedDays[dayIndex].muscles = updatedDays[dayIndex].muscles.filter((_, i) => i !== muscleIndex);
    setWorkoutDays(updatedDays);
  };

  const handleDeleteExercise = (dayIndex, muscleIndex, exerciseIndex) => {
    const updatedDays = [...workoutDays];
    updatedDays[dayIndex].muscles[muscleIndex].exercises = updatedDays[dayIndex].muscles[muscleIndex].exercises.filter((_, i) => i !== exerciseIndex);
    setWorkoutDays(updatedDays);
  };

  const saveProgram = async () => {
    if (!workoutName) {
      Alert.alert('Error', 'Please enter a name for the workout program.');
      return;
    }

    try {
      const newWorkout = { id: Date.now().toString(), name: workoutName, days: workoutDays };
      const updatedWorkouts = [...allWorkouts, newWorkout];
      const jsonValue = JSON.stringify(updatedWorkouts);
      await AsyncStorage.setItem('@workout_programs', jsonValue);
      setAllWorkouts(updatedWorkouts);
      setWorkoutDays([]);
      setWorkoutName('');
      Alert.alert('Success', 'Workout program saved successfully!');
      navigation.navigate('My Program')

    } catch (e) {
      Alert.alert('Error', 'Failed to save the workout program.');
    }
  };

  const renderMuscles = ({ item: muscle, index: muscleIndex }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Muscle: {muscle.name}</Text>
      <FlatList
        data={muscle.exercises}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item: exercise, index: exerciseIndex }) => (
          <View style={styles.sectionContainer}>
            <Text style={styles.itemText}>Exercise: {exercise}</Text>
            <View style={styles.inlineButtons}>
              <TouchableOpacity onPress={() => handleDeleteExercise(selectedDayIndex, muscleIndex, exerciseIndex)}>
                <Text style={styles.deleteText}>Delete Exercise</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setSelectedExerciseIndex(exerciseIndex);
                  setCurrentExercise(exercise);
                  setModalType('Exercise');
                  setIsEditing(true);
                  setModalVisible(true);
                }}
              >
                <Text style={styles.editText}>Edit Exercise</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setSelectedMuscleIndex(muscleIndex);
              setModalType('Exercise');
              setIsEditing(false);
              setModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>Add Exercise</Text>
          </TouchableOpacity>
        }
      />
      <View style={styles.inlineButtons}>
        <TouchableOpacity onPress={() => handleDeleteMuscle(selectedDayIndex, muscleIndex)}>
          <Text style={styles.deleteText}>Delete Muscle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            setSelectedMuscleIndex(muscleIndex);
            setCurrentMuscle(muscle.name);
            setModalType('Muscle');
            setIsEditing(true);
            setModalVisible(true);
          }}
        >
          <Text style={styles.editText}>Edit Muscle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderDays = ({ item: day, index: dayIndex }) => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Day: {day.name}</Text>
      <FlatList
        data={day.muscles}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMuscles}
        ListFooterComponent={
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => {
              setSelectedDayIndex(dayIndex);
              setModalType('Muscle');
              setIsEditing(false);
              setModalVisible(true);
            }}
          >
            <Text style={styles.buttonText}>Add Muscle</Text>
          </TouchableOpacity>
        }
      />
      <TouchableOpacity onPress={() => handleDeleteDay(dayIndex)}>
        <Text style={styles.deleteText}>Delete Day</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: "row", gap: 5, alignSelf: 'center' }}>
        <TextInput
          style={styles.input}
          placeholder="Enter workout program name"
          value={workoutName}
          onChangeText={setWorkoutName}
        />
        <TouchableOpacity style={styles.saveButton} onPress={saveProgram}>
          <Text style={{ color: "white", fontSize: 10, padding: 5 }}>Save Program</Text>
        </TouchableOpacity>
      </View>


      <FlatList
        data={workoutDays}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderDays}
        ListFooterComponent={
          <View>
            <TextInput
              style={styles.input}
              placeholder="Enter day name"
              value={currentDay}
              onChangeText={setCurrentDay}
            />
            <TouchableOpacity style={styles.addButton} onPress={handleAddDay}>
              <Text style={styles.buttonText}>Add Day</Text>
            </TouchableOpacity>
          </View>
        }
      />

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <TouchableOpacity style={styles.modalContainer} onPressOut={() => setModalVisible(false)}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>{isEditing ? `Edit ${modalType}` : `Add ${modalType}`}</Text>
            <TextInput
              style={styles.input}
              placeholder={`Enter ${modalType.toLowerCase()} name`}
              value={modalType === 'Muscle' ? currentMuscle : currentExercise}
              onChangeText={modalType === 'Muscle' ? setCurrentMuscle : setCurrentExercise}
            />
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                if (isEditing) {
                  modalType === 'Muscle' ? handleEditMuscle() : handleEditExercise();
                } else {
                  modalType === 'Muscle' ? handleAddMuscle() : handleAddExercise();
                }
                setModalVisible(false);
              }}
            >
              <Text style={styles.buttonText}>{isEditing ? 'Edit' : 'Add'}</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  sectionContainer: {
    marginBottom: 20,
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
  inlineButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 10,
  },
  deleteText: {
    color: 'red',
    marginTop: 5,
  },
  editText: {
    color: 'blue',
    marginTop: 5,
  },
  addButton: {
    backgroundColor: 'tomato',
    padding: 7,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
    backgroundColor: 'tomato',
    padding: 15,
    margin: 10,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: 'green',
    borderRadius: 5,
    justifyContent: "center",
    alignItems: 'center',
    marginVertical: 10,
  },
});

export default CreateWorkout;
