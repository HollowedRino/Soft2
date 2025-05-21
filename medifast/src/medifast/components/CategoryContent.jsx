import { ProductItem } from "../components/ProductItem";

export const CategoryContent = ({ loading, ok, meds }) => {

    
  if (loading) {
    return <div className="text-center py-10 h-full">Cargando productos...</div>;
  }
  if (!ok || loading) {
      return <div className="text-center py-10 text-red-600">No existen productos para esa categoría.</div>;
    }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-8">
      {meds.map((producto) => (
        <ProductItem key={producto.id} producto={producto} />
      ))}
    </div>
  );
};
