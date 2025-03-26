import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginUser } from "../services/api"; // Importa la función desde api.js
import { globalStyles } from "../styles/stylesLogReg";
//Problemes: el usuari pot registrar un gmail que no te ni @ .com / al iniciar sesio mos redirigis a la pantalla home screen. 
//Mirar de no repetir codic en els botons.
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Por favor ingresa tu correo y contraseña");
      return;
    }

    try {
      const result = await loginUser(email, password); // Llama a la función del archivo api.js

      if (result.success) {
        await AsyncStorage.setItem("token", result.token); // Guarda el token en el almacenamiento
        Alert.alert("Éxito", "Inicio de sesión correcto");
        navigation.navigate("HomeScreen"); // Redirige a la pantalla principal
      } else {
        Alert.alert("Error", result.error || "Credenciales incorrectas");
      }
    } catch (error) {
      Alert.alert("Error", error.message || "Hubo un problema con la conexión a la API");
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Iniciar Sesión</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Correo electrónico"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <TextInput
        style={globalStyles.input}
        placeholder="Contraseña"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={globalStyles.button} onPress={handleLogin}>
        <Text style={globalStyles.buttonText}>Ingresar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("RegisterScreen")}>
        <Text style={globalStyles.linkText}>¿No tienes cuenta? Regístrate</Text>
      </TouchableOpacity>
    </View>
  );
};


export default LoginScreen;
