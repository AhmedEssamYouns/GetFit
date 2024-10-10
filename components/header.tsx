import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../consts/colors';

interface HeaderProps {
    text: string;
}

const Header: React.FC<HeaderProps> = ({ text }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>{text}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        color: '#fff',
        padding:4,
    },
    container: {
        backgroundColor: colors.header,
        marginTop: 20,
        maxWidth:120,
        alignSelf:'center',
        padding: 10,
        borderRightWidth: 1,
        borderLeftWidth:1,
        borderColor: colors.primaryButtonColor,
        borderRadius: 90,
        minWidth: 100,
        alignItems: 'center',
        elevation: 5,

    }
});

export default Header;
