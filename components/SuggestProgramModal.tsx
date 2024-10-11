import React from 'react';
import { View, Text, TouchableOpacity, TextInput, Modal, StyleSheet, Alert} from 'react-native';
import colors from '../consts/colors';

interface SuggestProgramModalProps {
    visible: boolean;
    onClose: () => void;
    onSuggest: (days: string, level: string) => void;
    level: string;
    setLevel: (level: string) => void;
    days: string;
    setDays: (days: string) => void;
}

const SuggestProgramModal: React.FC<SuggestProgramModalProps> = ({
    visible,
    onClose,
    onSuggest,
    level,
    setLevel,
    days,
    setDays,
}) => {
    const levels = ['Beginner', 'Intermediate', 'Advanced'];

    const handleSuggest = () => {
        const numDays = parseInt(days);
        if (isNaN(numDays) || numDays < 1) {
            Alert.alert('Invalid Input', 'Please enter a valid number of days.');
            return;
        }
        onSuggest(days, level);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <TouchableOpacity
                style={styles.modalContainer}
                activeOpacity={1}
                onPressOut={onClose}
            >
                <TouchableOpacity style={styles.modalView} activeOpacity={1}>
                    <Text style={styles.modalText}>
                        Enter days you are free to workout:
                    </Text>
                    <TextInput
                        style={styles.input}
                        placeholder="e.g., 3"
                        keyboardType="numeric"
                        value={days}
                        onChangeText={setDays}
                    />
                    <Text style={styles.modalText}>Choose your level:</Text>
                    <View style={styles.buttonGroup}>
                        {levels.map((lvl) => (
                            <TouchableOpacity
                                key={lvl}
                                style={[
                                    styles.levelButton,
                                    level === lvl && styles.selectedButton,
                                ]}
                                onPress={() => setLevel(lvl)}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        level === lvl && styles.selectedButtonText,
                                    ]}
                                >
                                    {lvl}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity style={styles.Submit} onPress={handleSuggest}>
                        <Text style={styles.buttonText}>Submit</Text>
                    </TouchableOpacity>
                </TouchableOpacity>
            </TouchableOpacity>
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
    modalView: {
        margin: 20,
        backgroundColor:colors.cardBackgroundColor,
        borderRadius: 10,
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
    modalText: {
        color:'#fff',
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        color:'#fff',
        width: '80%',
        marginBottom: 15,
        paddingHorizontal: 10,
    },
    buttonGroup: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    levelButton: {
        backgroundColor: colors.Button,
        padding: 10,
        margin: 5,
        borderRadius: 5,
    },
    selectedButton: {
        backgroundColor: colors.primaryButtonColor,
    },
    selectedButtonText: {
        color: 'black',
    },
    button: {
        backgroundColor: colors.header,
        padding: 15,
        borderRadius: 25,
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    Submit:{
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: colors.primaryButtonColor,
        padding:10,
        backgroundColor:colors.Button,
        marginTop:15,
        borderRadius:12,
    }
});

export default SuggestProgramModal;
