import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

interface DataPoint {
  day: string;
  value: number;
}

interface ChartProps {
  dataPoints: DataPoint[];
}

const Chart: React.FC<ChartProps> = ({ dataPoints }) => {
  return (
    <View style={styles.chartContainer}>
      <ScrollView horizontal>
        {dataPoints.map((point, index) => (
          <View key={index} style={styles.barContainer}>
            <Text style={styles.dayLabel}>{point.day}</Text>
            <View style={[styles.bar, { height: point.value * 2 }]} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 120,
    marginBottom: 20,
  },
  barContainer: {
    width: 50,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  dayLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  bar: {
    width: 30,
    backgroundColor: 'tomato',
    borderRadius: 5,
  },
});

export default Chart;
