import express from 'express';
import UserController from '../controllers/UserController.js';

const router = express.Router();
router.post('/google', UserController.createUserGoogle);
router.get('/', UserController.getAllUsers);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);



export default router;
