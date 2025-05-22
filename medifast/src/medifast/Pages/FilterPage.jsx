import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { CategoryContent } from "../components/CategoryContent";
import { Loading } from "../components/Loading";
import { findAllMedsWithDetail, findMedsByPartialName } from "../services/medicamentoService";


export const FilterPage = () => {
  const { filtro } = useParams();
  const [meds, setMeds] = useState([]);
  const [loading, setLoading] = useState(true);


  const getmeds = async () => {
    setLoading(true);
    
    let resultado;

    if (filtro === "todos"){
        resultado = await findAllMedsWithDetail();
        console.log(resultado);
    }
    else {
        resultado = await findMedsByPartialName(filtro);
        console.log(resultado);
    }

    if (!resultado.ok) {
      console.error(`Error al cargar las medicinas en FilterPage: ${resultado.errorMessage}`);
      setMeds([]);
    } else {
      setMeds(resultado.res);
    }
    setLoading(false);
  };

  useEffect(() => {
    getmeds();
  }, [filtro]);

  return (
    <div className="flex flex-col py-5 px-5 sm:px-10">
      <motion.h1
        key={filtro}
        className="text-1xl font-bold mb-3 text-left"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        {"Inicio > " + filtro}
      </motion.h1>

      <div className="w-full bg-green-100 rounded-3xl">
        <div className="w-full p-6 sm:px-10">
          {loading ?
            <Loading />
            :
            <CategoryContent meds={meds} />
          }
        </div>
      </div>
    </div>
  );
};
