import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import HomeScreen from '../pages/Home';
import BodyScreen from '../pages/BodyScreen';
import TrackScreen from '../pages/Track';
import ExerciseScreen from '../pages/Exercise';
import ExerciseDetailScreen from '../pages/Details';


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator({ navigation }) {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "red",
                tabBarInactiveTintColor: "gray",
                tabBarLabelStyle: {
                    fontSize: 14,
                    fontWeight: "bold",
                    display: "none"
                },
                tabBarStyle: {
                    backgroundColor: '#ffffff',
                    borderTopWidth: 1,
                    borderTopColor: '#dddddd',
                    display: 'flex'
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        return <Octicons name='home' size={size} color={color} />
                    } else if (route.name === 'Body') {
                        iconName = focused ? 'activity' : 'activity';
                    } else if (route.name === 'Track') {
                        iconName = focused ? 'bar-chart-2' : 'bar-chart-2';
                    } else if (route.name === 'Exercise') {
                        return <MaterialCommunityIcons name="dumbbell" size={size} color={color} />;
                    }

                    return <Feather name={iconName} size={size} color={color} />;
                },
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="Exercise" component={ExerciseScreen} />
            <Tab.Screen name="Body" component={BodyScreen} />
            <Tab.Screen name="Track" component={TrackScreen} />
        </Tab.Navigator>
    );
}

export default function MainTabNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Tabs"
                component={TabNavigator}
                options={{
                    headerShown: false,
                }}
            />
            <Stack.Screen name="Exercise Detail" component={ExerciseDetailScreen} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
}
