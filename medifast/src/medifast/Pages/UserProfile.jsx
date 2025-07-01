import { useState, useContext } from "react";
import { UserContext } from "../../contexts/UserProvider";
import UserInfo from "../components/UserInfo";
import Orders from "../components/Orders";
import Coupons from "../components/Coupons";
import ChangePassword from "../components/ChangePassword";
import { CartContext } from "../../contexts/CartProvider";
import { ChatbotContext } from "../../contexts/ChatbotProvider";

export default function UserProfile() {
  const [activeSection, setActiveSection] = useState("info");
  const { logout } = useContext(UserContext);
  const { clearCart } = useContext(CartContext);
  const { clearChat } = useContext(ChatbotContext)
  const handleLogout = () => {
    logout();
    clearCart();
    clearChat();
  };

const renderSection = () => {
  switch (activeSection) {
    case "info":
      return <UserInfo />;
    case "orders":
      return <Orders />;
    case "coupons":
      return <Coupons />;
    case "password":
      return <ChangePassword />;
    default:
      return <div>Selecciona una opción</div>;
  }
};

  return (
    <div className="flex flex-col md:flex-row w-full min-h-[calc(100vh-160px)]">
      <main className="flex-1 bg-green-50 p-4 md:p-8 flex flex-wrap md:flex-nowrap gap-6 justify-center items-start">

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
              <li>
                <button
                    onClick={() => setActiveSection("password")}
                    className={`w-full text-left p-2 rounded ${
                    activeSection === "password" ? "bg-green-300" : "bg-green-100 hover:bg-green-200"
                    }`}
                >
                    Cambio de contraseña
                </button>
              </li>
            </ul>
          </div>
          <button
            onClick={ handleLogout }
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
