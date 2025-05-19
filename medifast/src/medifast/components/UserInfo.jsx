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

  export default UserInfo;