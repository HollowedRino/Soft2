import UserRepository from '../repositories/UserRepository.js';
import bcrypt from 'bcrypt';


class UserService {
  async getAllUsers() {
    try {
      return await UserRepository.findAll();
    } catch (error) {
      throw new Error(`Error en el servicio al obtener usuarios: ${error.message}`);
    }
  }

  async getUserById(id) {
    try {
      return await UserRepository.findById(id);
    } catch (error) {
      throw new Error(`Error en el servicio al obtener usuario: ${error.message}`);
    }
  }

  async createUser(userData) {
    try {
      // Validaciones de negocio
      this.validateUserData(userData);

      // Hashear contraseña antes de guardar
      const hashedPassword = await bcrypt.hash(userData.contrasena, 10);
      userData.contrasena = hashedPassword;

      return await UserRepository.create(userData);
    } catch (error) {
      throw new Error(`Error en el servicio al crear usuario: ${error.message}`);
    }
  }

async updateUser(id, userData) {
  try {
    // Campos permitidos para actualizar
    const allowedFields = ['nombre', 'apellido', 'telefono_usuario'];
    const dataToUpdate = {};

    for (const field of allowedFields) {
      if (userData[field] !== undefined) {
        dataToUpdate[field] = userData[field];
      }
    }

    if (Object.keys(dataToUpdate).length === 0) {
      throw new Error('No se proporcionaron campos válidos para actualizar');
    }

    // Validación básica para teléfono: debe ser un número de 9 dígitos exactos
    if (dataToUpdate.telefono_usuario !== undefined && !/^\d{9}$/.test(dataToUpdate.telefono_usuario.toString())) {
      throw new Error('El teléfono debe tener 9 dígitos');
    }

    // Llamar a repository con los campos filtrados
    return await UserRepository.update(id, dataToUpdate);
  } catch (error) {
    throw new Error(`Error en el servicio al actualizar usuario: ${error.message}`);
  }
}




  async deleteUser(id) {
    try {
      return await UserRepository.delete(id);
    } catch (error) {
      throw new Error(`Error en el servicio al eliminar usuario: ${error.message}`);
    }
  }

  // Validaciones de negocio
  validateUserData(userData) {
    const requiredFields = ['nombre', 'apellido', 'email', 'contrasena', 'telefono_usuario', 'estado'];

    for (const field of requiredFields) {
      if (!userData[field]) {
        throw new Error(`El campo ${field} es requerido`);
      }
    }

    if (!/^\d{9}$/.test(userData.telefono_usuario.toString())) {
      throw new Error('El teléfono debe tener 9 dígitos');
    }

    if (!/\S+@\S+\.\S+/.test(userData.email)) {
      throw new Error('El correo electrónico no es válido');
    }

    if (userData.contrasena.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres');
    }
  }

async createGoogleUser(userData) {
  // Aquí puedes evitar la validación de todos los campos, o hacer una más simple
  // Asignar valores por defecto a los campos que no llegan:
  const defaultData = {
    contrasena: null,
    telefono_usuario: 0,
    estado: 'activo',
  };
  const fullUserData = { ...userData, ...defaultData };
  return await UserRepository.create(fullUserData);
}

async getUserByEmail(email) {
  return await UserRepository.findByEmail(email);
}
async login(email) {
  return await UserRepository.login(email);
}



}

export default new UserService();
