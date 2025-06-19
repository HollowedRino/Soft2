import { motion } from 'framer-motion';

export const FloatingButton = ({ onClick }) => {
  return (
    <motion.div
      className="fixed bottom-24 right-10 z-50 sm:bottom-25"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0, transition: { duration: 0.4, ease: 'easeInOut' } }}
      transition={{ duration: 0.3 }}
    >
      <button
        onClick={onClick}
        className="rounded-full bg-[#41b541] shadow-lg hover:scale-105 transition-transform duration-200"
      >
        <img
          src="https://res.cloudinary.com/dgo6yjmut/image/upload/v1748984887/97e9cc3be4316d17c887ad825eb7e884d0f838a2_jd0gmi.png"
          alt="Chat"
          className="w-20 h-20"
        />
      </button>
    </motion.div>
  );
};
