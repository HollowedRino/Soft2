import { motion } from "framer-motion";
import Grupo2 from "../../../img_src/Grupo2.jpg";
import { FireworksBackground } from "../components/FireworksBackground";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const titleVariant = {
  hidden: { opacity: 0, x: -100 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { type: "spring", stiffness: 100, damping: 10 }
  }
};

const cardVariant = {
  hidden: { scale: 0.8, opacity: 0, y: 50 },
  visible: {
    scale: 1,
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const memberVariant = {
  hidden: { rotate: -10, opacity: 0 },
  visible: {
    rotate: 0,
    opacity: 1,
    transition: { type: "spring", bounce: 0.4, duration: 0.6 }
  },
  hover: {
    scale: 1.1,
    skewX: "-5deg",
    backgroundColor: "#bbf7d0",
    transition: { type: "spring", stiffness: 300 }
  }
};

export const ContactUsPage = () => {
  return (
    <>
        <FireworksBackground />
        <motion.div
          className="flex flex-col py-5 px-5 sm:px-10"
          initial="hidden"
          animate="visible"
          variants={pageVariants}
          >
          <motion.h1
            className="text-4xl font-bold mb-6 text-center"
            variants={titleVariant}
            >
            🌟 Conoce a nuestro equipo 🌟
          </motion.h1>

          <motion.div
            className="w-full bg-green-100 min-h-150 rounded-3xl shadow-xl"
            variants={cardVariant}
            >
            <div className="w-full p-6 sm:px-10 flex flex-col items-center">
              <motion.div className="text-center" variants={titleVariant}>
                <h2 className="text-2xl font-semibold mb-4">
                  🚀 Miembros del Grupo 2
                </h2>
                <ul className="list-none flex flex-wrap justify-center gap-4">
                  {[
                    "Joaquin Alfaro",
                    "Fantino Camara",
                    "Sebastian Garcia",
                    "Rober Goñas",
                    "Ariel Gutiérrez",
                    "Sofia Mejorada",
                    "Alessander Mejia"
                  ].map((nombre, index) => (
                    <motion.li
                    key={index}
                    className="bg-white px-5 py-2 rounded-full text-sm font-medium shadow-md cursor-pointer"
                    variants={memberVariant}
                    whileHover="hover"
                    >
                      {nombre}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>

              <motion.img
                src={Grupo2}
                alt="Imagen del grupo"
                className="mx-auto mt-8 rounded-2xl shadow-lg"
                initial={{ rotate: -15, scale: 0.5, opacity: 0 }}
                animate={{
                  rotate: 0,
                  scale: 1,
                  opacity: 1,
                  transition: { duration: 1, type: "spring", stiffness: 60 }
                }}
                whileHover={{
                  rotate: 2,
                  scale: 1.05,
                  transition: { duration: 0.4 }
                }}
                />
            </div>
          </motion.div>
        </motion.div>
      </>
  );
};
