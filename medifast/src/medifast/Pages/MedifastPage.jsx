import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import { BuildingStorefrontIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const fadeInUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    }
  })
};

export const MedifastPage = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col py-10 px-4 sm:px-10 md:px-20 lg:px-40"
    >
      <motion.h1
        variants={fadeInUp}
        className="text-3xl sm:text-4xl md:text-5xl font-semibold mb-10 text-left"
      >
        ¿En qué le podemos ayudar?
      </motion.h1>

      <div className="flex flex-wrap justify-center gap-20 w-full">
        {[{
          to: '/category/medications',
          Icon: MagnifyingGlassIcon,
          text1: 'Buscar',
          text2: 'medicinas'
        }, {
          to: '/map',
          Icon: BuildingStorefrontIcon,
          text1: 'Boticas',
          text2: 'cercanas'
        }, {
          to: '/medical-assistance',
          Icon: UserIcon,
          text1: 'Asistencia',
          text2: 'médica'
        }].map((item, index) => (
          <motion.div
            key={item.to}
            custom={index}
            variants={fadeInUp}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link
              to={item.to}
              className="w-72 h-72 rounded-3xl flex flex-col items-center justify-center bg-green-600 hover:bg-green-700 transition-all duration-300"
            >
              <item.Icon className="h-20 w-20 mb-4 text-white" />
              <span className="text-white text-xl font-semibold">{item.text1}</span>
              <span className="text-white text-xl font-semibold">{item.text2}</span>
            </Link>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
