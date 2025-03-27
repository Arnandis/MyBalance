import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_URL = "http://192.168.99.100:5000/api/tiempo";

// Obtener los datos de tiempo del usuario
export const fetchTiempoData = async () => {
  try {
    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(API_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener datos de tiempo:", error);
    throw error;
  }
};

// Guardar los datos de tiempo
export const saveTiempoData = async (timeData) => {
    try {
      const token = await AsyncStorage.getItem("token");
  
      console.log("TOKEN RECUPERADO:", token); // 👈 Esto mostrará el token en la consola
  
      if (!token) {
        throw new Error("No se encontró un token en AsyncStorage");
      }
  
      const dataToSend = {
        trabajo: timeData.trabajo || 0,
        estudio: timeData.estudio || 0,
        descanso: timeData.descanso || 0,
        deporte: timeData.deporte || 0,
        familia: timeData.familia || 0,
        otros: timeData.otros || 0,
      };
  
      console.log("Enviando datos al backend:", dataToSend); 
  
      await axios.post(API_URL, dataToSend, {
        headers: { Authorization: `Bearer ${token}` },
      });
  
      return { success: true };
    } catch (error) {
      console.error("Error al guardar datos de tiempo:", error);
      throw error;
    }
  };
  
  
