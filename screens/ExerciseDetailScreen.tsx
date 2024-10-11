import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { exercises } from '../Data/Data';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import colors from '../consts/colors';
import { ExerciseDetailScreenProps, Exercise } from '../navigation/NavigationTypes';
import SimilarExerciseCard from '../components/SimilarExerciseCard';
import GradientBackground from '../components/GradientBackground';
import Header from '../components/header';
import ExerciseOptionsModal from '../components/ExerciseOptionsModal';

const options = {
    hypertrophy: {
        title: "Hypertrophy",
        data: "Reps: 6-12, Sets: 3-6, Rest: 30-90s, Intensity: 67-85% of 1RM",
    },
    strength: {
        title: "Strength",
        data: "Reps: 1-6, Sets: 3-5, Rest: 2-5min, Intensity: 85-100% of 1RM",
    },
    endurance: {
        title: "Endurance",
        data: "Reps: 12-20+, Sets: 2-3, Rest: <30s, Intensity: <67% of 1RM",
    },
};

const ExerciseDetailScreen: React.FC<ExerciseDetailScreenProps> = ({ route }) => {
    const { exercise } = route.params;
    const navigation = useNavigation();
    const similarExercises = exercises.filter(item => item.muscle === exercise.muscle && item.id !== exercise.id);

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(options.hypertrophy);

    const renderSimilarExercise = ({ item }: { item: Exercise }) => (
        <SimilarExerciseCard
            item={item}
            onPress={() => navigation.navigate('Detail', { exercise: item })}
        />
    );

    return (
        <GradientBackground>
            <ScrollView style={styles.container}>
                <Header text={exercise.name} arrowBack={true} onBackPress={() => navigation.goBack()} />
                <Image
                    source={{ uri: exercise.gif ? exercise.gif : 'https://fitthour.com/wp-content/uploads/2023/04/Barbell-Bench-Press-with-Incline.jpg' }}
                    style={styles.image}
                />
                <TouchableOpacity style={styles.infoIcon} onPress={() => setModalVisible(true)}>
                    <Feather name="info" size={28} color="white" />
                </TouchableOpacity>
                <View style={styles.detailsContainer}>
                    <Text style={styles.name}>{exercise.name}</Text>
                    <View style={styles.infoRow}>
                        <View>
                            <View style={styles.Row}>
                                <View style={styles.Row}>
                                    <Text style={styles.infoLabel}>Muscle Group:</Text>
                                    <Text style={styles.info}>{exercise.muscle}</Text>
                                </View>
                                <View style={styles.Row}>
                                    <Text style={styles.infoLabel}>Type:</Text>
                                    <Text style={styles.info}>{exercise.type}</Text>
                                </View>
                            </View>
                            <View style={styles.Row}>
                                <View style={styles.Row}>
                                    <Text style={styles.infoLabel}>Equipment:</Text>
                                    <Text style={styles.info}>{exercise.equipment}</Text>
                                </View>
                                <View style={styles.Row}>
                                    <Text style={styles.infoLabel}>Difficulty:</Text>
                                    <Text style={styles.info}>{exercise.difficulty}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                    <Text style={styles.sectionHeader}>Description</Text>
                    <Text style={styles.instructions}>{exercise.description}</Text>
                    <Text style={styles.sectionHeader}>Instructions</Text>
                    <Text style={styles.instructions}>{exercise.instructions}</Text>
                    {similarExercises.length != 0 && (
                        <View style={styles.similarExercisesSection}>
                            <Text style={styles.sectionHeader}>More Exercises for {exercise.muscle}</Text>
                            <FlatList
                                data={similarExercises}
                                renderItem={renderSimilarExercise}
                                keyExtractor={item => item.id.toString()}
                                horizontal
                                showsHorizontalScrollIndicator={false}
                            />
                        </View>
                    )}
                </View>

                <ExerciseOptionsModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    options={options}
                    selectedOption={selectedOption}
                    setSelectedOption={setSelectedOption}
                />
            </ScrollView>
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    image: {
        width: '50%',
        height: 170,
        borderRadius: 10,
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
    Row: {
        flexDirection: "row",
        width: 150,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center',
        color: colors.primaryTextColor,
    },
    infoRow: {
        backgroundColor: colors.cardBackgroundColor,
        padding: 10,
        borderRadius: 10,
        elevation: 2,
    },
    infoLabel: {
        fontWeight: 'bold',
        marginRight: 5,
        color: 'white'
    },
    info: {
        flex: 1,
        fontSize: 13,
        color: 'white'
    },
    sectionHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        marginTop: 20,
        marginBottom: 10,
        color: colors.secondaryTextColor,
    },
    instructions: {
        fontSize: 14,
        lineHeight: 22,
        color: colors.cardTextColor,
    },
    similarExercisesSection: {
        marginTop: 0,
    },
});

export default ExerciseDetailScreen;
