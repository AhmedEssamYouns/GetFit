// NavigationTypes.ts
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export type RootStackParamList = {
    'Exercise Detail': { exercise: Exercise }; 
};

export type ExerciseDetailScreenProps = {
    navigation: StackNavigationProp<RootStackParamList, 'Exercise Detail'>;
    route: RouteProp<RootStackParamList, 'Exercise Detail'>;
};

export interface Exercise {
    id: number;
    name: string;
    muscle: string;
    equipment: string;
    difficulty: string;
    type:string;
    description:string;
    instructions: string;
    gif?: string; 
}