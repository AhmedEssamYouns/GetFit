import React, { useState } from 'react';
import { View, Text, StyleSheet, LogBox, TouchableOpacity, ScrollView, TextInput, Button } from 'react-native';
import Body from "react-native-body-highlighter";

LogBox.ignoreAllLogs();

const muscles = [
    { label: "Forearm", value: "forearm" },
    { label: "Abs", value: "abs" },
    { label: "Chest", value: "chest" },
];

export default function BodyScreen() {
    const [side, setSide] = useState('front');
    const [currentMuscle, setCurrentMuscle] = useState(muscles[0].value);
    const [currentWeight, setCurrentWeight] = useState('');
    const [workouts, setWorkouts] = useState({});

    const toggleSide = () => {
        setSide(prevSide => (prevSide === 'front' ? 'back' : 'front'));
    };

    const handleSaveWorkout = () => {
        if (currentMuscle && currentWeight) {
            const workoutNumber = (workouts[currentMuscle]?.length || 0) + 1;
            const newWorkout = { workoutNumber, weight: parseFloat(currentWeight) };

            setWorkouts(prevWorkouts => ({
                ...prevWorkouts,
                [currentMuscle]: [...(prevWorkouts[currentMuscle] || []), newWorkout],
            }));

            setCurrentWeight('');
        }
    };

    const calculateIntensity = (muscle, latestWeight) => {
        if (muscle === 'chest') {
            if (latestWeight >= 90) return 1;
            if (latestWeight >= 40) return 2;
            return 3;
        } else if (muscle === 'forearm') {
            if (latestWeight >= 20) return 1;
            if (latestWeight > 10) return 2;
            return 3;
        } else {
            return 3; // Default intensity for other muscles
        }
    };

    const getLatestWeight = (muscleWorkouts) => {
        if (!muscleWorkouts || muscleWorkouts.length === 0) return 0;
        return muscleWorkouts[muscleWorkouts.length - 1].weight;
    };

    const muscleData = muscles.map(muscle => {
        const latestWeight = getLatestWeight(workouts[muscle.value]);
        const intensity = calculateIntensity(muscle.value, latestWeight);
        return {
            slug: muscle.value,
            intensity,
        };
    });

    return (
        <ScrollView contentContainerStyle={styles.container}>
            <Body
                data={muscleData}
                gender="male"
                side={side}
                scale={1.1}
            />
            <TouchableOpacity onPress={toggleSide} style={styles.button}>
                <Text style={styles.buttonText}>Rotate</Text>
            </TouchableOpacity>
            <View style={styles.muscleButtonsContainer}>
                {muscles.map((muscle) => (
                    <TouchableOpacity
                        key={muscle.value}
                        style={[
                            styles.muscleButton,
                            currentMuscle === muscle.value && styles.selectedMuscleButton
                        ]}
                        onPress={() => setCurrentMuscle(muscle.value)}
                    >
                        <Text style={styles.muscleButtonText}>{muscle.label}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <TextInput
                style={styles.input}
                placeholder="Max Weight"
                value={currentWeight}
                onChangeText={setCurrentWeight}
                keyboardType="numeric"
            />
            <Button title="Save Workout" onPress={handleSaveWorkout} />
            <View style={styles.workoutList}>
                <Text style={styles.muscleTitle}>{muscles.find(muscle => muscle.value === currentMuscle)?.label}</Text>
                {(workouts[currentMuscle] || []).map(({ workoutNumber, weight }) => (
                    <Text key={workoutNumber}>Workout {workoutNumber}: {weight} kg</Text>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        padding: 16,
    },
    button: {
        marginTop: 20,
        padding: 10,
        backgroundColor: 'gray',
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    muscleButtonsContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
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
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginVertical: 10,
        width: '80%',
    },
    workoutList: {
        marginTop: 20,
        width: '100%',
    },
    muscleTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});
