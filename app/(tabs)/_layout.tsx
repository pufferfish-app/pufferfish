import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, StyleSheet, View, Text, Image } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

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
      height: 70, // Increased height for the tab bar
      paddingBottom: 10, // Adjust padding for proper alignment
      paddingTop: 10,
    },
    tabBarIconStyle: {
      width: 40, // Adjust size for the icons
      height: 40,
    },
    tabBarLabelStyle: {
      fontSize: 14, // Increase font size for labels
    },
  }}
>
  <Tabs.Screen
    name="index"
    options={{
      title: 'Home',
      tabBarIcon: ({ color }) => <IconSymbol size={48} name="house.fill" color={color} />, // Increase icon size
    }}
  />
  <Tabs.Screen
    name="explore"
    options={{
      title: 'Explore',
      tabBarIcon: ({ color }) => <IconSymbol size={48} name="chart.line" color={color} />, // Increase icon size
    }}
  />
  <Tabs.Screen
    name="personal"
    options={{
      title: 'Personal',
      tabBarIcon: ({ color }) => <IconSymbol size={48} name="person.fill" color={color} />, // Increase icon size
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
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
  },
  logo: {
    width: 75,
    height: 75,
    resizeMode: 'contain',
  },
});
