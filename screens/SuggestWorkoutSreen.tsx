import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation, RouteProp } from '@react-navigation/native';
import GradientBackground from '../components/GradientBackground';
import colors from '../consts/colors';
import Header from '../components/header';

type WorkoutData = {
    [key: string]: {
        [key: string]: string[] | { [key: string]: string[] };
    };
};

const workoutData: WorkoutData = {
    'Full Body Workout': {
        Beginner: ['Squats', 'Push-Ups', 'Pull-Ups'],
        Intermediate: ['Squats', 'Bench Press', 'Deadlift', 'Pull-Ups'],
        Advanced: ['Squats', 'Bench Press', 'Deadlift', 'Pull-Ups', 'Overhead Press'],
    },
    'Upper-Lower Split': {
        Beginner: {
            Day1: ['Upper Body: Push-Ups', 'Dumbbell Rows', 'Overhead Press'],
            Day2: ['Lower Body: Squats', 'Lunges', 'Leg Press'],
        },
        Intermediate: {
            Day1: ['Upper Body: Bench Press', 'Pull-Ups', 'Overhead Press'],
            Day2: ['Lower Body: Squats', 'Deadlift', 'Leg Press'],
        },
        Advanced: {
            Day1: ['Upper Body: Bench Press', 'Pull-Ups', 'Overhead Press', 'Dips'],
            Day2: ['Lower Body: Squats', 'Deadlift', 'Leg Press', 'Leg Curls'],
        },
    },
    'Push-Pull-Legs': {
        Beginner: {
            Day1: ['Push: Push-Ups', 'Overhead Press', 'Dips'],
            Day2: ['Pull: Pull-Ups', 'Dumbbell Rows', 'Bicep Curls'],
            Day3: ['Legs: Squats', 'Lunges', 'Leg Press'],
        },
        Intermediate: {
            Day1: ['Push: Bench Press', 'Overhead Press', 'Dips'],
            Day2: ['Pull: Pull-Ups', 'Barbell Rows', 'Bicep Curls'],
            Day3: ['Legs: Squats', 'Deadlift', 'Leg Press'],
        },
        Advanced: {
            Day1: ['Push: Bench Press', 'Overhead Press', 'Dips', 'Chest Flyes'],
            Day2: ['Pull: Pull-Ups', 'Barbell Rows', 'Bicep Curls', 'Face Pulls'],
            Day3: ['Legs: Squats', 'Deadlift', 'Leg Press', 'Leg Curls'],
        },
    },
    'Pro Split': {
        Beginner: {
            Day1: ['Chest: Bench Press', 'Push-Ups', 'Chest Flyes'],
            Day2: ['Back: Pull-Ups', 'Barbell Rows', 'Dumbbell Rows'],
            Day3: ['Shoulders: Overhead Press', 'Lateral Raises', 'Front Raises'],
            Day4: ['Legs: Squats', 'Leg Press', 'Lunges'],
            Day5: ['Arms: Bicep Curls', 'Tricep Extensions', 'Hammer Curls'],
        },
        Intermediate: {
            Day1: ['Chest: Bench Press', 'Incline Bench Press', 'Chest Flyes'],
            Day2: ['Back: Pull-Ups', 'Barbell Rows', 'Deadlift'],
            Day3: ['Shoulders: Overhead Press', 'Lateral Raises', 'Shrugs'],
            Day4: ['Legs: Squats', 'Leg Press', 'Lunges', 'Leg Curls'],
            Day5: ['Arms: Bicep Curls', 'Tricep Extensions', 'Hammer Curls', 'Skull Crushers'],
        },
        Advanced: {
            Day1: ['Chest: Bench Press', 'Incline Bench Press', 'Chest Flyes', 'Cable Crossovers'],
            Day2: ['Back: Pull-Ups', 'Barbell Rows', 'Deadlift', 'T-Bar Rows'],
            Day3: ['Shoulders: Overhead Press', 'Lateral Raises', 'Shrugs', 'Face Pulls'],
            Day4: ['Legs: Squats', 'Leg Press', 'Lunges', 'Leg Curls', 'Calf Raises'],
            Day5: ['Arms: Bicep Curls', 'Tricep Extensions', 'Hammer Curls', 'Skull Crushers', 'Tricep Dips'],
        },
    },
};

type SuggestWorkoutProps = {
    route: RouteProp<{ params: { plan: string; level: string } }>;
};

const SuggestWorkout: React.FC<SuggestWorkoutProps> = ({ route }) => {
    const navigation = useNavigation();
    const { plan, level } = route.params;
    const workoutPlan = workoutData[plan][level];

    const saveWorkout = async () => {
        try {
            const existingWorkoutsJson = await AsyncStorage.getItem('@saved_workout');
            let existingWorkouts: Array<{ plan: string; level: string; workoutPlan: any }> = [];

            if (existingWorkoutsJson != null) {
                try {
                    existingWorkouts = JSON.parse(existingWorkoutsJson);

                    if (!Array.isArray(existingWorkouts)) {
                        existingWorkouts = [];
                    }
                } catch (error) {
                    console.log('Error parsing JSON:', error);
                    existingWorkouts = [];
                }
            }

            const newWorkout = { plan, level, workoutPlan };
            existingWorkouts.push(newWorkout);

            const updatedWorkoutsJson = JSON.stringify(existingWorkouts);
            await AsyncStorage.setItem('@saved_workout', updatedWorkoutsJson);

            Alert.alert('Success', 'Workout saved successfully!');
        } catch (e) {
            console.log('Error saving workout:', e);
            Alert.alert('Error', 'Failed to save the workout.');
        }
    };

    return (
        <GradientBackground>
            <Header text='Suggested Workout' arrowBack onBackPress={() => navigation.goBack()} />
            <View style={styles.container}>
                <Text style={styles.title}>{`${plan} - ${level}`}</Text>
                <FlatList
                    data={Object.entries(workoutPlan)}
                    keyExtractor={(item) => item[0]}
                    renderItem={({ item }) => {
                        const dayTitle = item[0];
                        const exercises = item[1];

                        return (
                            <View style={styles.dayContainer}>
                                <Text style={styles.dayTitle}>{dayTitle}</Text>
                                {Array.isArray(exercises) ? (
                                    exercises.map((exercise, index) => (
                                        <Text key={index} style={styles.exerciseText}>{exercise}</Text>
                                    ))
                                ) : (
                                    Object.entries(exercises).map(([day, exerciseList]) => (
                                        <View key={day} style={styles.dayContainer}>
                                            <Text style={styles.dayTitle}>{day}</Text>
                                            {exerciseList.map((exercise, index) => (
                                                <Text key={index} style={styles.exerciseText}>{exercise}</Text>
                                            ))}
                                        </View>
                                    ))
                                )}
                            </View>
                        );
                    }}
                />
                <TouchableOpacity style={styles.saveButton} onPress={saveWorkout}>
                    <Text style={styles.buttonText}>Save Workout</Text>
                </TouchableOpacity>
            </View>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent:"center"
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: "#fff"
    },
    dayContainer: {
        marginBottom: 20,
    },
    dayTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "#fff"
    },
    exerciseText: {
        fontSize: 16,
        marginBottom: 5,
        color: "#fff"
    },
    saveButton: {
        borderRightWidth: 1,
        borderLeftWidth: 1,
        backgroundColor: colors.Button,
        alignItems: 'center',
        borderColor: colors.primaryButtonColor,
        padding: 10,
        marginTop: 15,
        borderRadius: 22,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
});

export default SuggestWorkout;
