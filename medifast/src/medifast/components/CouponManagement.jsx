import { useState, useEffect } from "react";
import { getAllCupones, deleteCupon, createCupon } from "../services/cuponService";

export const CouponManagement = () => {
  const [coupons, setCoupons] = useState([]);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");

  useEffect(() => {
    const fetchCupones = async () => {
      try {
        const data = await getAllCupones();
        console.log("Respuesta del backend:", data); // <-- Aquí ves la respuesta
        const formatted = data.map((c) => ({
          id: c.id,
          code: c.codigo,
          description: c.descripcion,
          discount: c.descuento,
          active: true, // Puedes modificar esto si manejas estado activo en BD
        }));
        setCoupons(formatted);
      } catch (error) {
        console.error("Error al cargar cupones:", error.message);
      }
    };

    fetchCupones();
  }, []);

const addCoupon = async () => {
  if (
    code.trim() &&
    description.trim() &&
    discount.trim() &&
    !isNaN(discount) &&
    Number(discount) > 0
  ) {
    try {
      await createCupon({
        codigo: code,
        descripcion: description,
        descuento: Number(discount),
      });
      setCode("");
      setDescription("");
      setDiscount("");
      // Recarga la lista desde el backend
      const data = await getAllCupones();
      const formatted = data.map((c) => ({
        id: c.id,
        code: c.codigo,
        description: c.descripcion,
        discount: c.descuento,
        active: true,
      }));
      setCoupons(formatted);
    } catch (error) {
      console.error("Error al crear cupón:", error.message);
    }
  }
};

const deleteCoupon = async (id) => {
  try {
    await deleteCupon(id); // Elimina de la base de datos
    // Vuelve a cargar los cupones desde el backend
    const data = await getAllCupones();
    console.log("Respuesta del backend al eliminar:", data); // <-- Aquí ves la respuesta
    const formatted = data.map((c) => ({
      id: c.id,
      code: c.codigo,
      description: c.descripcion,
      discount: c.descuento,
      active: true,
    }));
    setCoupons(formatted);
  } catch (error) {
    console.error("Error al eliminar cupón:", error.message);
  }
};

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        Gestión de Cupones
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Código"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
        />
        <input
          type="text"
          placeholder="Descripción"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
        />
        <input
          type="number"
          placeholder="Descuento (%)"
          value={discount}
          min="1"
          max="100"
          onChange={(e) => setDiscount(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2 w-44"
        />
          <button
            onClick={addCoupon}
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Añadir
          </button>
      </div>

      <ul className="space-y-2">
        {coupons.map((coupon) => (
          <li
            key={coupon.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <div>
              <strong>{coupon.code}</strong> - {coupon.description}
              <span className="ml-2 text-blue-700 font-semibold">
                ({coupon.discount}%)
              </span>
            </div>
            <div>
              <button
                onClick={() => deleteCoupon(coupon.id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
