import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, TextInput, FlatList, Alert, KeyboardAvoidingView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import GradientBackground from '../components/GradientBackground';
import Header from '../components/header';

const CreateWorkout = () => {
  const navigation = useNavigation();
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
    <GradientBackground>
      <Header text='create program' arrowBack onBackPress={() => navigation.goBack()} />
      <View style={styles.container}>
        <View style={{ flexDirection: "row", gap: 5, alignSelf: 'center' }}>
          <TextInput
            style={styles.input}
            placeholder="Enter workout program name"
            placeholderTextColor="#a0a0a0"
            value={workoutName}
            onChangeText={setWorkoutName}
          />
          <TouchableOpacity style={styles.saveButton} onPress={saveProgram}>
            <Text style={styles.saveButtonText}>Save Program</Text>
          </TouchableOpacity>
        </View>
        <KeyboardAvoidingView style={{margin:20}}>
          <FlatList
            data={workoutDays}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderDays}
            ListFooterComponent={
              <View style={{
                padding: 10, flexDirection: 'row', justifyContent: 'center',
                alignItems: "center"
              }}>
                <TextInput
                  style={styles.input}
                  placeholder="Enter day name"
                  placeholderTextColor="#a0a0a0"
                  value={currentDay}
                  onChangeText={setCurrentDay}
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddDay}>
                  <Text style={styles.buttonText}>Add Day</Text>
                </TouchableOpacity>
              </View>
            }
          />
        </KeyboardAvoidingView>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!
              modalVisible);
          }}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              <Text style={styles.modalTitle}>
                {isEditing ? `Edit ${modalType}` : `Add ${modalType}`}
              </Text>
              <TextInput
                style={styles.input}
                placeholder={`Enter ${modalType.toLowerCase()} name`}
                placeholderTextColor="#a0a0a0"
                value={currentMuscle || currentExercise}
                onChangeText={(text) => {
                  modalType === 'Muscle'
                    ? setCurrentMuscle(text)
                    : setCurrentExercise(text);
                }}
              />
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => {
                  if (modalType === 'Muscle') {
                    isEditing ? handleEditMuscle() : handleAddMuscle();
                  } else {
                    isEditing ? handleEditExercise() : handleAddExercise();
                  }
                  setModalVisible(false);
                }}
              >
                <Text style={styles.buttonText}>
                  {isEditing ? 'Update' : 'Add'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </GradientBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: '#444',
    borderTopLeftRadius: 5,
    zIndex: 10,
    left: 5,
    borderBottomLeftRadius: 5,
    paddingHorizontal: 10,
    color: '#fff',
    backgroundColor: '#333',
  },
  sectionContainer: {
    marginBottom: 20,
    backgroundColor: '#222',
    padding: 15,
    borderRadius: 10,
  },
  sectionTitle: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 5,
  },
  itemText: {
    color: '#fff',
  },
  inlineButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  addButton: {
    backgroundColor: '#007bff',
    padding: 9,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
  },
  deleteText: {
    color: 'red',
    textDecorationLine: 'underline',
  },
  editText: {
    color: 'orange',
    textDecorationLine: 'underline',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#333',
    padding: 20,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 20,
    color: '#fff',
    marginBottom: 15,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    color: '#fff',
  },
  saveButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
    marginLeft: 10,
  },
  saveButtonText: {
    color: '#fff',
  },
});

export default CreateWorkout;
