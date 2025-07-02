import { motion } from 'framer-motion';

export const TypingMessage = () => (
  <div className="flex items-end justify-start">
    <img
      src="https://res.cloudinary.com/dgxakgsuo/image/upload/v1750309466/Sebasbot_2_t8vbsq.png"
      alt="bot"
      className="w-11 h-11 rounded-full mr-2"
    />
    <motion.div className="flex gap-1 px-4 py-2 bg-white rounded-2xl max-w-fit text-sm text-black rounded-bl-none">
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.span
          key={i}
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 0.6, repeat: Infinity, delay }}
          className="w-2 h-2 bg-gray-500 rounded-full"
        />
      ))}
    </motion.div>
  </div>
);
