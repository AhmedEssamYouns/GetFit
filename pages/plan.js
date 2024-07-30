import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const workoutData = {
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

const SuggestWorkout = ({ route }) => {
    const { plan, level } = route.params;
    const workoutPlan = workoutData[plan][level];

    return (
        <View style={styles.container}>
            <Text style={styles.title}>{`${plan} - ${level}`}</Text>
            <FlatList
                data={Object.entries(workoutPlan)}
                keyExtractor={(item) => item[0]}
                renderItem={({ item }) => (
                    <View style={styles.dayContainer}>
                        <Text style={styles.dayTitle}>{item[0]}</Text>
                        {
                            item[1].map((exercise, index) => (
                                <Text key={index} style={styles.exerciseText}>{exercise}</Text>
                            ))}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#f8f9fa',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    dayContainer: {
        marginBottom: 20,
    },
    dayTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    exerciseText: {
        fontSize: 16,
        marginBottom: 5,
    },
});

export default SuggestWorkout;
