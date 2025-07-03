import { motion } from "framer-motion";
import { Pill } from "lucide-react"; // o cualquier ícono relacionado si tienes uno personalizado

export const Loading = () => {
  return (
    <div className="flex justify-center items-center py-10 min-h-200">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          repeat: Infinity,
          duration: 1.2,
          ease: "easeInOut",
        }}
        className="w-12 h-12 text-green-500"
      >
        <Pill size={48} />
      </motion.div>
    </div>
  );
};
