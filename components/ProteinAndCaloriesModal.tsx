import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import colors from '../consts/colors';

interface ProteinAndCaloriesModalProps {
    visible: boolean;
    onClose: () => void;
    onCalculate: (weight: string, height: string, goal: string) => void;
    proteinResult: string;
    caloriesResult: string;
}

const ProteinAndCaloriesModal: React.FC<ProteinAndCaloriesModalProps> = ({
    visible,
    onClose,
    onCalculate,
    proteinResult,
    caloriesResult,
}) => {
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');

    const handleCalculate = (goal: string) => {
        onCalculate(weight, height, goal);
        setWeight('');
        setHeight('');
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Calculate Protein and Calories Intake</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your weight (kg)"
                        keyboardType="numeric"
                        onChangeText={setWeight}
                        value={weight}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your height (cm)"
                        keyboardType="numeric"
                        onChangeText={setHeight}
                        value={height}
                    />
                    <TouchableOpacity style={styles.modalButton} onPress={() => handleCalculate('gainMuscleWeight')}>
                        <Text style={styles.buttonText}>Gain Muscle and Weight</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={() => handleCalculate('loseWeightGainMuscle')}>
                        <Text style={styles.buttonText}>Lose Weight and Gain Muscle</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalButton} onPress={() => handleCalculate('gainPureMuscle')}>
                        <Text style={styles.buttonText}>Gain Pure Muscle</Text>
                    </TouchableOpacity>
                    <Text style={styles.resultText}>{proteinResult}</Text>
                    <Text style={styles.resultText}>{caloriesResult}</Text>
                    <TouchableOpacity style={[styles.modalButton, { marginTop: 15 }]} onPress={onClose}>
                        <Text style={styles.buttonText}>Close</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: colors.cardBackgroundColor,
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        borderColor: colors.cardBorderColor,
        borderWidth: 1,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 15,
        color: colors.primaryTextColor,
    },
    input: {
        width: 200,
        height: 40,
        borderWidth: 1,
        borderColor: colors.cardBorderColor,
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
        color: colors.primaryTextColor,
    },
    modalButton: {
        backgroundColor: colors.Button,
        paddingVertical: 8,
        margin:5,
        paddingHorizontal: 20,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 10,
        color: colors.buttonTextColor,
    },
    resultText: {
        marginTop: 10,
        fontSize: 16,
        color: colors.primaryTextColor,
    },
});

export default ProteinAndCaloriesModal;
