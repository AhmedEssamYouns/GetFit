import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Body from "react-native-body-highlighter";
import colors from '../consts/colors';

interface Muscle {
    label: string;
    value: string;
    intensity: Number;
}


const muscles: Muscle[] = [
    { label: "Forearm", value: "forearm", intensity: 0 },
    { label: "Chest", value: "chest", intensity: 2 },
    { label: "Trapezius", value: "trapezius", intensity: 1 },
    { label: "Upper-back", value: "upper-back", intensity: 2 },
    { label: "Lower-back", value: "lower-back", intensity: 3 },
    { label: "Biceps", value: "biceps", intensity: 2 },
    { label: "Triceps", value: "triceps", intensity: 3 },
    { label: "Back-deltoids", value: "back-deltoids", intensity: 1 },
    { label: "Front-deltoids", value: "front-deltoids", intensity: 2 },
    { label: "Obliques", value: "obliques", intensity: 1 },
    { label: "Adductor", value: "adductor", intensity: 2 },
    { label: "Hamstring", value: "hamstring", intensity: 3 },
    { label: "Quadriceps", value: "quadriceps", intensity: 2 },
    { label: "Abductors", value: "abductors", intensity: 1 },
    { label: "Calves", value: "calves", intensity: 3 },
    { label: "Gluteal", value: "gluteal", intensity: 2 },
    { label: "Head", value: "head", intensity: 1 },
    { label: "Neck", value: "neck", intensity: 2 },
];


const BodyScreen: React.FC = () => {
    const [side, setSide] = useState<'front' | 'back'>('front');

    const handleBodyPartPress = (bodyPart: { slug: string }) => {
        console.log('User tapped:', bodyPart.slug);
    };

    const toggleSide = () => {
        setSide(prevSide => (prevSide === 'front' ? 'back' : 'front'));
    };

    return (
        <View style={styles.container}>
            <Body
                data={muscles.map(muscle => {
                    return {
                        slug: muscle.value,
                        intensity: muscle.intensity,
                    };
                })}
                colors={[
                    '#00ccaa',
                    colors.secondaryButtonColor,
                    colors.buttonTextColor,
                ]}
                gender="male"
                onBodyPartPress={handleBodyPartPress}
                side={side}
                scale={1.1}
            />
            {/* <TouchableOpacity onPress={toggleSide} style={styles.button}>
                <Text style={styles.buttonText}>Rotate</Text>
            </TouchableOpacity> */}
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
        backgroundColor: colors.secondaryButtonColor,
        borderRadius: 5,
    },
    buttonText: {
        color: colors.buttonTextColor,
        fontSize: 16,
    },
});

export default BodyScreen;
