import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainTabNavigator from './navigation/TabNavigator';
import { StatusBar } from 'react-native';
import MainStackNavigator from './navigation/MainStackNavigator';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor="#121212" />
      <MainStackNavigator/>
    </NavigationContainer>
  );
}
