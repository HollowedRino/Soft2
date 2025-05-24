import { useState } from "react";
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { FirebaseAuth } from "../../firebase/config";

export default function ChangePassword() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      const user = FirebaseAuth.currentUser;

      if (!user || !user.email) {
        setError("No hay usuario autenticado");
        return;
      }

      // Creamos las credenciales para re-autenticar
      const credential = EmailAuthProvider.credential(user.email, currentPassword);

      // Re-autenticamos al usuario
      await reauthenticateWithCredential(user, credential);

      // Si la re-autenticación fue exitosa, actualizamos la contraseña
      await updatePassword(user, password);

      setSuccess(true);
      setCurrentPassword("");
      setPassword("");
      setConfirmPassword("");
    } catch (err) {
      setError(`Error: ${err.message}`);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold text-green-700 mb-6">Cambiar Contraseña</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="currentPassword" className="block font-semibold mb-1">Contraseña Actual:</label>
          <input
            id="currentPassword"
            type="password"
            value={currentPassword}
            onChange={e => setCurrentPassword(e.target.value)}
            required
            className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="password" className="block font-semibold mb-1">Nueva Contraseña:</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
            className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label htmlFor="confirmPassword" className="block font-semibold mb-1">Confirmar Nueva Contraseña:</label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="w-full border border-green-400 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
        >
          Guardar nueva contraseña
        </button>

        {success && <p className="text-green-700 font-semibold mt-2">¡Contraseña actualizada con éxito!</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </form>
    </div>
  );
}
