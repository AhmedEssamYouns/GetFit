// CustomBarChart.tsx

import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

interface CustomBarChartProps {
  data: number[];
}

const CustomBarChart: React.FC<CustomBarChartProps> = ({ data }) => {
  const maxDataValue = Math.max(...data);
  
  return (
    <View style={styles.container}>
      {data.map((value, index) => (
        <View key={index} style={styles.barContainer}>
          <Text style={styles.label}>Entry {index + 1}</Text>
          <View style={[styles.bar, { height: (value / maxDataValue) * 100 }]}>
            <Text style={styles.barText}>{value} kg</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  barContainer: {
    alignItems: 'center',
    width: 40,
  },
  bar: {
    backgroundColor: '#00ccff',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    borderRadius: 5,
  },
  label: {
    marginBottom: 5,
  },
  barText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});

export default CustomBarChart;
