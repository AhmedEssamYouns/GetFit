import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import TabNavigator from './TabNavigator';
import ExerciseDetailScreen from '../pages/ExerciseDetailScreen';
import GetProgram from '../pages/getProgram';
import SuggestWorkout from '../pages/SuggestWorkoutSreen';
import CreateWorkout from '../pages/CreateWorkoutSreen';
import SavedWorkout from '../pages/SavedWorkoutScreen';

const Stack = createStackNavigator();

export default function MainStackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
            <Stack.Screen name="Detail" component={ExerciseDetailScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Program" component={GetProgram} options={{ headerShown: true }} />
            <Stack.Screen name="Suggested Workout" component={SuggestWorkout} options={{ headerShown: true }} />
            <Stack.Screen name="Create Workout" component={CreateWorkout} options={{ headerShown: true }} />
            <Stack.Screen name="My Program" component={SavedWorkout} options={{ headerShown: true }} />
        </Stack.Navigator>
    );
}
