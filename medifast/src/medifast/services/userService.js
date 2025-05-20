//UserService.js
const BASE_URL = 'http://localhost:3000/user';

export const registerUserInBackend = async (userData) => {
  try {
    const response = await fetch(BASE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        ok: false,
        errorMessage: data.error || 'Error al registrar el usuario',
      };
    }

    return {
      ok: true,
      user: data,
    };
  } catch (error) {
    return {
      ok: false,
      errorMessage: error.message,
    };
  }
};







