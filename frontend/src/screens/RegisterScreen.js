import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { registerUser } from "../services/api";  // Importar la función
import { globalStyles } from "../styles/stylesLogReg"; //importar los estilos de registro y login

const RegisterScreen = ({ navigation }) => {
  const [nombre, setNombre] = useState("");  // Cambié 'name' por 'nombre'
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {
    if (!nombre || !email || !password) {
      Alert.alert("Error", "Por favor completa todos los campos");
      return;
    }

    try {
      const result = await registerUser(nombre, email, password);  // Llama a la función

      if (result.success) {
        Alert.alert("Éxito", result.message);
        navigation.navigate("LoginScreen");  // Redirige al login
      } else {
        Alert.alert("Error", result.error);
      }
    } catch (error) {
      Alert.alert("Error", "Hubo un problema con la conexión a la API");
    }
  };

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>Regístrate</Text>

      <TextInput
        style={globalStyles.input}
        placeholder="Nombre"
        value={nombre}  // Cambié 'name' por 'nombre'
        onChangeText={setNombre}  // Cambié 'setName' por 'setNombre'
      />

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

      <TouchableOpacity style={globalStyles.button} onPress={handleRegister}>
        <Text style={globalStyles.buttonText}>Registrar</Text>
      </TouchableOpacity>

      {/* Botón para redirigir a Login */}
      <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={globalStyles.linkText}>¿Ya tienes cuenta? Inicia sesión</Text>
      </TouchableOpacity>
    </View>
  );
};


export default RegisterScreen;
