import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, TextInput, Button } from 'react-native';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';

const apiUrl = "http://pufferfish-xurta.ondigitalocean.app";

export default function PersonalPage() {
  const userName = "Ethan Gibbs"; 
  const { setIsLogged, username, password } = useAuth();
  const router = useRouter();

  const [isModalVisible, setModalVisible] = useState(false);
  const [simplefinToken, setSimplefinToken] = useState("");

  const handleChangeBank = () => {
    setModalVisible(true); 
  };

  const handleLogout = () => {
    setIsLogged(false);
    router.replace("/");
  };

  const handleSaveBank = async () => {
    console.log(username, password)
    if (!username || !password) {
      console.error("Username or password missing from AuthContext");
      return;
    }

    const payload = {
      auth_details: {
        username,
        password,
      },
      simplefin_setup_token: simplefinToken,
    };

    try {
      const response = await fetch(`${apiUrl}/setup_simplefin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        console.log("Bank setup saved successfully.");
      } else {
        const errorData = await response.json();
        console.error("Failed to save bank setup:", errorData);
      }
    } catch (error) {
      console.error("Error saving bank setup:", error);
    } finally {
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.userName}>{userName}</Text>
      </View>

      {/* Buttons Section */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleChangeBank}>
          <Text style={styles.buttonText}>Change Bank Account</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.logoutButton]} onPress={handleLogout}>
          <Text style={[styles.buttonText, styles.logoutText]}>Logout</Text>
        </TouchableOpacity>
      </View>

      {/* Modal Section */}
      <Modal
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Change Bank Account</Text>
            <Text style={styles.modalSubtitle}>https://beta-bridge.simplefin.org/</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter token"
              value={simplefinToken}
              onChangeText={setSimplefinToken}
            />
            <View style={styles.modalButtons}>
              <Button title="Save" onPress={handleSaveBank} color="#007BFF" />
              <Button title="Cancel" onPress={() => setModalVisible(false)} color="#FF4D4D" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  buttonContainer: {
    marginTop: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, 
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  logoutButton: {
    backgroundColor: '#FF4D4D',
  },
  logoutText: {
    color: '#fff',
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  modalSubtitle: {
    fontSize: 14,
    marginBottom: 15,
    color: '#333',
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    opacity: 0.5,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
});
