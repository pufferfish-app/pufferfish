import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import axios from 'axios';

export default function ExplorePage() {
  const [transactionData, setTransactionData] = useState([]);
  const [labels, setLabels] = useState([]);
  const [AISummary, setAISummary] = useState([]);
  const [fraudDetails, setFraudDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        /*const fraud = await axios.post('https://pufferfish-xurta.ondigitalocean.app/detect-fraud', {
          username: 'jdoe',
          password: 'verysecurepassword',
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        setFraudDetails(fraud.data);

         // Fetch transaction data
         const AISummary = await axios.post('https://pufferfish-xurta.ondigitalocean.app/lim_fraud_summary', {
          username: 'jdoe',
          password: 'verysecurepassword',
          possible_fraud_details: 'fraudDetails',
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });*/

        // Fetch transaction data
        const transactionResponse = await axios.post('https://pufferfish-xurta.ondigitalocean.app/transactions', {
          username: 'jdoe',
          password: 'verysecurepassword',
        }, {
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const transactions = transactionResponse.data;

        // Extract amounts and dates
        const amounts = transactions.map(transaction => Math.abs(parseFloat(transaction.amount)));
        const dates = transactions.map(transaction => new Date(transaction.posted * 1000).toLocaleDateString());

        setTransactionData(amounts);

        // Format updatedDates to MM/YY for 1 out of every 5 dates
        const updatedDates = dates.map((date, index) => {
          if (index % 5 === 0) {
            const dateObj = new Date(date);
            return `${(dateObj.getMonth() + 1).toString().padStart(2, '0')}/${dateObj.getFullYear().toString().slice(-2)}`;
          }
          return '';
        });

        setLabels(updatedDates);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView style={styles.container}>

      {/* Line Graph Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Transactions Over Time</Text>
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: transactionData,
                label: 'updatedAmounts',
              },
            ],
          }}
          width={Dimensions.get('window').width - 40}
          height={220}
          chartConfig={{
            backgroundColor: '#ffffff',
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            decimalPlaces: 2,
            color: (opacity = 1) => `rgba(0, 123, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(51, 51, 51, ${opacity})`,
            strokeWidth: 2,
            propsForLabels: {
              transform: [{ rotate: '45deg' }],
              textAnchor: 'start',
            },

          }}
          yAxisLabel='$'
          yLabelsOffset={50}
          verticalLabelRotation={-30}
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