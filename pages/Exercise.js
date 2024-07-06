// ExerciseScreen.js

import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'; // Example: using FontAwesome icon
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

import { exercises } from '../components/Data';

const ExerciseScreen = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [filteredExercises, setFilteredExercises] = useState(exercises);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const muscleCategories = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Core'];

    const handleSearch = (text) => {
        setSearch(text);
        filterExercises(text, selectedCategory);
    };

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
        filterExercises(search, category);
    };

    const filterExercises = (searchText, category) => {
        let filtered = exercises;

        if (searchText) {
            filtered = filtered.filter((exercise) =>
                exercise.name.toLowerCase().includes(searchText.toLowerCase())
            );
        }

        if (category && category !== 'All') {
            filtered = filtered.filter((exercise) => exercise.muscle === category);
        }

        setFilteredExercises(filtered);
    };

    const navigateToDetail = (exercise) => {
        navigation.navigate('Exercise Detail', { exercise });
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.card} onPress={() => navigateToDetail(item)}>
            <Image
                source={{ uri: item.gif ? item.gif : 'https://fitthour.com/wp-content/uploads/2023/04/Barbell-Bench-Press-with-Incline.jpg' }}
                style={styles.image} />
            <View style={styles.cardContent}>
                <Text style={styles.name}>{item.name}</Text>
                <Text style={styles.muscle}>{item.muscle}</Text>
            </View>
            <TouchableOpacity style={styles.difficulty}>
                <Text>{item.difficulty}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            <View style={styles.searchBarContainer}>
                <TextInput
                    style={styles.searchBar}
                    placeholder="Search exercises"
                    value={search}
                    onChangeText={handleSearch}
                />
                <Icon name="search" color={'red'} size={20} />
            </View>
            <View style={styles.categoryContainer}>
                {muscleCategories.map((category) => (
                    <TouchableOpacity
                        key={category}
                        style={[
                            styles.categoryButton,
                            selectedCategory === category && styles.selectedCategoryButton
                        ]}
                        onPress={() => handleCategorySelect(category)}
                    >
                        <Text
                            style={[
                                styles.categoryText,
                                selectedCategory === category && styles.selectedCategoryText
                            ]}
                        >
                            {category}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
                data={filteredExercises}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: 20,
        marginBottom: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        paddingHorizontal: 10,
    },
    searchBar: {
        flex: 1,
        height: 40,
        paddingHorizontal: 10,
    },
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    categoryButton: {
        padding: 6,
        borderRadius: 20,
        backgroundColor: '#f0f0f0',
        margin: 3,
    },
    selectedCategoryButton: {
        backgroundColor: 'red',
    },
    categoryText: {
        fontSize: 12,
        color: '#000',
    },
    selectedCategoryText: {
        color: '#fff',
    },
    list: {
        paddingHorizontal: 10,
    },
    card: {
        flexDirection: 'row',
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginHorizontal: 10,
        marginVertical: 5,
        borderRadius: 5,
        shadowOpacity: 0.1,
        shadowRadius: 15,
        elevation: 0.3,
    },
    image: {
        width: 80,
        height: 80,
        borderRadius: 5,
    },
    cardContent: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    muscle: {
        fontSize: 14,
        color: '#666',
    },
    difficulty: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
    },
});

export default ExerciseScreen;
