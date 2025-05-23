import { useNavigate } from "react-router-dom";
import { BuildingStorefrontIcon, TruckIcon } from '@heroicons/react/16/solid';
import { motion } from "framer-motion";
import { AddToCartButton } from "./AddToCartButton";

export const ProductItem = ({ producto }) => {
  const navigate = useNavigate();

  const handleNavigation = () => {
    navigate(`/product/${producto.id}`, { state: producto });
  };


  return (
    <motion.article
        className="bg-white rounded-3xl shadow-md p-4 w-full sm:max-w-xs transition-transform hover:scale-[1.02] cursor-pointer"
        onClick={handleNavigation}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <img
        src={producto.imagen_url ? producto.imagen_url : "https://res.cloudinary.com/dgxakgsuo/image/upload/v1747766681/pngtree-flat-design-medication-bottle-vector-illustration-png-image_7037036_hdhblb.png"}
        alt={`Imagen de ${producto.nombre}`}
        className="w-full h-40 object-contain rounded-t-lg mb-2"
      />
      <p className="text-gray-500 break-words">{producto.descripcion}</p>
      <p className="text-lg font-semibold mb-2 break-words">{producto.nombre}</p>

      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center rounded-lg gap-2">
          {producto.boticas?.map((botica) => (
            <div
              key={botica.id}
              className="flex items-center gap-2 bg-green-100 rounded-lg px-2 py-1"
            >
              <BuildingStorefrontIcon className="h-5 w-5 text-gray-500 bg-gray-300 rounded-lg p-1" />
              <span className="font-semibold text-gray-600">
                {botica.nombre}
              </span>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center">
          <span className="font-bold">S/. {producto.precio.toFixed(2)}</span>
          <div className="flex items-center">
            <BuildingStorefrontIcon className="h-8 w-8 text-gray-500 rounded-lg p-1" />
            <TruckIcon className="h-8 w-8 text-gray-500 rounded-lg p-1" />
          </div>
        </div>
        <AddToCartButton
            producto={producto}
        />
      </div>
    </motion.article>
  );
};
