import { useState } from "react";
import { CouponManagement } from "../components/CouponManagement";
import { InventoryManagement } from "../components/InventoryManagement";
import { PharmacyManagement } from "../components/PharmacyManagement";

export const AdminProfile = () => {
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
          <InventoryManagement
            pharmacy={currentPharmacy}
            updatePharmacyInventory={updatePharmacyInventory}
          />
        ) : (
          <p>Seleccione una botica para ver su inventario</p>
        );
      case "pharmacies":
        return <PharmacyManagement pharmacies={pharmacies} setPharmacies={setPharmacies} />;
      default:
        return <p>Sección no encontrada</p>;
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
