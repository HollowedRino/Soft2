import { useLocation, useParams } from "react-router-dom";
import { BuildingStorefrontIcon, TruckIcon } from '@heroicons/react/16/solid';
import { motion } from "framer-motion";
import { AddToCartButton } from "../components/AddToCartButton";
import { useEffect, useState } from "react";
import { getLatLngFromAddress } from "../services/geocodeService";
import MapComponent from "../components/MapComponent";
export const ProductPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const producto = location.state;
  const [boticaCoords, setBoticaCoords] = useState(null);
  const [loadingCoords, setLoadingCoords] = useState(true);
  const [coordsError, setCoordsError] = useState(null);
  const [selectedBoticaIdx, setSelectedBoticaIdx] = useState(0);
  
  useEffect(() => {
    if (producto && producto.boticas && producto.boticas.length > 0) {
      const direccion = producto.boticas[selectedBoticaIdx].direccion;
      setLoadingCoords(true);
      getLatLngFromAddress(direccion)
        .then(coords => {
          setBoticaCoords(coords);
          setCoordsError(null);
        })
        .catch(err => {
          setCoordsError("No se pudo obtener la ubicación de la botica.");
          setBoticaCoords(null);
        })
        .finally(() => setLoadingCoords(false));
    }
  }, [producto, selectedBoticaIdx]);

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
            <img 
              src={producto.imagen_url ? 
                  producto.imagen_url : 
                  "https://res.cloudinary.com/dgxakgsuo/image/upload/v1747766681/pngtree-flat-design-medication-bottle-vector-illustration-png-image_7037036_hdhblb.png"
                } 
              alt={producto.nombre} 
              className="w-48 h-auto" 
            />
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
                {producto.boticas.map((botica, idx) => (
                  <tr key={idx} className="text-gray-700">
                    <td className="py-1">
                      <button 
                        className={`px-2 py-1 rounded-full border w-full text-left ${selectedBoticaIdx === idx ? 'bg-green-300 font-bold' : ''}`}
                        onClick={() => setSelectedBoticaIdx(idx)}
                      >
                        {botica.nombre}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Buscar boticas */}
        <div className="mt-10">
          <h3 className="font-semibold text-lg mb-3">Ubicación de la botica</h3>
          <div className="w-full rounded-xl overflow-hidden shadow-md">
              {loadingCoords && <p>Cargando mapa...</p>}
              {coordsError && <p className="text-red-500">{coordsError}</p>}
              {boticaCoords && !loadingCoords && !coordsError && (
                <MapComponent lat={boticaCoords.lat} lng={boticaCoords.lng} />
              )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
