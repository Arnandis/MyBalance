import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";  // Importa la pantalla de registro

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen
          name="LoginScreen"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegisterScreen"  // Nombre de la pantalla de registro
          component={RegisterScreen}
          options={{ headerShown: false }}  // Opcional: desactivar el encabezado
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
