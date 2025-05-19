import { useParams } from "react-router-dom";
import { ProductItem } from "../components/ProductItem";
  
  export const CategoryPage = () => {
    const { categoryName } = useParams();
  
    const traducciones = {
      medications: "Medicamentos",
      "natural-medicines": "Medicamentos Naturales",
      "older-adult": "Adulto Mayor",
      childish: "Infantil",
      beauty: "Belleza",
      vitamins: "Vitaminas y Suplementos",
    };
  
    const categoriaTraducida =
      traducciones[categoryName] || "Categoría desconocida";
  
    return (
      <div className="flex flex-col py-5 px-5 sm:px-10">
        <h1 className="text-1xl font-bold mb-3 text-left">
          {"Inicio > " + categoriaTraducida}
        </h1>
  
        <div className="w-full bg-green-100 min-h-120">
          <div className=" w-full p-6 sm:px-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-8">
              {/* ProductItem */}

                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                <ProductItem />
                
            </div>
          </div>
        </div>
      </div>
    );
  };
  