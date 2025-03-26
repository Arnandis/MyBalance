import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";  // Si quieres un footer de navegación
import { NavigationContainer } from "@react-navigation/native";
//tendra la navegacion de la app 
// Importar las pantallas
import LoginScreen from "../screens/LoginScreen";
import RegisterScreen from "../screens/RegisterScreen";
import HomeScreen from "../screens/HomeScreen";
import FinanzasScreen from "../screens/FinanzasScreen";
import TiempoScreen from "../screens/TiempoScreen";
import LogrosScreen from "../screens/LogrosScreen";
import RankingScreen from "../screens/RankingScreen";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator(); // Si usas un footer de navegación

// Stack para las pantallas principales
const MainStack = () => (
  <Stack.Navigator initialRouteName="HomeScreen">
    <Stack.Screen
      name="HomeScreen"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="FinanzasScreen"
      component={FinanzasScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="TiempoScreen"
      component={TiempoScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="LogrosScreen"
      component={LogrosScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RankingScreen"
      component={RankingScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// Pantallas de Login y Registro
const AuthStack = () => (
  <Stack.Navigator initialRouteName="LoginScreen">
    <Stack.Screen
      name="LoginScreen"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <Stack.Screen
      name="RegisterScreen"
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
  </Stack.Navigator>
);

// Navegación principal (si el usuario está autenticado o no)
const AppNavigation = () => {
  const isAuthenticated = true; // Aquí deberías poner tu lógica para saber si el usuario está autenticado.

  return (
    <NavigationContainer>
      {isAuthenticated ? <MainStack /> : <AuthStack />}
    </NavigationContainer>
  );
};

export default AppNavigation;
