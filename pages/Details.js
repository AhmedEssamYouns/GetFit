import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity, Modal, Pressable } from 'react-native';
import { exercises } from '../components/Data';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';



const options = {
    hypertrophy: {
        title: "Hypertrophy",
        data: "Reps: 6-12, Sets: 3-6, Rest: 30-90s, Intensity: 67-85% of 1RM"
    },
    strength: {
        title: "Strength",
        data: "Reps: 1-6, Sets: 3-5, Rest: 2-5min, Intensity: 85-100% of 1RM"
    },
    endurance: {
        title: "Endurance",
        data: "Reps: 12-20+, Sets: 2-3, Rest: <30s, Intensity: <67% of 1RM"
    }
};

const ExerciseDetailScreen = ({ route }) => {
    const { exercise } = route.params;
    const navigation = useNavigation();
    const similarExercises = exercises.filter(item => item.muscle === exercise.muscle && item.id !== exercise.id);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options.hypertrophy);


    const renderSimilarExercise = ({ item }) => (
        <TouchableOpacity
            style={styles.similarExerciseCard}
            onPress={() => navigation.navigate('Exercise Detail', { exercise: item })}
        >
            <Image source={{ uri: item.gif ? item.gif : 'https://fitthour.com/wp-content/uploads/2023/04/Barbell-Bench-Press-with-Incline.jpg' }} style={styles.similarExerciseImage} />
            <Text style={styles.similarExerciseName}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container}>
            <Image source={{ uri: exercise.gif ? exercise.gif : 'https://fitthour.com/wp-content/uploads/2023/04/Barbell-Bench-Press-with-Incline.jpg' }} style={styles.image} />
            <TouchableOpacity style={styles.infoIcon} onPress={() => setModalVisible(true)}>
                <Feather name="info" size={28} color="black" />
            </TouchableOpacity>
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{exercise.name}</Text>
                <View style={{ flexDirection: "row", gap: 10, alignSelf: "center", backgroundColor: "#eeee", padding: 10, borderRadius: 10, elevation: 2 }}>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.infoLabel}>Muscle Group:</Text>
                                <Text style={styles.infoLabel}>Type:</Text>
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.info}>{exercise.muscle}</Text>
                                <Text style={styles.info}>{exercise.type}</Text>
                            </View>
                        </View>
                    </View>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.infoLabel}>Equipment:</Text>
                                <Text style={styles.infoLabel}>Difficulty:</Text>
                            </View>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.info}>{exercise.equipment}</Text>
                                <Text style={styles.info}>{exercise.difficulty}</Text>
                            </View>
                        </View>
                    </View>
                </View>
                <Text style={styles.sectionHeader}>Instructions</Text>
                <Text style={styles.instructions}>{exercise.instructions}</Text>
                <View style={styles.similarExercisesSection}>
                    <Text style={styles.sectionHeader}>More Exercises for {exercise.muscle}</Text>
                    <FlatList
                        data={similarExercises}
                        renderItem={renderSimilarExercise}
                        keyExtractor={item => item.id.toString()}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.similarExercisesList}
                    />
                </View>
            </View>

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
                    <View style={{ flexDirection: "row", gap: 10 }}>
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
                        <Text style={styles.textStyle}>Close</Text>
                    </Pressable>
                </View>
            </Modal>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    image: {
        width: '50%',
        height: 170,
        alignSelf: 'center',
        resizeMode: 'cover',
        marginVertical: 20,
    },
    infoIcon: {
        position: 'absolute',
        top: 40,
        right: 20,
    },
    detailsContainer: {
        paddingHorizontal: 20,
        paddingBottom: 30,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
    },
    infoLabel: {
        fontWeight: 'bold',
        marginRight: 5,
    },
    info: {
        flex: 1,
        fontSize: 13,
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
    },
    instructions: {
        fontSize: 14,
        lineHeight: 22,
    },
    similarExercisesSection: {
        marginTop: 0,
    },
    similarExerciseCard: {
        marginRight: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
        width: 120,
        height: 150,
        marginBottom: 10,
        elevation: 5,
    },
    similarExerciseImage: {
        padding: 10,
        height: 100,
        resizeMode: 'stretch',
    },
    similarExerciseName: {
        padding: 10,
        fontSize: 13,
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    similarExercisesList: {
        paddingHorizontal: 10,
    },
    modalView: {
        marginTop:150,
        margin: 30,
        backgroundColor: 'white',
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
        backgroundColor: 'grey',
    },
    button2: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginVertical: 5,
    },
    buttonClose: {
        backgroundColor: '#2196F3',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 13,
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
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
        fontSize: 16,
    },
});

export default ExerciseDetailScreen;
