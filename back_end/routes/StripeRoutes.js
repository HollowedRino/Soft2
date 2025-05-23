import express from 'express';
import StripeController from '../controllers/StripeController.js';

const router = express.Router();

// Ruta para crear un producto en Stripe
router.post('/create-product', StripeController.createProduct);

// Ruta para crear una sesión de pago
router.post('/create-checkout-session', StripeController.createCheckoutSession);

// Ruta para obtener todos los productos de Stripe
router.get('/products', StripeController.getProducts);

export default router; 