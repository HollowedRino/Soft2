import { motion } from 'framer-motion';

export const CheckoutSteps = ({ activeStep = 0 }) => {
  const steps = ['Dirección de envío', 'Entrega y pago', 'Pedido'];

  return (
    <div className="flex justify-center items-center gap-4 mb-10">
      {steps.map((step, index) => (
        <div key={index} className="flex flex-col items-center">
          <motion.div
            className={`rounded-full w-10 h-10 flex items-center justify-center font-bold text-white ${
              index === activeStep ? 'bg-green-600' : 'bg-gray-300'
            }`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.3 }}
          >
            {index + 1}
          </motion.div>
          <span className="text-sm mt-2 text-center w-24">{step}</span>
        </div>
      ))}
    </div>
  );
};
