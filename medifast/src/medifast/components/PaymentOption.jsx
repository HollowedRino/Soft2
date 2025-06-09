import { motion } from 'framer-motion';

export const PaymentOption = ({ option, selected, onSelect }) => {
return (
  <motion.label
    className="flex items-center gap-3 cursor-pointer"
    whileHover={{ scale: 1.02 }}
    whileTap={{ scale: 0.98 }}
  >
    <input
      type="radio"
      name="paymentMethod"
      value={option.id}
      checked={selected === option.id}
      onChange={() => onSelect(option.id)}
      className="accent-green-600"
    />
    
    <span>{option.name}</span>
  </motion.label>
)

}

export default PaymentOption;
