import Carrito from "../models/Carrito.js";
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
  async login(email) {
    try {
      const user = await Usuario.findOne({ where: { email } });
      return user; // Si no lo encuentra, devuelve null, no error
    } catch (error) {
      throw new Error(`Error al buscar usuario por email: ${error.message}`);
    }
  }


  

  async create(userData) {
    try {
      // 1. Crear el usuario
      const nuevoUsuario = await Usuario.create(userData);

      // 2. Crear el carrito asociado al usuario
      await Carrito.create({
        usuario_id: nuevoUsuario.id,
        fecha_actualizacion: new Date(), // Puedes ajustar formato si deseas
      });

      return nuevoUsuario;
    } catch (error) {
      throw new Error(`Error al crear el usuario: ${error.message}`);
    }
  }

async update(id, userData) {
  try {
    const user = await this.findById(id);
    if (!user) throw new Error('Usuario no encontrado');

    // Campos que quieres actualizar
    const allowedFields = ['nombre', 'apellido', 'telefono_usuario'];

    // Asignar solo los campos permitidos si están en userData
    for (const field of allowedFields) {
      if (userData[field] !== undefined) {
        user[field] = userData[field];
      }
    }

    await user.save();
    return user;
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
