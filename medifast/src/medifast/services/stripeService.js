import { loadStripe } from '@stripe/stripe-js';

// Inicializar Stripe con tu clave pública
const stripePromise = loadStripe('pk_test_51RRjbBGgeJsfBGzWb8PQGDLaTS5CIrWTTy1II4yw61C7d8OxS3S9FucOPLoCgh4rwuTQMYaPOui2G3dJK4nKJbnD00BT1Jjiiq');

export const createCheckoutSession = async (items) => {
    try {
        const response = await fetch('http://localhost:3000/stripe/create-checkout-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ items }),
        });

        const { sessionId } = await response.json();
        const stripe = await stripePromise;
        
        // Redirigir al checkout de Stripe
        const { error } = await stripe.redirectToCheckout({
            sessionId,
        });

        if (error) {
            console.error('Error:', error);
            throw error;
        }
    } catch (error) {
        console.error('Error al crear sesión de checkout:', error);
        throw error;
    }
};

export const getProducts = async () => {
    try {
        const response = await fetch('http://localhost:3000/stripe/products');
        const products = await response.json();
        return products;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw error;
    }
}; 