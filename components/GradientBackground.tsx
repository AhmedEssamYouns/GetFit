import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

const GradientBackground = ({ children }) => {
    return (
        <LinearGradient
        colors={['#1a1a1a', '#004D4D', '#005B65']}

            style={styles.gradient}
            start={{ x: 0, y: 0 }} 
            end={{ x: 1, y: 1 }} 
        >
            {children}
        </LinearGradient>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1, 
        alignItems: 'center',
    },
});

export default GradientBackground;
