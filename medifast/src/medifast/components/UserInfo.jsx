import { useState, useEffect } from "react";
import { userService } from "../services/userService";

function UserInfo() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
  });
  const [password, setPassword] = useState("");
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // Cargar datos del usuario al montar el componente
  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setLoading(true);
      const data = await userService.getCurrentUser();
      setUserData({
        name: data.name,
        email: data.email,
      });
    } catch (error) {
      setError("Error al cargar los datos del usuario");
      console.error("Error loading user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(null);
    setSaved(false);

    try {
      // Actualizar información básica
      await userService.updateUser({
        name: userData.name,
        email: userData.email,
      });

      // Si hay una nueva contraseña, actualizarla
      if (password) {
        await userService.changePassword({ password });
        setPassword(""); // Limpiar el campo de contraseña
      }

      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      setError("Error al actualizar el perfil");
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return <div className="text-center">Cargando...</div>;
  }

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Editar Perfil</h2>
      <form onSubmit={handleSave} className="space-y-4 max-w-md">
        <div>
          <label className="block font-semibold mb-1" htmlFor="name">
            Nombre:
          </label>
          <input
            id="name"
            type="text"
            value={userData.name}
            onChange={(e) => setUserData({ ...userData, name: e.target.value })}
            className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="email">
            Email:
          </label>
          <input
            id="email"
            type="email"
            value={userData.email}
            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
            className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1" htmlFor="password">
            Contraseña:
          </label>
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
          <p className="mt-2 text-green-700 font-semibold">
            ¡Perfil actualizado con éxito!
          </p>
        )}

        {error && (
          <p className="mt-2 text-red-600 font-semibold">{error}</p>
        )}
      </form>
    </div>
  );
}

export default UserInfo;