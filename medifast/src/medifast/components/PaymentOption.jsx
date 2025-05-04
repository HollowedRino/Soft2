import { motion } from 'framer-motion';

export const PaymentOption = ({ option, selected, onSelect }) => (
  <motion.label
    className="flex items-center gap-3 cursor-pointer"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <input
      type="radio"
      name="paymentMethod"
      value={option}
      checked={selected === option}
      onChange={() => onSelect(option)}
      className="accent-green-600"
    />
    <span>{option}</span>
  </motion.label>
);
