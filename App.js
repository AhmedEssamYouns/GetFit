import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './components/tabs';

export default function App() {
  return (
    <NavigationContainer>
      <MainTabNavigator/>
    </NavigationContainer>
  );
}
