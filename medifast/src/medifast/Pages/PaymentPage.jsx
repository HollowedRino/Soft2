import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckoutSteps } from '../components/CheckoutSteps';
import { PaymentOption } from '../components/PaymentOption';
import { PAYMENT_OPTIONS } from '../constants/PAYMENT_OPTIONS';
import { CardForm } from '../components/CardForm';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutButton from '../components/StripeCheckoutButton';
import { CartContext } from '../../contexts/CartProvider';
import { UserContext } from '../../contexts/UserProvider';
import { createPedido } from '../services/pedidoService';
import { createDetallePedido } from '../services/detallepedidoService';


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
  const { cartItems } = useContext(CartContext);
  const { user } = useContext(UserContext);
  

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
  const handleFinishPurchase = async () => {
    if (!paymentMethod) {
      alert('Por favor selecciona un método de pago.');
      return;
    }

    const { ok, resp } = await createPedido({
      fecha_pedido: new Date().toISOString(),
      estado_pedido: 'pendiente',
      usuario_id: user.id,
      botica_id: 2,
      metodo_pago_id: paymentMethod,
      direccion_usuario_id: null,
      repartidor_id: 4
    });
    
    if (ok) {
      console.log(resp);
    } else {
      console.log("Error al crear el pedido");
      return;
    }
    cartItems.forEach(async (item) => {
      const { ok, resp } = await createDetallePedido({
        cantidad: item.cantidad,
        precio_unitario: item.medicamento.precio,
        pedido_id: resp.id,
        medicamento_id: item.medicamento_id,
      });
      if (ok) {
        console.log(resp);
      } else {
        console.log("Error al crear el detalle del pedido");
        return;
      }
    });
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
          {PAYMENT_OPTIONS.map((option) => (
            <PaymentOption
              key={option.id}
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
