import Stripe from 'stripe';
import  Medicamento from '../models/Medicamento.js';
const STRIPE_SECRET_KEY='sk_test_51RRjbBGgeJsfBGzWeWOLjqid3ueGvwZ0D50gSySJngGFUZNSfzkCvajCDmMHCsflli5gVhBCIpCCOkOlodnTWnYt00eSgY830F';

const FRONTEND_URL='http://localhost:5173';

// Inicializar Stripe con tu clave secreta
const stripe = new Stripe(STRIPE_SECRET_KEY);

// Verificar la conexión con Stripe
const testStripeConnection = async () => {
    try {
        await stripe.balance.retrieve();
        console.log('Conexión con Stripe establecida correctamente');
    } catch (error) {
        console.error('Error al conectar con Stripe:', error.message);
        throw error;
    }
};

// Ejecutar la prueba de conexión
testStripeConnection().catch(console.error);

const createProduct = async (req, res) => {
    try {
        const { medicamentoId } = req.body;
        
        // Obtener el medicamento de la base de datos
        const medicamento = await Medicamento.findByPk(medicamentoId);
        
        if (!medicamento) {
            return res.status(404).json({ error: 'Medicamento no encontrado' });
        }

        // Crear el producto en Stripe
        const product = await stripe.products.create({
            name: medicamento.nombre,
            description: medicamento.descripcion,
            metadata: {
                medicamentoId: medicamento.id
            }
        });

        // Crear el precio del producto
        const price = await stripe.prices.create({
            product: product.id,
            unit_amount: Math.round(medicamento.precio * 100), // Stripe usa centavos
            currency: 'pen',
        });

        res.json({ product, price });
    } catch (error) {
        console.error('Error al crear producto en Stripe:', error);
        res.status(500).json({ error: 'Error al crear producto en Stripe' });
    }
};

const createCheckoutSession = async (req, res) => {
    try {
        const { items } = req.body; // Array de items con priceId y cantidad

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: items.map(item => ({
                price: item.priceId,
                quantity: item.quantity,
            })),
            mode: 'payment',
            success_url: `${FRONTEND_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${FRONTEND_URL}/cancel`,
        });

        res.json({ sessionId: session.id });
    } catch (error) {
        console.error('Error al crear sesión de checkout:', error);
        res.status(500).json({ error: 'Error al crear sesión de checkout' });
    }
};

const getProducts = async (req, res) => {
    try {
        const products = await stripe.products.list({
            active: true,
            expand: ['data.default_price']
        });

        res.json(products.data);
    } catch (error) {
        console.error('Error al obtener productos de Stripe:', error);
        res.status(500).json({ error: 'Error al obtener productos de Stripe' });
    }
};

export default {
    createProduct,
    createCheckoutSession,
    getProducts
};