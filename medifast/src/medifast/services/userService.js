
const API_URL = 'http://localhost:3000'; // Reemplaza con tu URL base

export const userService = {
  // Obtener información del usuario actual
  getCurrentUser: async () => {
    try {
      const response = await fetch.get(`${API_URL}/users/me`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Actualizar información del usuario
  updateUser: async (userData) => {
    try {
      const response = await fetch.put(`${API_URL}/users/me`, userData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Cambiar contraseña
  changePassword: async (passwordData) => {
    try {
      const response = await fetch.put(`${API_URL}/users/me/password`, passwordData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}; 