import { useState } from "react";

export const CouponManagement = () => {
  const [coupons, setCoupons] = useState([
    { id: 1, code: "DESCUENTO10", description: "10% de descuento", active: true },
  ]);
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");

  const addCoupon = () => {
    if (code.trim() && description.trim()) {
      setCoupons([...coupons, { id: Date.now(), code, description, active: true }]);
      setCode("");
      setDescription("");
    }
  };

  const toggleCoupon = (id) => {
    setCoupons(coupons.map((c) => (c.id === id ? { ...c, active: !c.active } : c)));
  };

  const deleteCoupon = (id) => {
    setCoupons(coupons.filter((c) => c.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Gestión de Cupones</h2>
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
        <button onClick={addCoupon} className="bg-green-600 text-white px-4 py-2 rounded">
          Añadir
        </button>
      </div>
      <ul className="space-y-2">
        {coupons.map((coupon) => (
          <li key={coupon.id} className="flex justify-between items-center border p-2 rounded">
            <div>
              <strong>{coupon.code}</strong> - {coupon.description}
              <span className={`ml-2 text-sm ${coupon.active ? "text-green-600" : "text-red-600"}`}>
                ({coupon.active ? "Activo" : "Inactivo"})
              </span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => toggleCoupon(coupon.id)}
                className={`px-3 py-1 rounded text-white ${
                  coupon.active ? "bg-yellow-500" : "bg-green-500"
                }`}
              >
                {coupon.active ? "Desactivar" : "Activar"}
              </button>
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
