import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { exercises } from '../Data/Data';
import SearchBar from '../components/SearchBar';
import CategoryButton from '../components/CategoryButton';
import ExerciseCard from '../components/ExerciseCard';
import colors from '../consts/colors';
import GradientBackground from '../components/GradientBackground';
import Header from '../components/header';

const ExerciseScreen = ({ navigation }) => {
    const [search, setSearch] = useState('');
    const [filteredExercises, setFilteredExercises] = useState(exercises);
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const muscleCategories = ['All', 'Chest', 'Back', 'Legs', 'Arms', 'Shoulders', 'Abs'];

    const handleSearch = (text: string) => {
        setSearch(text);
        filterExercises(text, selectedCategory);
    };

    const handleCategorySelect = (category: string) => {
        setSelectedCategory(category);
        filterExercises(search, category);
    };

    const filterExercises = (searchText: string, category: string | null) => {
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

    const navigateToDetail = (exercise: any) => {
        navigation.navigate('Detail', { exercise: exercise })
    };

    const renderItem = ({ item }: { item: any }) => (
        <ExerciseCard exercise={item} onPress={() => navigateToDetail(item)} />
    );

    return (
        <GradientBackground>
            <FlatList
                ListHeaderComponent={
                    <>
                        <Header text='Exercises' />
                        <SearchBar search={search} onSearch={handleSearch} />
                        <View style={styles.categoryContainer}>
                            {muscleCategories.map((category) => (
                                <CategoryButton
                                    key={category}
                                    category={category}
                                    isSelected={selectedCategory === category}
                                    onSelect={() => handleCategorySelect(category)}
                                />
                            ))}
                        </View></>
                }
                data={filteredExercises}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                contentContainerStyle={styles.list}
            />
        </GradientBackground>
    );
};

const styles = StyleSheet.create({
    categoryContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        marginBottom: 20,
    },
    list: {
        paddingHorizontal: 10,
    },
});

export default ExerciseScreen;
