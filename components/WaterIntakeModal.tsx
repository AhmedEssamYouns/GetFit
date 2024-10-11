import React, { useState } from 'react';
import { View, Text, StyleSheet, Modal, TextInput, TouchableOpacity } from 'react-native';
import colors from '../consts/colors';

interface WaterIntakeModalProps {
    visible: boolean;
    onClose: () => void;
    onCalculate: (weight: string) => void;
    waterResult: string;
}

const WaterIntakeModal: React.FC<WaterIntakeModalProps> = ({
    visible,
    onClose,
    onCalculate,
    waterResult,
}) => {
    const [weight, setWeight] = useState<string>('');

    const handleCalculate = () => {
        onCalculate(weight);
        setWeight('');
    };

    return (
        <Modal visible={visible} animationType="slide" transparent={true}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalTitle}>Calculate Water Intake</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Enter your weight (kg)"
                        placeholderTextColor={'#fff'}
                        keyboardType="numeric"
                        onChangeText={setWeight}
                        value={weight}
                    />
                    <TouchableOpacity style={styles.modalButton} onPress={handleCalculate}>
                        <Text style={styles.buttonText}>Calculate</Text>
                    </TouchableOpacity>
                    <Text style={styles.resultText}>{waterResult}</Text>
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

export default WaterIntakeModal;
