import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native';

export default function HomePage() {
  const flaggedTransactions = [
    { id: '1', description: '$100.00 Zelle payment to suspicious account', details: 'View more details' },
  ];

  const recentTransactions = [
    { id: '1', description: 'Starbucks Coffee', amount: '-$5.99' },
    { id: '2', description: 'Netflix Subscription', amount: '-$12.99' },
    { id: '3', description: 'Venmo Payment', amount: '+$50.00' },
    
  ];

  const [expandedId, setExpandedId] = useState(null);

  const toggleExpand = (id) => {
    setExpandedId((prevId) => (prevId === id ? null : id));
  };

  return (
    <View style={styles.container}>
      {/* Welcome Header Section */}
      <View style={styles.card}>
        <Text style={styles.greeting}>Welcome back, Ethan</Text>
        <Text style={styles.balance}>
          Your Balance: <Text style={styles.balanceAmount}>$0.92</Text>
        </Text>
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
              <TouchableOpacity onPress={() => toggleExpand(item.id)}>
                <Text style={styles.transactionDetails}>
                  {expandedId === item.id ? 'Hide details' : 'View more details'}
                </Text>
              </TouchableOpacity>
              {expandedId === item.id && (
                <View style={styles.collapsible}>
                  <Text style={styles.collapsibleText}>
                    This is placeholder text with additional details about the flagged transaction.
                  </Text>
                </View>
              )}
            </View>
          )}
        />
      </View>

      {/* Recent Transactions Section */}
      <View style={styles.recentTransactions}>
        <Text style={styles.sectionTitle}>Recent Transactions</Text>
        {recentTransactions.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.transactionCard,
            ]}
          >
            <View style={styles.transactionInfo}>
              <Text style={styles.transactionDescription}>{item.description}</Text>
              <Text
                style={[
                  styles.transactionAmount,
                  { color: item.amount.includes('-') ? 'red' : 'green' },
                ]}
              >
                {item.amount}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundImage: 'linear-gradient(180deg, rgba(177,192,214,1) 51%, rgba(255,244,225,1) 100%)',
    paddingBottom: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    paddingVertical: 30,
    paddingHorizontal: 20,
    marginHorizontal: 20,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  greeting: {
    fontSize: 28,
    color: '#1D3D47',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  balance: {
    fontSize: 24,
    color: '#007BFF',
    textAlign: 'center',
  },
  balanceAmount: {
    fontWeight: 'bold',
    color: '#28A745',
  },
  section: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  sectionTitle: {
    fontSize: 24,
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
  },
  transactionInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  transactionDescription: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
    flex: 1,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
    textAlign: 'right',
  },
  transactionDetails: {
    fontSize: 16,
    color: '#007BFF',
    textDecorationLine: 'underline',
  },
  collapsible: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  collapsibleText: {
    fontSize: 14,
    color: '#555',
  },
  recentTransactions: {
    paddingHorizontal: 20,
  },
});
