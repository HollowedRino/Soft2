import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();
router.post('/google', UserController.createUserGoogle); // creacion de usuario con google si es q no existe ya en la bd
router.get('/login/:email', UserController.login);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser); // creacion de usuario normal
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);



export default router;
