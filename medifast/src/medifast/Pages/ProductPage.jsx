import { useLocation, useParams } from "react-router-dom";
import { BuildingStorefrontIcon, TruckIcon } from '@heroicons/react/16/solid';
import { motion } from "framer-motion";
import { AddToCartButton } from "../components/AddToCartButton";
export const ProductPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const producto = location.state;

  return (
    <motion.div 
      className="flex flex-col py-5 px-5 sm:px-10"
      initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Contenedor principal del producto */}
      <div className="p-6 bg-green-100 rounded-3xl">
        <div 
          className="bg-white rounded-3xl shadow-md p-6 flex flex-col md:flex-row justify-between gap-6"
        >
          {/* Imagen del producto */}
          <div className="flex flex-col items-center justify-center md:w-1/3 transition-transform hover:scale-[1.02] cursor-pointer">
            <img src={producto.imagen_url} alt={producto.nombre} className="w-48 h-auto" />
            <AddToCartButton
              producto={producto}
            />
          </div>

          {/* Detalles del producto */}
          <div className="flex-1 space-y-2">
            <p className="text-xs uppercase text-gray-500">{producto.descripcion}</p>
            <h2 className="text-xl font-bold">{producto.nombre}</h2>
            <p className="text-lg font-semibold">S/. {producto.precio.toFixed(2)}</p>
            <ul className="text-sm list-disc list-inside text-gray-700">
              <li>Requiere receta medica: {producto.requiere_receta ? "Si" : "No"}</li>
              <li>Fabricante: {producto.fabricante}</li>
            </ul>

            <div>
              <p className="font-medium mt-3">Métodos de entrega disponible</p>
              <div className="flex items-center gap-4 mt-1 text-sm flex-wrap">
                <div className="flex items-center gap-1">
                  <TruckIcon className="h-10 w-10 text-gray-500" />
                  <span className="font-semibold">Despacho a domicilio</span>
                </div>
                <div className="flex items-center gap-1">
                  <BuildingStorefrontIcon className="h-10 w-10 text-gray-500" />
                  <span className="font-semibold">Entrega en tienda</span>
                </div>
              </div>
            </div>

            
          </div>

          {/* Tabla de boticas */}
          <div className="bg-gray-100 rounded-xl p-4 md:w-40 self-start">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-500">
                  <th>Boticas</th>
                </tr>
              </thead>
              <tbody>
                {
                  producto.boticas.map((botica, idx) => (
                    <tr key={idx} className="text-gray-700">
                      <td className="py-1">
                        <button className={`px-2 py-1 rounded-full border w-full text-left`}>
                          {botica.nombre}
                        </button>
                      </td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>

        {/* Buscar boticas */}
        <div className="mt-10">
          <h3 className="font-semibold text-lg mb-3">Buscar boticas más cercanas</h3>
          <div className="w-full rounded-xl overflow-hidden shadow-md">
            {/* Mapa y barra de búsqueda simulados */}
            <div className="relative">
              <img
                src="https://elcomercio.pe/resizer/-CijCLiHN49WgBZlRCO-m9ap9BI=/1200x680/smart/filters:format(jpeg):quality(75)/arc-anglerfish-arc2-prod-elcomercio.s3.amazonaws.com/public/UAGOCODQDJDNRG7KSJ7Z3PTJ2E.jpg"
                alt="Mapa"
                className="w-full h-80 object-cover"
                />
              <div className="absolute top-4 left-4 flex bg-white rounded-full shadow px-2 py-1">
                <input
                  type="text"
                  placeholder="Ingrese una dirección"
                  className="px-2 py-1 text-sm rounded-l-full outline-none"
                  />
                <button 
                  className="bg-black text-white px-4 py-1 text-sm rounded-full transition-transform hover:scale-[1.02] cursor-pointer"
                >
                  Buscar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
