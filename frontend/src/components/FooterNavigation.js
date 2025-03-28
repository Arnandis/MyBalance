//Tindra el header i footer este sera el que cridem en les pantalles principals.
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import FinanzasScreen from '../screens/FinanzasScreen';
import TiempoScreen from '../screens/TiempoScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();
//Si vuic posaro es en App.js en Component, pero pasa que si vuic navegar desde el home gastant els iconos no funciona. 
export default function FooterNavigation() {
  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'HomeScreen') {
              iconName = 'home';
            } else if (route.name === 'FinanzasScreen') {
              iconName = 'cash';
            } else if (route.name === 'TiempoScreen') {
              iconName = 'time';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#007AFF',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: { backgroundColor: '#fff', paddingBottom: 5, height: 60 },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Finanzas" component={FinanzasScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Tiempo" component={TiempoScreen} options={{ headerShown: false }} />
      </Tab.Navigator>
  );
}
