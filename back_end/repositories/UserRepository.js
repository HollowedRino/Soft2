import Usuario from "../models/Usuario.js";


class UserRepository {
  async findAll() {
    try {
      return await Usuario.findAll();
    } catch (error) {
      throw new Error(`Error al obtener todos los usuarios: ${error.message}`);
    }
  }

  async findById(id) {
    try {
      const user = await Usuario.findByPk(id);
      if (!user) {
        throw new Error('Usuario no encontrado');
      }
      return user;
    } catch (error) {
      throw new Error(`Error al obtener el usuario: ${error.message}`);
    }
  }

async findByEmail(email) {
  try {
    const user = await Usuario.findOne({ where: { email } });
    return user; // Si no lo encuentra, devuelve null, no error
  } catch (error) {
    throw new Error(`Error al buscar usuario por email: ${error.message}`);
  }
}


  

  async create(userData) {
    try {
      return await Usuario.create(userData);
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

  async update(id, userData) {
    try {
      const user = await this.findById(id);
      return await user.update(userData);
    } catch (error) {
      throw new Error(`Error al actualizar el usuario: ${error.message}`);
    }
  }

  async delete(id) {
    try {
      const user = await this.findById(id);
      await user.destroy();
      return true;
    } catch (error) {
      throw new Error(`Error al eliminar el usuario: ${error.message}`);
    }
  }



}

export default new UserRepository();
