import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../consts/colors';

interface Exercise {
    name: string;
}

interface Muscle {
    name: string;
    exercises: Exercise[];
}

interface Day {
    name: string;
    muscles: Muscle[];
}

interface Workout {
    id: string;
    name: string;
    days: Day[];
}

const SavedWorkoutList: React.FC = () => {
    const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        fetchSavedWorkouts();
    }, []);

    const fetchSavedWorkouts = async () => {
        try {
            const workoutsJson = await AsyncStorage.getItem('@workout_programs');
            if (workoutsJson) {
                setSavedWorkouts(JSON.parse(workoutsJson));
            } else {
                console.log('No Data', 'No saved workout programs found.');
            }
        } catch (e) {
            console.log('Error', 'Failed to load the workout programs.');
        }
    };

    const deleteWorkout = async (id: string) => {
        try {
            const updatedWorkouts = savedWorkouts.filter(workout => workout.id !== id);
            await AsyncStorage.setItem('@workout_programs', JSON.stringify(updatedWorkouts));
            setSavedWorkouts(updatedWorkouts);
            Alert.alert('Success', 'Workout program deleted successfully.');
        } catch (e) {
            Alert.alert('Error', 'Failed to delete the workout program.');
        }
    };

    const renderExercises = ({ item: exercise }: { item: Exercise }) => (
        <Text style={styles.itemText}>Exercise: {exercise.name}</Text>
    );

    const renderMuscles = ({ item: muscle }: { item: Muscle }) => (
        <View style={{padding:10}}>
            <Text style={{color:"white",fontWeight:'bold'}}>Muscle: {muscle.name}</Text>
            <FlatList
                data={muscle.exercises}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderExercises}
            />
        </View>
    );

    const renderDays = ({ item: day }: { item: Day }) => (
        <View style={{ borderBottomWidth: 1 ,borderBottomColor:'white',padding:10}}>
            <Text style={{color:"white",fontWeight:'bold'}}>Day: {day.name}</Text>
            <FlatList
                data={day.muscles}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderMuscles}
            />
        </View>
    );

    const renderWorkouts = ({ item: workout }: { item: Workout }) => (
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

        <FlatList
            data={savedWorkouts}
            renderItem={renderWorkouts}
            keyExtractor={(item) => item.id}
            ListEmptyComponent={<Text style={styles.emptyText}>No saved workouts found.</Text>}

        />
    );
};

const styles = StyleSheet.create({
    workoutContainer: {
        marginBottom: 20,
        padding: 20,
        borderRadius: 18,
        shadowColor: '#000',
        backgroundColor: colors.cardBackgroundColor,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    itemText: {
        fontSize: 16,
        color: '#fff'
    },
    workoutTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#fff'
    },
    dayContainer: {
        marginBottom: 10,
    },
    dayTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#fff'
    },
    exerciseText: {
        fontSize: 16,
        marginBottom: 3,
        color: '#fff'
    },
    deleteButton: {
        backgroundColor: colors.Button,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: colors.primaryButtonColor,
        padding: 10,
        borderRadius: 25,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
    },
});

export default SavedWorkoutList;
