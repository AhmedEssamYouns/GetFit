// screens/ExerciseScreen.js
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default function TrackScreen({ navigation }) {

  return (
    <Button
      title="Go to Non-Tab Screen"
      onPress={() => navigation.navigate('NonTabScreen')}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
