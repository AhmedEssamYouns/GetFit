import React from 'react';
import { View, Text, StyleSheet, Modal, Pressable } from 'react-native';
import colors from '../consts/colors';

interface ExerciseOptionsModalProps {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    options: { [key: string]: { title: string; data: string } };
    selectedOption: { title: string; data: string } | null;
    setSelectedOption: (option: { title: string; data: string }) => void;
}

const ExerciseOptionsModal: React.FC<ExerciseOptionsModalProps> = ({
    modalVisible,
    setModalVisible,
    options,
    selectedOption,
    setSelectedOption,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modalView}>
                <Text style={styles.modalText}>Select an Option</Text>
                <View style={styles.optionsContainer}>
                    {Object.keys(options).map((key) => (
                        <Pressable
                            key={key}
                            style={styles.button1}
                            onPress={() => {
                                setSelectedOption(options[key]);
                            }}
                        >
                            <Text style={styles.textStyle}>{options[key].title}</Text>
                        </Pressable>
                    ))}
                </View>

                {selectedOption && (
                    <View style={styles.optionContainer}>
                        <Text style={styles.optionTitle}>{selectedOption.title}</Text>
                        <Text style={styles.optionData}>{selectedOption.data}</Text>
                    </View>
                )}
                <Pressable
                    style={[styles.button2, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                >
                    <Text style={{ color: 'black' }}>Close</Text>
                </Pressable>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    modalView: {
        marginTop: 150,
        margin: 30,
        backgroundColor: colors.Button,
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button1: {
        borderRadius: 20,
        padding: 5,
        elevation: 5,
        marginVertical: 5,
        backgroundColor: colors.secondaryButtonColor,
    },
    button2: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 5,
    },
    buttonClose: {
        backgroundColor: colors.primaryButtonColor,
    },
    textStyle: {
        color: colors.buttonTextColor,
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 13,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: colors.primaryTextColor,
    },
    optionsContainer: {
        flexDirection: "row",
        gap: 10,
    },
    optionContainer: {
        padding: 20,
        backgroundColor: '#f0f0f0',
        borderRadius: 10,
        margin: 20,
    },
    optionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    optionData: {
        fontSize: 14,
    },
});

export default ExerciseOptionsModal;
