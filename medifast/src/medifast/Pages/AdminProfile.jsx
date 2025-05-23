import { useState, useEffect } from "react";
import { CouponManagement } from "../components/CouponManagement";
import { InventoryManagement } from "../components/InventoryManagement";
import { PharmacyManagement } from "../components/PharmacyManagement";
import { getAllBoticas, getInventarioByBoticaId } from "../services/boticaService";

export const AdminProfile = () => {
  const [activeSection, setActiveSection] = useState("coupons");
  const [pharmacies, setPharmacies] = useState([]);
  const [activePharmacyId, setActivePharmacyId] = useState(null);
  const [pharmacyInventory, setPharmacyInventory] = useState([]);

  useEffect(() => {
    getAllBoticas()
      .then((data) => {
        const mapped = data.map((b) => ({
          id: b.id,
          name: b.nombre,
          direccion: b.direccion,
        }));

        setPharmacies(mapped);
        if (mapped.length > 0) setActivePharmacyId(mapped[0].id);
      })
      .catch((err) => {
        console.error("Error al cargar boticas:", err);
      });
  }, []);

  useEffect(() => {
    if (activePharmacyId !== null) {
      getInventarioByBoticaId(activePharmacyId)
        .then((data) => {
          // Aseguramos que data siempre sea un array
          const inventarioArray = Array.isArray(data) ? data : [data];
          
          const mappedInventory = inventarioArray.map((item) => ({
            id: item.Medicamento.id,
            name: item.Medicamento.nombre,
            stock: item.cantidad_disponible,
            price: item.Medicamento.precio,
          }));
          setPharmacyInventory(mappedInventory);
        })
        .catch((err) => {
          console.error("Error al cargar inventario:", err);
          setPharmacyInventory([]);
        });
    }
  }, [activePharmacyId]);

  const renderSection = () => {
    switch (activeSection) {
      case "coupons":
        return <CouponManagement />;
      case "inventory":
        const currentPharmacy = pharmacies.find((p) => p.id === activePharmacyId);
        return currentPharmacy ? (
          <div>
            <div className="mb-4">
              <label className="block text-green-700 text-xl font-semibold mb-4">
                Selecciona una botica:
              </label>
              <select
                value={activePharmacyId ?? ""}
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
            <InventoryManagement pharmacy={{ ...currentPharmacy, inventory: pharmacyInventory }} />
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
                    activeSection === "coupons" ? "bg-green-300" : "bg-green-100 hover:bg-green-200"
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
            onClick={() => {
              // Acción para cerrar sesión, si aplica
            }}
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
};
