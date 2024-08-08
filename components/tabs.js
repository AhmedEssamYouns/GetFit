import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { Feather, MaterialCommunityIcons, Octicons } from '@expo/vector-icons';
import { TouchableOpacity, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import HomeScreen from '../pages/Home';
import BodyScreen from '../pages/BodyScreen';
import TrackScreen from '../pages/Track';
import ExerciseScreen from '../pages/Exercise';
import ExerciseDetailScreen from '../pages/Details';
import getProgram from '../pages/getProgram';
import SuggestWorkout from '../pages/plan';
import CreateWorkout from '../pages/create';
import SavedWorkout from '../pages/saved';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function TabNavigator({ navigation }) {
    const [keyboardVisible, setKeyboardVisible] = React.useState(false);

    React.useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener(
            'keyboardDidShow',
            () => {
                setKeyboardVisible(true);
            }
        );
        const keyboardDidHideListener = Keyboard.addListener(
            'keyboardDidHide',
            () => {
                setKeyboardVisible(false);
            }
        );

        return () => {
            keyboardDidHideListener.remove();
            keyboardDidShowListener.remove();
        };
    }, []);

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarActiveTintColor: "tomato",
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
                    display: keyboardVisible ? 'none' : 'flex'  // Hide tab bar when keyboard is visible
                },
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'Home') {
                        return <Octicons name='home' size={size} color={color} />
                    } else if (route.name === 'Body') {
                        iconName = focused ? 'activity' : 'activity';
                    } else if (route.name === 'Track Prograss') {
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
            <Tab.Screen name="Track Prograss" component={TrackScreen} />
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
            <Stack.Screen name="Program" component={getProgram} options={{ headerShown: true }} />
            <Stack.Screen name="Suggested Workout" component={SuggestWorkout} options={{ headerShown: true }} />
            <Stack.Screen name="Create Workout" component={CreateWorkout} options={{ headerShown: true }} />
            <Stack.Screen name="My Program" component={SavedWorkout} options={{ headerShown: true }} />



        </Stack.Navigator>
    );
}
