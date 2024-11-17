import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View, Text, Image } from 'react-native';
import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { useAuth } from '@/context/AuthContext'; 

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { isLogged } = useAuth();

  if (!isLogged) {
    return (
      <View style={styles.authRequiredContainer}>
        <Text style={styles.authRequiredText}>Please log in to access this feature.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* App Logo Header */}
      <View style={styles.logoHeader}>
        <Image source={require('@/assets/images/pufferfish.png')} style={styles.logo} />
      </View>

      {/* Tab Navigator */}
      <Tabs
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          headerShown: false,
          tabBarButton: HapticTab,
          tabBarBackground: TabBarBackground,
          tabBarStyle: {
            height: 70, 
            paddingBottom: 10, 
            paddingTop: 10,
          },
          tabBarIconStyle: {
            width: 40, 
            height: 40,
          },
          tabBarLabelStyle: {
            fontSize: 14, 
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => <IconSymbol size={48} name="house.fill" color={color} />, 
          }}
        />
        <Tabs.Screen
          name="explore"
          options={{
            title: 'Explore',
            tabBarIcon: ({ color }) => <IconSymbol size={48} name="chart.pie" color={color} />, 
          }}
        />
        <Tabs.Screen
          name="personal"
          options={{
            title: 'Personal',
            tabBarIcon: ({ color }) => <IconSymbol size={48} name="person.fill" color={color} />,
          }}
        />
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  authRequiredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  authRequiredText: {
    fontSize: 18,
    color: '#666',
    fontWeight: 'bold',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    backgroundColor: '#003366',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logoHeader: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
});
