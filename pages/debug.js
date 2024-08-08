import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SavedWorkoutsScreen = () => {
    const [savedWorkouts, setSavedWorkouts] = useState([]);

    // Fetch saved workouts from AsyncStorage when the component mounts
    useEffect(() => {
        const fetchSavedWorkouts = async () => {
            try {
                const savedWorkoutsJson = await AsyncStorage.getItem('@saved_workout');
                if (savedWorkoutsJson != null) {
                    setSavedWorkouts(JSON.parse(savedWorkoutsJson));
                }
            } catch (e) {
                console.log('Failed to load saved workouts:', e);
            }
        };

        fetchSavedWorkouts();
    }, []);

    // Function to delete a workout
    const deleteWorkout = async (index) => {
        try {
            const updatedWorkouts = savedWorkouts.filter((_, i) => i !== index);
            setSavedWorkouts(updatedWorkouts);
            await AsyncStorage.setItem('@saved_workout', JSON.stringify(updatedWorkouts));
            Alert.alert('Success', 'Workout deleted successfully!');
        } catch (e) {
            console.log('Error deleting workout:', e);
            Alert.alert('Error', 'Failed to delete the workout.');
        }
    };

    const renderWorkoutItem = ({ item, index }) => (
        <View style={styles.workoutContainer}>
            <Text style={styles.workoutTitle}>{`${item.plan} - ${item.level}`}</Text>
            <FlatList
                data={Object.entries(item.workoutPlan)}
                keyExtractor={(item) => item[0]}
                renderItem={({ item }) => (
                    <View style={styles.dayContainer}>
                        <Text style={styles.dayTitle}>{item[0]}</Text>
                        {item[1].map((exercise, idx) => (
                            <Text key={idx} style={styles.exerciseText}>{exercise}</Text>
                        ))}
                    </View>
                )}
            />
            <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteWorkout(index)}
            >
                <Text style={styles.buttonText}>Delete Workout</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <FlatList
                data={savedWorkouts}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderWorkoutItem}
                ListEmptyComponent={<Text style={styles.emptyText}>No saved workouts found.</Text>}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    workoutContainer: {
        marginBottom: 20,
        padding: 15,
        backgroundColor: '#fff',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 2,
    },
    workoutTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    dayContainer: {
        marginBottom: 10,
    },
    dayTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    exerciseText: {
        fontSize: 16,
        marginBottom: 3,
    },
    deleteButton: {
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
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
        color: '#777',
    },
});

export default SavedWorkoutsScreen;
