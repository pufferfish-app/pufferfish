import React from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity, Image } from 'react-native';

export default function HomePage() {
  const flaggedTransactions = [
    { id: '1', description: '$100.00 Zelle payment to suspicious account', details: 'View more details' },
  ];

  return (
    <View style={styles.container}>
      {/* Welcome Header Section */}
      <View style={styles.card}>
        <Text style={styles.greeting}>Welcome back, Ethan</Text>
        <Text style={styles.balance}>Your Balance: <Text style={styles.balanceAmount}>$0.92</Text></Text>
      </View>

      {/* Flagged Transactions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Flagged Transactions</Text>
        <FlatList
          data={flaggedTransactions}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.transactionCard}>
              <Text style={styles.transactionDescription}>{item.description}</Text>
              <TouchableOpacity>
                <Text style={styles.transactionDetails}>{item.details}</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundImage: 'linear-gradient(to bottom, #A1CEDC, #f8f9fa)',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    margin: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  greeting: {
    fontSize: 22,
    color: '#1D3D47',
    fontWeight: '600',
    marginBottom: 5,
  },
  balance: {
    fontSize: 18,
    color: '#555',
  },
  balanceAmount: {
    fontWeight: 'bold',
    color: '#FFD700',
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 10,
  },
  transactionCard: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderColor: '#ECECEC',
    borderWidth: 1,
  },
  transactionDescription: {
    fontSize: 15,
    color: '#444',
    marginBottom: 5,
  },
  transactionDetails: {
    fontSize: 14,
    color: '#1D3D47',
    textDecorationLine: 'underline',
  },
});
