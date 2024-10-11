import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet} from 'react-native';
import colors from '../consts/colors';

interface ChooseProgramModalProps {
    visible: boolean;
    onClose: () => void;
    onChoose: (plan: string, level: string) => void;
    programLevel: string;
    setProgramLevel: (level: string) => void;
    programPlan: string;
    setProgramPlan: (plan: string) => void;
}

const ChooseProgramModal: React.FC<ChooseProgramModalProps> = ({
    visible,
    onClose,
    onChoose,
    programLevel,
    setProgramLevel,
    programPlan,
    setProgramPlan,
}) => {
    const levels = ['Beginner', 'Intermediate', 'Advanced'];
    const plans = ['Push-Pull-Legs', 'Pro Split', 'Arnold Split'];

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
                    <Text style={styles.modalText}>Choose your level:</Text>
                    <View style={styles.buttonGroup}>
                        {levels.map((lvl) => (
                            <TouchableOpacity
                                key={lvl}
                                style={[
                                    styles.levelButton,
                                    programLevel === lvl && styles.selectedButton,
                                ]}
                                onPress={() => setProgramLevel(lvl)}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        programLevel === lvl && styles.selectedButtonText,
                                    ]}
                                >
                                    {lvl}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <Text style={styles.modalText}>Choose your plan:</Text>
                    <View style={styles.buttonGroup}>
                        {plans.map((plan) => (
                            <TouchableOpacity
                                key={plan}
                                style={[
                                    styles.levelButton,
                                    programPlan === plan && styles.selectedButton,
                                ]}
                                onPress={() => setProgramPlan(plan)}
                            >
                                <Text
                                    style={[
                                        styles.buttonText,
                                        programPlan === plan && styles.selectedButtonText,
                                    ]}
                                >
                                    {plan}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                    <TouchableOpacity
                        style={styles.Submit}
                        onPress={() => {
                            onChoose(programPlan, programLevel);
                            onClose();
                        }}
                    >
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
        backgroundColor: colors.cardBackgroundColor,
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
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
        color: '#fff',

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
        marginTop:15,
        borderRadius:12,
        backgroundColor:colors.Button,

    }
});

export default ChooseProgramModal;
