import axios from 'axios';
//mirar pq me dona error: (NOBRIDGE) ERROR  Error al crear finanza [AxiosError: Request failed with status code 403]
//soles funciona el metodo de guardar, mirar de fer una pagina en la que estiguen tots els grafics de un usuari.
// URL correcta de la API de Finanzas
const API_URL = 'http://192.168.99.100:5000/api/finanzas';

// Crear un registro financiero (POST)
export const crearFinanza = async (data, token) => {
  // Ajustamos el formato de los datos antes de enviarlos
  const datosAEnviar = {
    ingresos: parseFloat(data.ingresos), // Asegúrate de que ingresos sea un número
    gastos: {
      ocio: parseFloat(data.gastos.ocio),
      alquiler: parseFloat(data.gastos.alquiler),
      festivales: parseFloat(data.gastos.festivales),
      compras: parseFloat(data.gastos.compras),
      juegos: parseFloat(data.gastos.juegos),
      otros: parseFloat(data.gastos.otros),
    },
    fecha: data.fecha, // Asegúrate de que la fecha esté en formato adecuado
  };

  try {
    const response = await axios.post(`${API_URL}`, datosAEnviar, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al crear finanza', error);
    throw error;
  }
};

// Obtener todas las finanzas del usuario (GET)
export const obtenerFinanzas = async (token) => {
  try {
    const response = await axios.get(`${API_URL}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al obtener finanzas', error);
    throw error;
  }
};

// Actualizar un registro financiero (PUT)
export const actualizarFinanza = async (id, data, token) => {
  // Ajustamos el formato de los datos antes de enviarlos
  const datosAEnviar = {
    ingresos: parseFloat(data.ingresos),
    gastos: {
      ocio: parseFloat(data.gastos.ocio),
      alquiler: parseFloat(data.gastos.alquiler),
      festivales: parseFloat(data.gastos.festivales),
      compras: parseFloat(data.gastos.compras),
      juegos: parseFloat(data.gastos.juegos),
      otros: parseFloat(data.gastos.otros),
    },
  };

  try {
    const response = await axios.put(`${API_URL}/${id}`, datosAEnviar, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al actualizar finanza', error);
    throw error;
  }
};

// Eliminar un registro financiero (DELETE)
export const eliminarFinanza = async (id, token) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error('Error al eliminar finanza', error);
    throw error;
  }
};
