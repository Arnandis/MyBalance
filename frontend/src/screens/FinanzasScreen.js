import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';
import { crearFinanza, obtenerFinanzas, actualizarFinanza, eliminarFinanza } from '/home/pau/Escritorio/MyBalance/frontend/src/services/apiFinanzas.js'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import Header from '../components/Header';

const { width } = Dimensions.get('window');
//Mirar de organitzar millor el proyecte, que finanzasScreen no siga tan llarg que soles tinga la logica de interfaz.
export default function Finanzas() {

    const [token, setToken] = useState(null);

    useEffect(() => {
      const getToken = async () => {
        const storedToken = await AsyncStorage.getItem('token');
        console.log('Token recuperado:', storedToken);
        setToken(storedToken);
      };
  
      getToken();
    }, []);


  const [ingresos, setIngresos] = useState('');
  const [gastos, setGastos] = useState({
    ocio: 0,
    alquiler: 0,
    festivales: 0,
    compras: 0,
    juegos: 0,
    otros: 0,
  });
  const [fecha, setFecha] = useState('');
  const [grafico, setGrafico] = useState(null);

  const handleIngresosChange = (text) => {
    setIngresos(text);
  };

  const handleGastosChange = (category, value) => {
    setGastos({ ...gastos, [category]: parseFloat(value) });
  };

  const handleFechaChange = (text) => {
    setFecha(text);
  };

  const handleGuardar = async () => {
  
    if (fecha && ingresos && token) {
      // Verificar que los valores sean numéricos
      if (isNaN(ingresos) || Object.values(gastos).some(gasto => isNaN(gasto))) { //isNaN es que no nia numero, ni un 0.
        Alert.alert('Error', 'Los valores de ingresos y gastos deben ser numéricos');
        return;
      }
  
      try {
        const data = { ingresos, gastos, fecha };
        // Asegúrate de que el token se pase correctamente a la función de crear finanza
        console.log('Enviando datos:', data);
  
        const finanzaCreada = await crearFinanza(data, token);
        Alert.alert('Éxito', 'Registro guardado correctamente');
      } catch (error) {
        console.error('Error al guardar registro:', error);
        Alert.alert('Error', 'Hubo un problema al guardar el registro');
      }
    } else {
      console.log('Campos incompletos');
      Alert.alert('Error', 'Por favor complete todos los campos');
    }
  };
  
  
  const handleLeer = async () => {
    if (fecha) {
      try {
        const finanzas = await obtenerFinanzas(token);
        const graficoData = finanzas.find((item) => item.fecha === fecha);
        if (graficoData) {
          setGrafico(graficoData);
        } else {
          Alert.alert('No encontrado', 'No se encontró ningún registro para esa fecha');
        }
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al obtener los registros');
      }
    } else {
      Alert.alert('Error', 'Por favor ingrese una fecha');
    }
  };

  const handleActualizar = async () => {
    if (fecha && ingresos) {
      try {
        const data = { ingresos, gastos };
        const finanzaActualizada = await actualizarFinanza(grafico._id, data, token);
        Alert.alert('Éxito', 'Registro actualizado correctamente');
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al actualizar el registro');
      }
    } else {
      Alert.alert('Error', 'Por favor complete todos los campos');
    }
  };

  const handleEliminar = async () => {
    if (grafico) {
      try {
        await eliminarFinanza(grafico._id, token);
        Alert.alert('Éxito', 'Registro eliminado correctamente');
        setGrafico(null); // Limpiar el gráfico mostrado
      } catch (error) {
        Alert.alert('Error', 'Hubo un problema al eliminar el registro');
      }
    } else {
      Alert.alert('Error', 'No hay ningún gráfico para eliminar');
    }
  };

  const chartData = {
    labels: ['Ocio', 'Alquiler', 'Festivales', 'Compras', 'Juegos', 'Otros'],
    datasets: [
      {
        data: [gastos.ocio, gastos.alquiler, gastos.festivales, gastos.compras, gastos.juegos, gastos.otros],
        strokeWidth: 2,
      },
    ],
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Header title="Finanzas"/>

      <TextInput style={styles.input} placeholder="Ingrese la fecha (YYYY-MM-DD)" value={fecha} onChangeText={handleFechaChange} />
      <TextInput style={styles.input} placeholder="Ingrese sus ingresos" keyboardType="numeric" value={ingresos} onChangeText={handleIngresosChange} />

      <Text style={styles.subtitle}>Categorías de Gastos</Text>
      {['ocio', 'alquiler', 'festivales', 'compras', 'juegos', 'otros'].map((category) => (
        <TextInput
          key={category}
          style={styles.input}
          placeholder={`Gasto en ${category.charAt(0).toUpperCase() + category.slice(1)}`}
          keyboardType="numeric"
          value={gastos[category].toString()}
          onChangeText={(text) => handleGastosChange(category, text)}
        />
      ))}

      <Text style={styles.chartTitle}>Distribución de Gastos</Text>
      <LineChart
        data={chartData}
        width={width - 30}
        height={220}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#eff3ff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          style: { borderRadius: 16 },
        }}
        style={{ marginVertical: 8, borderRadius: 16 }}
      />

      <Text style={styles.result}>Total de Ingresos: {ingresos}</Text>
      <Text style={styles.result}>Total de Gastos: {Object.values(gastos).reduce((a, b) => a + b, 0)}</Text>

      <View style={styles.buttonContainer}>
        <Button title="Guardar Registro" onPress={handleGuardar} />
        <Button title="Leer Registro" onPress={handleLeer} />
        <Button title="Actualizar Registro" onPress={handleActualizar} />
        <Button title="Eliminar Registro" onPress={handleEliminar} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, alignItems: 'center', justifyContent: 'flex-start', padding: 20 },
  subtitle: { fontSize: 20, marginVertical: 10 },
  input: { width: '100%', padding: 10, marginVertical: 10, borderWidth: 1, borderRadius: 10, borderColor: '#ddd' },
  chartTitle: { fontSize: 18, marginVertical: 10 },
  result: { fontSize: 16, marginVertical: 5 },
  buttonContainer: { marginTop: 20, width: '70%', marginBottom: 20, gap: 15, borderRadius: 20 },
});
