// src/components/CategoryButton.tsx
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import colors from '../consts/colors';

interface CategoryButtonProps {
    category: string;
    isSelected: boolean;
    onSelect: () => void;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({ category, isSelected, onSelect }) => {
    return (
        <TouchableOpacity
            style={[styles.categoryButton, isSelected && styles.selectedCategoryButton]}
            onPress={onSelect}
        >
            <Text style={[styles.categoryText, isSelected && styles.selectedCategoryText]}>
                {category}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    categoryButton: {
        padding: 6,
        borderRadius: 20,
        color:'white',
        backgroundColor: colors.Button,
        margin: 3,
        borderRightWidth:1,
        borderLeftWidth:1,
        borderColor:'white',
        minWidth:70,
        alignItems:'center',
    },
    selectedCategoryButton: {
        backgroundColor: colors.primaryButtonColor,
    },
    categoryText: {
        fontSize: 12,
        color: 'white',
    },
    selectedCategoryText: {
        color: 'black',
    },
});

export default CategoryButton;
