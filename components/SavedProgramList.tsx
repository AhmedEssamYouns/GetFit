import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import colors from '../consts/colors';

interface Workout {
    plan: string;
    level: string;
    workoutPlan: Record<string, string[]>;
}

const SavedWorkoutsScreen: React.FC = () => {
    const [savedWorkouts, setSavedWorkouts] = useState<Workout[]>([]);

    useEffect(() => {
        const fetchSavedWorkouts = async () => {
            try {
                const savedWorkoutsJson = await AsyncStorage.getItem('@saved_workout');
                if (savedWorkoutsJson) {
                    const workouts: Workout[] = JSON.parse(savedWorkoutsJson);
                    setSavedWorkouts(workouts);
                }
            } catch (e) {
                console.log('Failed to load saved workouts:', e);
            }
        };

        fetchSavedWorkouts();
    }, []);

    const deleteWorkout = async (index: number) => {
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

    const renderWorkoutItem = ({ item, index }: { item: Workout; index: number }) => (
        <View style={styles.workoutContainer}>
            <Text style={styles.workoutTitle}>{`${item.plan} - ${item.level}`}</Text>
            <FlatList
                data={Object.entries(item.workoutPlan)}
                keyExtractor={(entry) => entry[0]}
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
        padding: 20,
        borderRadius: 18,
        shadowColor: '#000',
        backgroundColor:colors.cardBackgroundColor,
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
    },
    workoutTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color:'#fff'
    },
    dayContainer: {
        marginBottom: 10,
    },
    dayTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 5,
        color:'#fff'
    },
    exerciseText: {
        fontSize: 16,
        marginBottom: 3,
        color:'#fff'
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

export default SavedWorkoutsScreen;
