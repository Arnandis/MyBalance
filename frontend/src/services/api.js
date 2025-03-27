const API_URL = 'http://192.168.99.100:5000/api';  // Asegúrate de cambiarlo si es necesario
//Api frontend para hacer las consultas al backend de login y registro. 
// Función para iniciar sesión
export const loginUser = async (email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, token: data.token };
    } else {
      return { success: false, error: data.error || 'Credenciales incorrectas' };
    }
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
    throw new Error('Hubo un problema con la conexión a la API');
  }
};

export const registerUser = async (nombre, email, password) => {
  try {
    const response = await fetch(`${API_URL}/auth/registro`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ nombre, email, password }),  
    });

    const data = await response.json();

    if (response.ok) {
      return { success: true, message: 'Usuario registrado correctamente' };
    } else {
      return { success: false, error: data.error || 'Hubo un problema con el registro' };
    }
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    throw new Error("Hubo un problema con la conexión a la API");
  }
};

