import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import colors from '../consts/colors';
import { Ionicons } from '@expo/vector-icons';

interface HeaderProps {
    text: string;
    arrowBack?: boolean;
    onBackPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({ text, arrowBack = false, onBackPress }) => {
    return (


        <View style={styles.container}>
            {arrowBack && (<View style={styles.BackButtonContainer}>
                <TouchableOpacity onPress={onBackPress} style={styles.backButton}>
                    <Ionicons name="arrow-back" size={24} color="#fff" />
                </TouchableOpacity>
            </View>
            )}
            <View style={styles.title}>
                <Text style={styles.headerText}>{text}</Text>
            </View>
        </View>

    );
};

const styles = StyleSheet.create({
    headerText: {
        fontSize: 20,
        color: '#fff',
        alignSelf:'center',
        justifyContent:'center',
        padding: 4,
    },
    container: {
        width:'100%',
        flexDirection: "row",
        alignItems:'center',
        justifyContent:"center",
    },
    BackButtonContainer: {
        position:'absolute',
        left:15,
        top:18,
        backgroundColor: colors.header,
        padding: 10,
        alignSelf: 'center',
        borderRadius: 35,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: colors.primaryButtonColor,
    },
    title: {
        backgroundColor: colors.header,
        marginTop: 20,
        alignSelf: 'center',
        padding: 10,
        borderRightWidth: 1,
        borderLeftWidth: 1,
        borderColor: colors.primaryButtonColor,
        borderRadius: 90,
        minWidth: 100,
        alignItems: 'center',
        elevation: 5,
        justifyContent: 'space-between',
    },
    backButton: {
        padding: 8,
    },
});

export default Header;
