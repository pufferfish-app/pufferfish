import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function ExplorePage() {
  const transactionData = [5, 10, 8, 15, 7, 12, 20]; // Example transaction data for the last 7 days
  const labels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  return (
    <ScrollView style={styles.container}>
      {/* Map Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transaction Locations</Text>
        <View style={styles.mapContainer}>
          map here
        </View>
      </View>

      {/* Line Graph Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transactions Over Time</Text>
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: transactionData,
              },
            ],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#f8f9fa',
            backgroundGradientFrom: '#f8f9fa',
            backgroundGradientTo: '#ffffff',
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
            strokeWidth: 2, 
          }}
          bezier
          style={styles.chart}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  mapContainer: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  chart: {
    borderRadius: 10,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
