import React from 'react';
import { createCheckoutSession } from '../services/stripeService';

const StripeCheckoutButton = ({ items, className }) => {
    const handleCheckout = async () => {
        try {
            await createCheckoutSession(items);
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            // Aquí puedes manejar el error como prefieras (mostrar un mensaje al usuario, etc.)
        }
    };

    return (
        <button 
            onClick={handleCheckout}
            className={className || "bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"}
        >
            Pagar ahora
        </button>
    );
};

export default StripeCheckoutButton; 