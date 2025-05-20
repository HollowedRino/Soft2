import { useParams } from "react-router-dom";
import { ProductItem } from "../components/ProductItem";
import { motion } from "framer-motion";
import { findMedsByCategory } from "../services/medicamentoService";
import { useEffect } from "react";
  
  export const CategoryPage = () => {

    const { categoryName } = useParams();
    
    const productos = [
      {
        id: 1,
        nombre: "Panadol Antigripal NF Tableta",
        descripcion: "SOBRE X2 TABS 1 UN",
        fabricante: "GSK",
        precio: 2.88,
        requiere_receta: false,
        estado_medicamento: true,
        imagen_url:
          "https://res.cloudinary.com/dgxakgsuo/image/upload/v1745927069/a4483dc3ae132b2ed181456f7232f5b6926cf91e_xq4jie.png",
        boticas: [
          {
            id: 1,
            nombre: "BTL",
            direccion: "Av. Universitaria 123",
            telefono_botica: 989898989,
            horario_apertura: "08:00",
            horario_cierre: "22:00",
            distrito: {
              id: 3,
              nombre_distrito: "Lince"
            },
            inventario: {
              cantidad_disponible: 20,
              fecha_actualizacion: "2025-05-16"
            }
          },
          {
            id: 2,
            nombre: "Hogar y Salud",
            direccion: "Av. Arequipa 456",
            telefono_botica: 987654321,
            horario_apertura: "09:00",
            horario_cierre: "21:00",
            distrito: {
              id: 5,
              nombre_distrito: "Jesús María"
            },
            inventario: {
              cantidad_disponible: 15,
              fecha_actualizacion: "2025-05-16"
            }
          }
        ]
      }
    ];


    const traducciones = {
      medications: "Medicamentos",
      "natural-medicines": "Medicamentos Naturales",
      "older-adult": "Adulto Mayor",
      childish: "Infantil",
      beauty: "Belleza",
      vitamins: "Vitaminas y Suplementos",
    };
  
    const categoriaTraducida = traducciones[categoryName] || "Categoría desconocida";
  
    return (
      <div className="flex flex-col py-5 px-5 sm:px-10">
        <motion.h1
         key={categoryName}
         className="text-1xl font-bold mb-3 text-left"
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5, ease: "easeOut" }}
         >
          {"Inicio > " + categoriaTraducida}
        </motion.h1>
  
        <div className="w-full bg-green-100 rounded-3xl">
          <div className=" w-full p-6 sm:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-8">
              {/* ProductItem */}
              {productos.map( producto => (
                <ProductItem key={producto.id} producto={producto} />
              ))}
              
            </div>
          </div>
        </div>
      </div>
    );
  };
  