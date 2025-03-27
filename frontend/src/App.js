import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";  // Importa la pantalla de registro
import HomeScreen from "./screens/HomeScreen";
import FinanzasScreen from "./screens/FinanzasScreen";
import PerfilScreen from "./screens/PerfilScreen";
import TiempoScreen from "./screens/TiempoScreen";

const Stack = createStackNavigator();
//pasar la navegacio a la carpeta navigation en un archiu apart.
//fer una pantalla inicial en uns iconos grans que te duguen a finanzas tiempo... y te de la bienvenida
//pensar en fer un apartat que pose mis graficos, ahi ya esta tota la informacio dels grafics que ha anat fent y que puga buscar per dia, categoria...
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
          name="PerfilScreen"
          component={PerfilScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="TiempoScreen"
          component={TiempoScreen}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
