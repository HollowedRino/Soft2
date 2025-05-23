import { ProductItem } from "../components/ProductItem";

export const CategoryContent = ({ meds }) => {
  if (meds.length === 0) {
    return (
      <div className="text-center py-10 text-red-600 text-xl min-h-200 font-bold">
        No se encontraron productos.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 3xl:grid-cols-6 gap-8">
      {meds.map((producto) => (
        <ProductItem key={producto.id} producto={producto} />
      ))}
    </div>
  );
};
