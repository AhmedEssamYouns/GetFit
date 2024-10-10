import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Body from "react-native-body-highlighter"; // Ensure this library is installed
import AsyncStorage from '@react-native-async-storage/async-storage';

interface Muscle {
    label: string;
    value: string;
}

interface Workout {
    weight: number;
}

const muscles: Muscle[] = [
    { label: "Forearm", value: "forearm" },
    { label: "Abs", value: "abs" },
    { label: "Chest", value: "chest" },
];

const BodyScreen: React.FC = () => {
    const [side, setSide] = useState<'front' | 'back'>('front');
    const [workouts, setWorkouts] = useState<Record<string, Workout[]>>({});

    const handleBodyPartPress = (bodyPart: { slug: string }) => {
        console.log('User tapped:', bodyPart.slug);
    };

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
        const intervalId = setInterval(fetchData, 5000);

        return () => clearInterval(intervalId);
    }, [workouts]);

    const toggleSide = () => {
        setSide(prevSide => (prevSide === 'front' ? 'back' : 'front'));
    };

    const calculateIntensity = (muscle: string, latestWeight: number): string => {
        switch (muscle) {
            case 'chest':
                if (latestWeight >= 90) return '5';
                if (latestWeight >= 70) return '4';
                if (latestWeight >= 50) return '3';
                if (latestWeight >= 30) return '2';
                if (latestWeight >= 10) return '1';
                return '1';

            case 'biceps':
            case 'triceps':
            case 'forearm':
            case 'back-deltoids':
            case 'front-deltoids':
                if (latestWeight >= 40) return '5';
                if (latestWeight >= 30) return '4';
                if (latestWeight >= 20) return '3';
                if (latestWeight >= 10) return '2';
                if (latestWeight >= 5) return '1';
                return '1';

            case 'abs':
            case 'obliques':
                if (latestWeight >= 30) return '5';
                if (latestWeight >= 20) return '4';
                if (latestWeight >= 15) return '3';
                if (latestWeight >= 10) return '2';
                if (latestWeight >= 5) return '1';
                return '1';

            case 'adductor':
            case 'hamstring':
            case 'quadriceps':
            case 'abductors':
            case 'calves':
            case 'gluteal':
                if (latestWeight >= 50) return '5';
                if (latestWeight >= 40) return '4';
                if (latestWeight >= 30) return '3';
                if (latestWeight >= 20) return '2';
                if (latestWeight >= 10) return '1';
                return '1';

            case 'head':
            case 'neck':
                if (latestWeight >= 20) return '5';
                if (latestWeight >= 15) return '4';
                if (latestWeight >= 10) return '3';
                if (latestWeight >= 5) return '2';
                if (latestWeight >= 2) return '1';
                return '1';

            case 'trapezius':
            case 'upper-back':
            case 'lower-back':
                if (latestWeight >= 50) return '5';
                if (latestWeight >= 40) return '4';
                if (latestWeight >= 30) return '3';
                if (latestWeight >= 20) return '2';
                if (latestWeight >= 10) return '1';
                return '1';

            default:
                return '1';
        }
    };

    const getLatestWeight = (muscleWorkouts: Workout[]): number => {
        if (!muscleWorkouts || muscleWorkouts.length === 0) return 0;
        return muscleWorkouts[muscleWorkouts.length - 1].weight;
    };

    return (
        <View style={styles.container}>
            <Body
                data={muscles.map(muscle => {
                    const latestWeight = getLatestWeight(workouts[muscle.value] || []);
                    const intensity = calculateIntensity(muscle.value, latestWeight);
                    return {
                        slug: muscle.value,
                        intensity: intensity,
                    };
                })}
                colors={['#FFCCCC', '#FF6666', '#FF3333', '#FF3333', '#990000']}
                gender="male"
                onBodyPartPress={handleBodyPartPress}
                side={side}
                scale={1.1}
            />
            <TouchableOpacity onPress={toggleSide} style={styles.button}>
                <Text style={styles.buttonText}>Rotate</Text>
            </TouchableOpacity>

            <View style={styles.levelsContainer}>
                <View style={{ flexDirection: "row" }}>
                    <View style={[styles.levelBox, styles.beginner]} />
                    <Text style={styles.levelText}>Beginner</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={[styles.levelBox, styles.intermediate]} />
                    <Text style={styles.levelText}>Intermediate</Text>
                </View>
                <View style={{ flexDirection: "row" }}>
                    <View style={[styles.levelBox, styles.advanced]} />
                    <Text style={styles.levelText}>Advanced</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        alignItems: "center",
        padding: 16,
    },
    button: {
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
        width: 200,
        gap: 5,
        bottom:300,
        left: -30,
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
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default BodyScreen;
