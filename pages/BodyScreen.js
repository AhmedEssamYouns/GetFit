import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import Body from "react-native-body-highlighter";
import AsyncStorage from '@react-native-async-storage/async-storage';

const muscles = [
    { label: "Forearm", value: "forearm" },
    { label: "Abs", value: "abs" },
    { label: "Chest", value: "chest" },
];

const BodyScreen = () => {
    const [side, setSide] = useState('front');
    const [workouts, setWorkouts] = useState({});

    useEffect(() => {
        const fetchData = async () => {
            try {
                const jsonWorkouts = await AsyncStorage.getItem('workouts');
                if (jsonWorkouts !== null) {
                    const parsedWorkouts = JSON.parse(jsonWorkouts);
                    if (JSON.stringify(parsedWorkouts) !== JSON.stringify(workouts)) {
                        setWorkouts(parsedWorkouts);
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
        const intervalId = setInterval(fetchData, 5000); // Adjust the interval as needed

        return () => clearInterval(intervalId);
    }, [workouts]);

    const toggleSide = () => {
        setSide(prevSide => (prevSide === 'front' ? 'back' : 'front'));
    };
    const calculateIntensity = (muscle, latestWeight) => {
        switch (muscle) {
            // Chest
            case 'chest':
                if (latestWeight >= 90) return '5'; // Darkest red
                if (latestWeight >= 70) return '4'; // Dark red
                if (latestWeight >= 50) return '3'; // Red
                if (latestWeight >= 30) return '2'; // Light red
                if (latestWeight >= 10) return '1'; // Very light red
                return '1'; // Default to very light red

            // Arms
            case 'biceps':
            case 'triceps':
            case 'forearm':
            case 'back-deltoids':
            case 'front-deltoids':
                if (latestWeight >= 40) return '5'; // Darkest red
                if (latestWeight >= 30) return '4'; // Dark red
                if (latestWeight >= 20) return '3'; // Red
                if (latestWeight >= 10) return '2'; // Light red
                if (latestWeight >= 5) return '1'; // Very light red
                return '1'; // Default to very light red

            // Abs
            case 'abs':
            case 'obliques':
                if (latestWeight >= 30) return '5'; // Darkest red
                if (latestWeight >= 20) return '4'; // Dark red
                if (latestWeight >= 15) return '3'; // Red
                if (latestWeight >= 10) return '2'; // Light red
                if (latestWeight >= 5) return '1'; // Very light red
                return '1'; // Default to very light red

            // Legs
            case 'adductor':
            case 'hamstring':
            case 'quadriceps':
            case 'abductors':
            case 'calves':
            case 'gluteal':
                if (latestWeight >= 50) return '5'; // Darkest red
                if (latestWeight >= 40) return '4'; // Dark red
                if (latestWeight >= 30) return '3'; // Red
                if (latestWeight >= 20) return '2'; // Light red
                if (latestWeight >= 10) return '1'; // Very light red
                return '1'; // Default to very light red

            // Head
            case 'head':
            case 'neck':
                if (latestWeight >= 20) return '5'; // Darkest red
                if (latestWeight >= 15) return '4'; // Dark red
                if (latestWeight >= 10) return '3'; // Red
                if (latestWeight >= 5) return '2'; // Light red
                if (latestWeight >= 2) return '1'; // Very light red
                return '1'; // Default to very light red

            // Trapezius, Upper-back, Lower-back
            case 'trapezius':
            case 'upper-back':
            case 'lower-back':
                if (latestWeight >= 50) return '5'; // Darkest red
                if (latestWeight >= 40) return '4'; // Dark red
                if (latestWeight >= 30) return '3'; // Red
                if (latestWeight >= 20) return '2'; // Light red
                if (latestWeight >= 10) return '1'; // Very light red
                return '1'; // Default to very light red

            default:
                return '1'; // Default to very light red for unknown muscles
        }
    };


    const getLatestWeight = (muscleWorkouts) => {
        if (!muscleWorkouts || muscleWorkouts.length === 0) return 0;
        return muscleWorkouts[muscleWorkouts.length - 1].weight;
    };

    return (
        <View style={styles.container}>
            <Body
                data={muscles.map(muscle => {
                    const latestWeight = getLatestWeight(workouts[muscle.value]);
                    const intensity = calculateIntensity(muscle.value, latestWeight);
                    console.log(`Muscle: ${muscle.label}, Latest Weight: ${latestWeight}, Intensity: ${intensity}`);
                    return {
                        slug: muscle.value,
                        intensity: intensity,


                    };
                })}
                colors={['#FFCCCC', '#FF6666', '#FF3333', '#FF3333', '#990000']}
                gender="male"
                side={side}
                scale={1.1}
            />
            <TouchableOpacity onPress={toggleSide} style={styles.button}>
                <Text style={styles.buttonText}>Rotate</Text>
            </TouchableOpacity>

            <View style={styles.levelsContainer}>
                <View style={{ flexDirection: "row" }}>
                    <View style={[styles.levelBox, styles.beginner]}>
                    </View>
                    <Text style={styles.levelText}>Beginner</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={[styles.levelBox, styles.intermediate]}>
                    </View>
                    <Text style={styles.levelText}>Intermediate</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={[styles.levelBox, styles.advanced]}>
                    </View>
                    <Text style={styles.levelText}>Advanced</Text>
                </View>

            </View>
        </View>

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
    levelsContainer: {
        position: 'absolute',
        flexDirection: 'column',
        marginTop: 20,
        width: 200,
        gap: 5,
        left: -20,
        top: 70,
        paddingHorizontal: 20,
    },
    levelBox: {
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 5,
        borderRadius: 5,
    },
    beginner: {
        backgroundColor: '#FFCCCC',
    },
    intermediate: {
        backgroundColor: '#FF3333',
    },
    advanced: {
        backgroundColor: '#990000',
    },
    levelText: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default BodyScreen;
