import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckoutSteps } from '../components/CheckoutSteps';
import { PaymentOption } from '../components/PaymentOption';
import { PAYMENT_OPTIONS } from '../constants/PAYMENT_OPTIONS';
import { CardForm } from '../components/CardForm';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutButton from '../components/StripeCheckoutButton';

// Simulación de carrito (en producción, obtén esto del contexto global o de props)
const initialCart = [
  {
    name: "Panadol Antigripal NF Tableta",
    price: 19.99,
    quantity: 2,
    stripePriceId: "price_1RRnYyGgeJsfBGzWkGnVLgJE"
  },
  // ...otros productos
];

export const PaymentPage = () => {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });
  const [cart] = useState(initialCart);

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleFinishPurchase = () => {
    if (!paymentMethod) {
      alert('Por favor selecciona un método de pago.');
      return;
    }

    if (paymentMethod === 'Tarjeta de Débito o Crédito') {
      const { name, number, expiry, cvv } = cardDetails;
      if (!name || !number || !expiry || !cvv) {
        alert('Por favor completa todos los campos de la tarjeta.');
        return;
      }
    }

    // Aquí podrías guardar el pedido si usas contexto o estado global

    navigate('/checkout/order');
  };

  // Prepara los items para Stripe
  const stripeItems = cart.map(item => ({
    priceId: item.stripePriceId,
    quantity: item.quantity,
  }));

  return (
    <motion.section
      className="max-w-4xl mx-auto px-4 py-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <CheckoutSteps activeStep={1} />

      <div className="space-y-6">
        <h2 className="text-2xl font-semibold mb-4">Elige tu método de pago</h2>

        <div className="space-y-4">
          {PAYMENT_OPTIONS.map((option, index) => (
            <PaymentOption
              key={index}
              option={option}
              selected={paymentMethod}
              onSelect={setPaymentMethod}
            />
          ))}
        </div>

        {paymentMethod === 'Tarjeta de Débito o Crédito' && (
          <>
          
            <StripeCheckoutButton
              items={stripeItems}
              className="mt-4 w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
            />
        </>
        )}

        <motion.button
          className="mt-10 w-full bg-red-600 text-white py-3 rounded-md font-semibold hover:bg-red-700 transition"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleFinishPurchase}
        >
          Finalizar Compra
        </motion.button>
      </div>
    </motion.section>
  );
};
