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
      this.validateUserData(userData);

      if (userData.contrasena) {
        const hashedPassword = await bcrypt.hash(userData.contrasena, 10);
        userData.contrasena = hashedPassword;
      }

      return await UserRepository.update(id, userData);
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



}

export default new UserService();
