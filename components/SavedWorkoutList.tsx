import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Muscle: {muscle.name}</Text>
            <FlatList
                data={muscle.exercises}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderExercises}
            />
        </View>
    );

    const renderDays = ({ item: day }: { item: Day }) => (
        <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Day: {day.name}</Text>
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
        padding: 10,
        margin: 20,
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
    emptyText: {
        textAlign: 'center',
        fontSize: 18,
        color: 'white',
    },
});

export default SavedWorkoutList;
