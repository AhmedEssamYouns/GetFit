// src/components/SearchBar.tsx
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import colors from '../consts/colors';

interface SearchBarProps {
    search: string;
    onSearch: (text: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ search, onSearch }) => {
    return (
        <View style={styles.searchBarContainer}>
            <TextInput
                style={styles.searchBar}
                placeholder="Search exercises"
                placeholderTextColor={'white'}
                value={search}
                onChangeText={onSearch}
            />
            <Ionicons name="search" color={colors.primaryTextColor} size={20} />
        </View>
    );
};

const styles = StyleSheet.create({
    searchBarContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colors.Button,
        marginHorizontal: 20,
        marginBottom: 20,
        borderRightWidth: 1,
        borderLeftWidth:1,
        borderColor: colors.primaryButtonColor,
        borderRadius: 25,
        elevation:3,
        color:'white',
        marginTop:20,
        paddingHorizontal: 10,
    },
    searchBar: {
        flex: 1,
        height: 40,
        color:'white',
        paddingHorizontal: 10,
    },
});

export default SearchBar;
