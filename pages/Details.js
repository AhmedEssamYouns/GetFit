import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, FlatList, TouchableOpacity } from 'react-native';
import { exercises } from '../components/Data';
import { useNavigation } from '@react-navigation/native';

const ExerciseDetailScreen = ({ route }) => {
    const { exercise } = route.params;
    const navigation = useNavigation()
    const similarExercises = exercises.filter(item => item.muscle === exercise.muscle && item.id !== exercise.id);

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
            <View style={styles.detailsContainer}>
                <Text style={styles.name}>{exercise.name}</Text>
                <View style={{ flexDirection: "row", gap: 10, alignSelf: "center", backgroundColor: "#eeee", padding: 10, borderRadius: 10, elevation: 2 }}>
                    <View>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flexDirection: "column" }}>
                                <Text style={styles.infoLabel}>Muscle Group:</Text>
                                <Text style={styles.infoLabel}>Equipment:</Text>
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
    infoRow: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 200,
        marginBottom: 10,
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
        elevation: 5
    },
    similarExerciseImage: {
        padding: 10,
        height: 100,
        resizeMode: 'stretch',
    },
    similarExerciseName: {
        padding: 10,
        fontSize: 13,
        justifyContent: "center",
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    similarExercisesList: {
        paddingHorizontal: 10,
    },
});
export default ExerciseDetailScreen;
