import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../consts/colors';

interface ExerciseCardProps {
    exercise: {
        id: number;
        name: string;
        muscle: string;
        difficulty: string;
        gif?: string;
    };
    onPress: () => void;
}

const ExerciseCard: React.FC<ExerciseCardProps> = ({ exercise, onPress }) => {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <View style={{ borderRadius: 20, height: 80, width: 80, }}>
                <Image
                    source={{ uri: exercise.gif || 'https://fitthour.com/wp-content/uploads/2023/04/Barbell-Bench-Press-with-Incline.jpg' }}
                    style={styles.image}
                />
            </View>
            <View style={styles.cardContent}>
                <Text style={styles.name}>{exercise.name}</Text>
                <Text style={styles.muscle}>{exercise.muscle}</Text>
            </View>
            <TouchableOpacity style={styles.difficulty}>
                <FontAwesome name="trophy" size={16} color={colors.secondaryTextColor} />
                <Text style={styles.difficultyText}>{exercise.difficulty}</Text>
            </TouchableOpacity>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        backgroundColor: colors.cardBackgroundColor,
        padding: 10,
        marginVertical: 5,
        borderRadius: 15,
        shadowOpacity: 0.1,
        shadowRadius: 15,
    },
    image: {
        flex: 1,
        borderRadius: 10,
    },
    cardContent: {
        flex: 1,
        marginLeft: 10,
        justifyContent: 'center',
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color:colors.buttonTextColor
    },
    muscle: {
        fontSize: 14,
        color:colors.primaryButtonColor
    },
    difficulty: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        paddingHorizontal: 5,
        paddingVertical: 2,
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
    },
    difficultyText: {
        color:'#fff',
        marginLeft: 5,
    },
});

export default ExerciseCard;
