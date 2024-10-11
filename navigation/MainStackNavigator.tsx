import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import ExerciseDetailScreen from '../screens/ExerciseDetailScreen';
import GetProgram from '../screens/getProgram';
import SuggestWorkout from '../screens/SuggestWorkoutSreen';
import CreateWorkout from '../screens/CreateWorkoutSreen';
import SavedWorkout from '../screens/SavedWorkoutScreen';

const Stack = createStackNavigator();

export default function MainStackNavigator() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Tabs" component={TabNavigator} />
            <Stack.Screen name="Detail" component={ExerciseDetailScreen} />
            <Stack.Screen name="Program" component={GetProgram} />
            <Stack.Screen name="Suggested Workout" component={SuggestWorkout} />
            <Stack.Screen name="Create Workout" component={CreateWorkout} />
            <Stack.Screen name="My Program" component={SavedWorkout} />
        </Stack.Navigator>
    );
}
