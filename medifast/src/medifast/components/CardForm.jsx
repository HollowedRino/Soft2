import { motion } from 'framer-motion';

export const CardForm = ({ cardDetails, onChange }) => (
  <motion.div
    className="mt-6 space-y-4"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 0.2 }}
  >
    <h3 className="text-lg font-medium">Datos de la Tarjeta</h3>

    <motion.input
      type="text"
      name="name"
      placeholder="Nombre del titular"
      value={cardDetails.name}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md"
      whileFocus={{ scale: 1.01 }}
    />
    <motion.input
      type="text"
      name="number"
      placeholder="Número de tarjeta"
      value={cardDetails.number}
      onChange={onChange}
      className="w-full px-4 py-2 border border-gray-300 rounded-md"
      whileFocus={{ scale: 1.01 }}
    />
    <div className="flex gap-4">
      <motion.input
        type="text"
        name="expiry"
        placeholder="MM/AA"
        value={cardDetails.expiry}
        onChange={onChange}
        className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
        whileFocus={{ scale: 1.01 }}
      />
      <motion.input
        type="text"
        name="cvv"
        placeholder="CVV"
        value={cardDetails.cvv}
        onChange={onChange}
        className="w-1/2 px-4 py-2 border border-gray-300 rounded-md"
        whileFocus={{ scale: 1.01 }}
      />
    </div>
  </motion.div>
);
