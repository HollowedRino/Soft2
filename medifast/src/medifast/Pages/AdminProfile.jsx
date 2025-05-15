import { useState } from "react";

// Gestión de Cupones
function CouponManagement() {
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
}

// Gestión de Inventario por Botica Central
function InventoryManagement({ pharmacy, updatePharmacyInventory }) {
  const [name, setName] = useState("");
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");

  const addItem = () => {
    if (name.trim() && stock && price) {
      const newItem = {
        id: Date.now(),
        name,
        stock: parseInt(stock),
        price: parseFloat(price),
      };
      updatePharmacyInventory([...pharmacy.inventory, newItem]);
      setName("");
      setStock("");
      setPrice("");
    }
  };

  const removeItem = (itemId) => {
    const updatedInventory = pharmacy.inventory.filter((item) => item.id !== itemId);
    updatePharmacyInventory(updatedInventory);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">
        Inventario de {pharmacy.name}
      </h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre del producto"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
        />
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
        />
        <input
          type="number"
          placeholder="Precio"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
        />
        <button onClick={addItem} className="bg-green-600 text-white px-4 py-2 rounded">
          Añadir
        </button>
      </div>
      <ul className="space-y-2">
        {pharmacy.inventory.map((item) => (
          <li key={item.id} className="flex justify-between items-center border p-2 rounded">
            <span>
              <strong>{item.name}</strong> - Stock: {item.stock} - Precio: S/ {item.price}
            </span>
            <button
              onClick={() => removeItem(item.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Gestión de Boticas
function PharmacyManagement({ pharmacies, setPharmacies }) {
  const [name, setName] = useState("");
  const [direccion, setDireccion] = useState("");

  const addPharmacy = () => {
    if (name.trim() && direccion.trim()) {
      setPharmacies([
        ...pharmacies,
        { id: Date.now(), name, direccion, inventory: [] },
      ]);
      setName("");
      setDireccion("");
    }
  };

  const removePharmacy = (id) => {
    setPharmacies(pharmacies.filter((p) => p.id !== id));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-4">Boticas Asociadas</h2>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nombre de la botica"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
        />
        <input
          type="text"
          placeholder="Dirección de la botica"
          value={direccion}
          onChange={(e) => setDireccion(e.target.value)}
          className="border border-green-400 rounded px-3 py-2 mr-2"
        />
        <button onClick={addPharmacy} className="bg-green-600 text-white px-4 py-2 rounded">
          Añadir
        </button>
      </div>
      <ul className="space-y-2">
        {pharmacies.map((pharmacy) => (
          <li key={pharmacy.id} className="flex justify-between items-center border p-2 rounded">
            <span>
              <strong>{pharmacy.name}</strong> - Dirección: {pharmacy.direccion}
            </span>
            <button
              onClick={() => removePharmacy(pharmacy.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Panel principal
export default function AdminDashboard() {
  const [activeSection, setActiveSection] = useState("coupons");
  const [pharmacies, setPharmacies] = useState([
    {
      id: 1,
      name: "Botica Central",
      direccion: "Av. Principal 123",
      inventory: [{ id: 1, name: "Paracetamol", stock: 50, price: 10.5 }],
    },
    {
      id: 2,
      name: "Botica Norte",
      direccion: "Jr. Libertad 456",
      inventory: [],
    },
  ]);
  const [activePharmacyId, setActivePharmacyId] = useState(pharmacies[0]?.id || null);

  const updatePharmacyInventory = (newInventory) => {
    setPharmacies((prev) =>
      prev.map((pharmacy) =>
        pharmacy.id === activePharmacyId ? { ...pharmacy, inventory: newInventory } : pharmacy
      )
    );
  };

  const renderSection = () => {
    switch (activeSection) {
      case "coupons":
        return <CouponManagement />;
      case "inventory":
        const currentPharmacy = pharmacies.find((p) => p.id === activePharmacyId);
        return currentPharmacy ? (
          <div>
            <div className="mb-4">
              <label className="block text-green-700 font-medium mb-2">
                Selecciona una botica:
              </label>
              <select
                value={activePharmacyId}
                onChange={(e) => setActivePharmacyId(Number(e.target.value))}
                className="border border-green-400 rounded px-3 py-2"
              >
                {pharmacies.map((pharmacy) => (
                  <option key={pharmacy.id} value={pharmacy.id}>
                    {pharmacy.name}
                  </option>
                ))}
              </select>
            </div>
            <InventoryManagement
              pharmacy={currentPharmacy}
              updatePharmacyInventory={updatePharmacyInventory}
            />
          </div>
        ) : (
          <div>No hay boticas disponibles.</div>
        );
      case "pharmacies":
        return <PharmacyManagement pharmacies={pharmacies} setPharmacies={setPharmacies} />;
      default:
        return <div>Selecciona una opción</div>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-160px)]">
      <main className="flex-1 bg-green-50 p-4 md:p-8 flex flex-wrap md:flex-nowrap gap-6 justify-center items-start">
        {/* Panel izquierdo */}
        <div className="w-full md:w-[25%] min-w-[200px] h-[60vh] border-2 border-green-600 rounded-xl bg-white shadow-lg p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-green-700 font-semibold text-lg mb-4">Panel de Admin</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveSection("coupons")}
                  className={`w-full text-left p-2 rounded ${
                    activeSection === "coupons"
                      ? "bg-green-300"
                      : "bg-green-100 hover:bg-green-200"
                  }`}
                >
                  Gestionar Cupones
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("inventory")}
                  className={`w-full text-left p-2 rounded ${
                    activeSection === "inventory"
                      ? "bg-green-300"
                      : "bg-green-100 hover:bg-green-200"
                  }`}
                >
                  Inventario
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("pharmacies")}
                  className={`w-full text-left p-2 rounded ${
                    activeSection === "pharmacies"
                      ? "bg-green-300"
                      : "bg-green-100 hover:bg-green-200"
                  }`}
                >
                  Boticas
                </button>
              </li>
            </ul>
          </div>
          <button
            onClick={() => {}}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-2 rounded mt-4"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Panel derecho */}
        <div className="w-full md:w-[70%] min-w-[300px] h-[60vh] border-2 border-green-600 rounded-xl bg-white shadow-lg p-6 overflow-y-auto">
          {renderSection()}
        </div>
        
      </main>
    </div>
  );
}
