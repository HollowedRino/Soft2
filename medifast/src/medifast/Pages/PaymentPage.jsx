import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CheckoutSteps } from '../components/CheckoutSteps';
import { PaymentOption } from '../components/PaymentOption';
import { PAYMENT_OPTIONS } from '../constants/PAYMENT_OPTIONS';
import { loadStripe } from '@stripe/stripe-js';
import StripeCheckoutButton from '../components/StripeCheckoutButton';
import { CartContext } from '../../contexts/CartProvider';
import { UserContext } from '../../contexts/UserProvider';
import { createPedido } from '../services/pedidoService';
import { createDetallePedido } from '../services/detallepedidoService';
import {
  deleteItemCarrito,
  getItemCarritoByCarritoIdMedicamentoId
} from '../services/itemCarritoService';

const carritoInicial = [
  {
    id: 1,
    medicamento_id: 1,
    cantidad: 2,
    medicamento: {
      nombre: 'Paracetamol',
      precio: 10,
      stripePriceId: 'price_1RRnYyGgeJsfBGzWkGnVLgJE',
    }
  },
  {
    id: 2,
    medicamento_id: 2,
    cantidad: 1,
    medicamento: {
      nombre: 'Ibuprofeno',
      precio: 15,
      stripePriceId: 'price_1RRnYyGgeJsfBGzWkGnVLgJE',
    }
  }
];

export const PaymentPage = () => {
  const navigate = useNavigate();
  const { cart, cartItems, getDiscount, deleteOnlyItemsCart, removeFromCart } = useContext(CartContext);
  const { user } = useContext(UserContext);

  const [paymentMethod, setPaymentMethod] = useState('');
  const [cardDetails, setCardDetails] = useState({
    name: '',
    number: '',
    expiry: '',
    cvv: '',
  });

  const handleCardChange = (e) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value });
  };

  const handleFinishPurchase = async () => {
    if (!paymentMethod) {
      alert('Por favor selecciona un método de pago.');
      return;
    }

    const total = cartItems.reduce((sum, item) => sum + item.medicamento.precio * item.cantidad, 0);
    const discount = getDiscount(total);
    const totalFinal = Math.max(0, total - discount);

    const { ok, resp: pedidoResp } = await createPedido({
      fecha_pedido: new Date().toISOString(),
      estado_pedido: 'pendiente',
      usuario_id: user.id,
      botica_id: 2,
      metodo_pago_id: paymentMethod,
      direccion_usuario_id: null,
      repartidor_id: 17
    });

    if (!ok) {
      console.log("Error al crear el pedido");
      return;
    }

    const detalles = [];

    for (const item of cartItems) {
      const { ok: okDetalle, resp: detalleResp } = await createDetallePedido({
        cantidad: item.cantidad,
        precio_unitario: item.medicamento.precio,
        pedido_id: pedidoResp.id,
        medicamento_id: item.medicamento_id,
      });

      if (okDetalle) {
        detalles.push(detalleResp);

        try {
          const resp = await getItemCarritoByCarritoIdMedicamentoId(cart.id, item.medicamento_id);

          if (!resp || !resp.ok || !resp.resp?.id) {
            console.error('No se pudo obtener itemCarrito válido', resp);
            continue;
          }

          const itemCarritoId = resp.resp.id;
          await deleteItemCarrito(itemCarritoId);
          removeFromCart(item);
        } catch (error) {
          console.error('Error al eliminar item del carrito:', error);
          continue;
        }
      } else {
        console.log("Error al crear el detalle del pedido");
        return;
      }
    }

    deleteOnlyItemsCart();
    navigate('/checkout/order', {
      state: {
        pedido: {
          ...pedidoResp,
          total_final: totalFinal,
          descuento: discount,
        },
        pedidoDetalles: detalles
      }
    });
  };

  const stripeItems = carritoInicial.map(item => ({
    priceId: item.medicamento.stripePriceId,
    quantity: item.cantidad,
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

        {paymentMethod === 3 && (
          <StripeCheckoutButton
            items={stripeItems}
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-md font-semibold hover:bg-blue-700 transition"
          />
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
