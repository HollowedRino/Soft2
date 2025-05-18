import { useState } from "react";

function UserInfo() {
  // info estatica 
  const [name, setName] = useState("Juan Pérez");
  const [email, setEmail] = useState("juan.perez@email.com");
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Editar Perfil</h2>
      <form onSubmit={handleSave} className="space-y-4 max-w-md">
        <div>
          <label className="block font-semibold mb-1" htmlFor="name">Nombre:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="email">Email:</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="password">Contraseña:</label>
          <input
            id="password"
            type="password"
            value={password}
            placeholder="Nueva contraseña"
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Guardar cambios
        </button>

        {saved && (
          <p className="mt-2 text-green-700 font-semibold">¡Perfil actualizado con éxito!</p>
        )}
      </form>
    </div>
  );
}

function Orders() {
  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Pedidos Recientes</h2>
      <ul className="list-disc list-inside text-lg space-y-1">
        <li>Pedido #12345 - Entregado</li>
        <li>Pedido #12346 - En camino</li>
        <li>Pedido #12347 - Cancelado</li>
      </ul>
    </div>
  );
}

function Coupons() {
  const coupons = [
    { id: 1, code: "DESCUENTO10", description: "10% de descuento en tu próxima compra" },
    { id: 2, code: "ENVIOGRATIS", description: "Envío gratis en pedidos mayores a S/50" },
  ];

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Cupones Disponibles</h2>
      {coupons.length > 0 ? (
        <ul className="list-disc list-inside text-lg space-y-1">
          {coupons.map((coupon) => (
            <li key={coupon.id}>
              <strong>{coupon.code}:</strong> {coupon.description}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-lg">No tienes cupones disponibles en este momento.</p>
      )}
    </div>
  );
}

export const UserProfile = () => {
  const [activeSection, setActiveSection] = useState("info");

  const renderSection = () => {
    switch (activeSection) {
      case "info":
        return <UserInfo />;
      case "orders":
        return <Orders />;
      case "coupons":
        return <Coupons />;
      default:
        return <div>Selecciona una opción</div>;
    }
  };

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-160px)]">
      <main className="flex-1 p-4 md:p-8 flex flex-wrap md:flex-nowrap gap-6 justify-center items-start">

        {/* Panel izquierdo con botones */}
        <div className="w-full md:w-[25%] min-w-[200px] h-[60vh] border-2 border-green-600 rounded-xl bg-white shadow-lg p-4 flex flex-col justify-between">
          <div>
            <h2 className="text-green-700 font-semibold text-lg mb-4">Menú</h2>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={() => setActiveSection("info")}
                  className={`w-full text-left p-2 rounded ${
                    activeSection === "info" ? "bg-green-300" : "bg-green-100 hover:bg-green-200"
                  }`}
                >
                  Perfil
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("orders")}
                  className={`w-full text-left p-2 rounded ${
                    activeSection === "orders" ? "bg-green-300" : "bg-green-100 hover:bg-green-200"
                  }`}
                >
                  Pedidos
                </button>
              </li>
              <li>
                <button
                  onClick={() => setActiveSection("coupons")}
                  className={`w-full text-left p-2 rounded ${
                    activeSection === "coupons" ? "bg-green-300" : "bg-green-100 hover:bg-green-200"
                  }`}
                >
                  Cupones
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


        <div className="w-full md:w-[70%] min-w-[300px] h-[60vh] border-2 border-green-600 rounded-xl bg-white shadow-lg p-6 overflow-y-auto">
          {renderSection()}
        </div>

      </main>
    </div>
  );
}
