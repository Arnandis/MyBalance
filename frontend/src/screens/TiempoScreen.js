import React, { useState, useEffect } from "react";
import { View, Text, TextInput, StyleSheet, Dimensions, TouchableOpacity, Alert, ScrollView } from "react-native";
import { PieChart } from "react-native-chart-kit";
import { saveTiempoData } from "../services/apiTiempo"; // Usar la función adecuada para guardar los datos
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const { width } = Dimensions.get("window");

export default function Tiempo() {
  const [timeData, setTimeData] = useState({
    trabajo: 0,
    estudio: 0,
    descanso: 0,
    deporte: 0,
    familia: 0,
    otros: 0,
  });

  const [token, setToken] = useState(null);

  // Recuperar token del AsyncStorage
  useEffect(() => {
    const getToken = async () => {
      const storedToken = await AsyncStorage.getItem('token');
      console.log('Token recuperado:', storedToken);
      setToken(storedToken);
    };
    getToken();
  }, []);

  // Manejar cambios en los inputs
  const handleInputChange = (category, value) => {
    setTimeData((prevState) => ({
      ...prevState,
      [category]: parseInt(value) || 0,
    }));
  };

  // Guardar datos en el backend
  const guardarDatos = async () => {
    if (!token) {
      Alert.alert("Error", "No se ha encontrado el token de usuario.");
      return;
    }

    try {
      // Aquí se debería hacer la petición al backend para guardar los datos.
      // Es importante que la función saveTiempoData reciba tanto los datos como el token.
      await saveTiempoData(timeData, token);
      Alert.alert("Éxito", "Datos guardados correctamente");
    } catch (error) {
      Alert.alert("Error", "No se pudo guardar los datos");
    }
  };

  // Preparar los datos para el gráfico
  const totalTime = Object.values(timeData).reduce((acc, time) => acc + time, 0);
  const chartData = totalTime > 0 ? [
    { name: "Trabajo", population: timeData.trabajo, color: "#FF5733", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Estudio", population: timeData.estudio, color: "#33FF57", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Descanso", population: timeData.descanso, color: "#3357FF", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Deporte", population: timeData.deporte, color: "#FF33A1", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Familia", population: timeData.familia, color: "#FFBB33", legendFontColor: "#7F7F7F", legendFontSize: 15 },
    { name: "Otros", population: timeData.otros, color: "#A633FF", legendFontColor: "#7F7F7F", legendFontSize: 15 },
  ] : [];

  return (
    <View style={styles.container}>
      <Header title="Tiempo"/>

      <ScrollView style={styles.scrollContainer}>
        <Text style={styles.title}>Distribución del tiempo</Text>
        <View style={styles.inputContainer}>
          {Object.keys(timeData).map((category) => (
            <TextInput
              key={category}
              style={styles.input}
              placeholder={`Minutos de ${category}`}
              keyboardType="numeric"
              value={String(timeData[category])}
              onChangeText={(value) => handleInputChange(category, value)}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.button} onPress={guardarDatos}>
          <Text style={styles.buttonText}>Guardar datos</Text>
        </TouchableOpacity>
        {totalTime > 0 && (
          <PieChart
            data={chartData}
            width={width - 30}
            height={220}
            chartConfig={{
              backgroundColor: "#1cc910",
              backgroundGradientFrom: "#eff3ff",
              backgroundGradientTo: "#ffffff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="population"
            backgroundColor="transparent"
            paddingLeft="15"
          />
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f1f1f1",
  },
  scrollContainer: {
    flex: 1,
    paddingTop:70,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});
