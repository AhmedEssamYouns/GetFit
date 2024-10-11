import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import HomeScreen from '../screens/Home';
import ExerciseScreen from '../screens/ExerciseScreen';
import colors from '../consts/colors';
import SavedWorkout from '../screens/SavedWorkoutScreen';
const Tab = createBottomTabNavigator();

function TabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarHideOnKeyboard: true,
                headerShown: false,
                tabBarShowLabel: false,
                tabBarActiveTintColor: '#00ffcc',
                tabBarInactiveTintColor: '#a0e0d0',
                tabBarStyle: {
                    backgroundColor: '#1a1a1a',
                    borderRightColor: colors.primaryButtonColor,
                    borderLeftColor:colors.primaryButtonColor,
                    borderRightWidth: 1,
                    borderLeftWidth:1,
                    borderTopWidth: 0,
                    position: "absolute",
                    margin: 20,
                    padding: 5,
                    borderRadius: 20,
                },
                tabBarIcon: ({ focused, color, size }) => {
                    if (route.name === 'Home') {
                        return <Octicons name='home' size={size} color={color} />;
                    } else if (route.name === 'Track Progress') {
                        return <Feather name="bar-chart-2" size={size} color={color} />;
                    } else if (route.name === 'Exercise') {
                        return <MaterialCommunityIcons name="dumbbell" size={size} color={color} />;
                    }
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Exercise" component={ExerciseScreen} />
            <Tab.Screen name="Track Progress" component={SavedWorkout} />
        </Tab.Navigator>
    );
}

export default TabNavigator;
