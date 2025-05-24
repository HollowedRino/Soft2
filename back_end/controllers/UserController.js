
import UserService from '../services/UserService.js';
class UserController {
    async getAllUsers(req, res) {
        try {
            const users = await UserService.getAllUsers();
            res.json(users);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
    
    async getUserById(req, res) {
        try {
            const { id } = req.params;
            const user = await UserService.getUserById(id);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async createUser(req, res) {
        try {
            const userData = req.body;
            const newUser = await UserService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }

    async updateUser(req, res) {
    try {
        const { id } = req.params;
        const userData = req.body;
        console.log('Datos recibidos para actualizar:', userData);
        const updatedUser = await UserService.updateUser(id, userData);
        res.json(updatedUser);
    } catch (error) {
        if (error.message === 'Usuario no encontrado') {
        res.status(404).json({ error: error.message });
        } else {
        res.status(400).json({ error: error.message });
        }
    }
    }


    async deleteUser(req, res) {
        try {
            const { id } = req.params;
            await UserService.deleteUser(id);
            res.status(204).send();
        } catch (error) {
            if (error.message === 'Usuario no encontrado') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: error.message });
            }
        }
    }


    async createUserGoogle(req, res) {
        try {
            const { nombre, apellido, email } = req.body;
            if (!nombre || !apellido || !email) {
            return res.status(400).json({ error: 'Faltan datos obligatorios' });
            }

            const existingUser = await UserService.getUserByEmail(email);
            if (existingUser) {

            return res.status(409).json({ message: 'El usuario ya existe', exists: true });

            }

            const newUser = await UserService.createGoogleUser({ nombre, apellido, email });
            res.status(201).json(newUser);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async getUserByEmail(req, res) {
        try {
            const { email } = req.params;
            const user = await UserService.getUserByEmail(email);
            console.log(user)
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email } = req.params;
            const user = await UserService.login(email);
            if (!user) {
                return res.status(404).json({ error: 'Usuario no encontrado' });
            }
            res.json(user);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }

    

}

export default new UserController();
