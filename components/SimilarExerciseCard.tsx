// SimilarExerciseCard.tsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import colors from '../consts/colors';

interface SimilarExerciseCardProps {
    item: {
        id: number;
        name: string;
        gif?: string;
        muscle: string;
    };
    onPress: () => void;
}

const SimilarExerciseCard: React.FC<SimilarExerciseCardProps> = ({ item, onPress }) => (
    <TouchableOpacity style={styles.card} onPress={onPress}>
        <Image
            source={{ uri: item.gif || 'https://fitthour.com/wp-content/uploads/2023/04/Barbell-Bench-Press-with-Incline.jpg' }}
            style={styles.image}
        />
        <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    card: {
        marginRight: 10,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: colors.cardBackgroundColor,
        width: 120,
        height: 150,
        marginBottom: 10,
        elevation: 5,
    },
    image: {
        padding: 10,
        height: 100,
        resizeMode: 'stretch',
    },
    name: {
        padding: 10,
        fontSize: 13,
        justifyContent: 'center',
        alignSelf: 'center',
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.cardTextColor,
    },
});

export default SimilarExerciseCard;
