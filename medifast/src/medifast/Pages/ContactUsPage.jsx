import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Grupo2 from "../../../img_src/Grupo2.jpg";
import { FireworksEffect } from "../components/FireworksEffect";

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
  const [audio] = useState(() => {
    const a = new Audio("/audio/1254274376052904007.ogg");
    a.loop = true;
    return a;
  });

  useEffect(() => {
    // Play audio when component mounts
    audio.play().catch(error => {
      console.log("Audio playback failed:", error);
    });

    // Cleanup function to pause audio when component unmounts
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [audio]);

  return (
    <>
      <motion.div
        className="flex flex-col py-5 px-5 sm:px-10"
        initial="hidden"
        animate="visible"
        variants={pageVariants}
      >
        <motion.h1
          className="text-4xl font-bold mb-6 text-center text-black drop-shadow-lg"
          variants={titleVariant}
        >
          🌟 Conoce a nuestro equipo 🌟
        </motion.h1>

        <motion.div
          className="relative w-full min-h-[350px] rounded-3xl shadow-xl overflow-hidden"
          variants={cardVariant}
          style={{
            backgroundImage:
              'url("https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzB0NHhmYjExejVmcGZ6MTIydHNxcWpvczF4aGR3OGF5ZzJrdGRpNSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ka5i65sFAlM9pbZ2OM/giphy.gif")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "brightness(1.2)"
          }}
        >
          {/* Overlay blanco semitransparente para aclarar el fondo */}
          <div
            style={{
              content: '""',
              position: "absolute",
              inset: 0,
              backgroundColor: "rgba(217, 119, 230, 0.7)",
              pointerEvents: "none",
              zIndex: 0,
            }}
          />

          <FireworksEffect />

          <div className="relative z-10 w-full p-6 sm:px-10 flex flex-col items-center">
            <motion.div className="text-center" variants={titleVariant}>
              <h2 className="text-2xl font-semibold mb-4 text-gray-900 drop-shadow-md">
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
                    className="bg-white px-5 py-2 rounded-full text-sm font-medium shadow-md cursor-pointer text-gray-900"
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
