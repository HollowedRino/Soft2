import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { findMedsByCategory } from "../services/medicamentoService";
import { useEffect, useState } from "react";
import { CategoryContent } from "../components/CategoryContent";

const traducciones = {
  medications: "Medicamentos",
  "natural-medicines": "Medicamentos Naturales",
  "older-adult": "Adulto Mayor",
  childish: "Infantil",
  beauty: "Belleza",
  vitamins: "Vitaminas y Suplementos",
};

export const CategoryPage = () => {
  const { categoryName } = useParams();
  const [meds, setMeds] = useState([]);
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(true);

  const categoriaTraducida = traducciones[categoryName] || "Categoría desconocida";

  const getmeds = async () => {
    setLoading(true);
    const resultado = await findMedsByCategory(categoryName);
    console.log(resultado);

    if (!resultado.ok) {
      console.error(`Error al cargar las medicinas: ${resultado.errorMessage}`);
      setOk(false);
      setMeds([]);
    } else {
      setMeds(resultado.res);
      setOk(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    getmeds();
  }, [categoryName]);

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
        <div className="w-full p-6 sm:px-10">
          <CategoryContent loading={loading} ok={ok} meds={meds} />
        </div>
      </div>
    </div>
  );
};
