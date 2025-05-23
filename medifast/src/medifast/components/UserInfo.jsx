import { useEffect, useState, useContext } from "react";
import { updateUser } from "../services/userService";
import { UserContext } from "../../contexts/UserProvider";

export default function UserInfo() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [saved, setSaved] = useState(false);
  const { updateName,updateLastName,updatePhoneNumber } = useContext(UserContext);
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData) {
      setName(userData.name || "");
      setLastName(userData.lastName || "");
      setPhoneNumber(userData.phoneNumber || "");

    }
  }, []);

 const handleSave = async (e) => {
  e.preventDefault();

  const userData = JSON.parse(localStorage.getItem("user")) || {};
  const updatedUser = {
    ...userData,
    name,
    lastName,
    phoneNumber,
  };

  

  localStorage.setItem("user", JSON.stringify(updatedUser));

  try {
    if (userData.id) {
      const response = await updateUser(userData.id, {
  nombre: name,
  apellido: lastName,
  telefono_usuario: phoneNumber,
});

      if (!response.ok) {
        console.error("Error actualizando backend:", response.errorMessage);
      }
      // Actualizar el contexto
      updateName(name);
      updateLastName(lastName);
      updatePhoneNumber(phoneNumber);
    }
  } catch (error) {
    console.error("Error inesperado al actualizar backend:", error);
  }

  setSaved(true);
  setTimeout(() => setSaved(false), 3000);
};
  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Editar Perfil</h2>
      <form onSubmit={handleSave} className="space-y-4 max-w-md">
        
        {/* Campo: Nombre */}
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

        {/* Campo: Apellido */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="lastName">Apellido:</label>
          <input
            id="lastName"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Campo: Teléfono */}
        <div>
          <label className="block font-semibold mb-1" htmlFor="phoneNumber">Teléfono:</label>
          <input
            id="phoneNumber"
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>



        {/* Botón para guardar cambios */}
        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Enviar
        </button>

        {/* Mensaje de éxito */}
        {saved && (
          <p className="mt-2 text-green-700 font-semibold">¡Perfil actualizado con éxito!</p>
        )}
      </form>
    </div>
  );
}
