
import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginWithEmailPassword, signInWithGoogle } from '../../firebase/providers';
import { getUserByEmail, registerGoogleUser } from '../../medifast/services/userService';
import { UserContext } from '../../contexts/UserProvider';

const firebaseErrorMessages = {
  'auth/invalid-email': 'El correo ingresado no es válido.',
  'auth/user-not-found': 'No existe una cuenta con este correo.',
  'auth/wrong-password': 'La contraseña es incorrecta.',
  'auth/user-disabled': 'Esta cuenta ha sido deshabilitada.',
  'auth/too-many-requests': 'Demasiados intentos. Intenta más tarde.',
};

export const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  
  const { login, user } = useContext(UserContext);

  const navigate = useNavigate();
  
  const handleLogin = async () => {
    const result = await loginWithEmailPassword({ email, password });
    

    if (!result.ok) {
      const customMessage = firebaseErrorMessages[result.errorCode] || 'Error al iniciar sesión.';
      setErrorMessage(customMessage);
      return;
    }

    const { resp } = await getUserByEmail(email);
    login(resp);
    console.log(resp);
    console.log(user);

    navigate('/dashboard');
  };

const handleGoogleSignIn = async () => {
  const result = await signInWithGoogle();

  if (!result.ok) {
    setErrorMessage('Error con Google Sign-In.');
    return;
  }

  const email = result.email;
  const displayName = result.displayName;

  // Separa nombre y apellido
  const [nombre, ...rest] = displayName.split(" ");
  const apellido = rest.join(" ");

  const backendResponse = await registerGoogleUser({ email, nombre, apellido });

  if (!backendResponse.ok) {
    setErrorMessage(backendResponse.errorMessage || 'Error en backend.');
    return;
  }

  const { resp } = await getUserByEmail(email);
  login(resp);
  console.log(resp);
  console.log(user);

  // Si llegamos acá, usuario creado o ya existente: vamos al dashboard
  navigate("/dashboard");
};







  return (
    <div className="flex justify-center items-center bg-gray-100">
      <div className="bg-white p-20 rounded-xl shadow-md w-140 mb-50">
        <p className="text-center text-xl font-normal mb-6">Ingreso para Usuarios registrados</p>

        <div className="mb-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border border-gray-300 rounded-md mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {errorMessage && (
          <p className="text-red-500 text-sm mb-2 text-center">{errorMessage}</p>
        )}

        <button
          onClick={handleLogin}
          className="w-full bg-black text-white py-3 rounded-md hover:bg-gray-800 focus:outline-none mb-2"
        >
          Ingresar
        </button>

        <button
          onClick={handleGoogleSignIn}
          className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-red-700 focus:outline-none mb-4"
        >
          Ingresar con Google
        </button>

        <div className="text-center">
          <Link className="text-gray-800 text-sm hover:underline" to="/forgotpass">
            Olvidé mi password
          </Link>
          <br />
          <Link className="text-gray-800 text-sm hover:underline" to="/registro">
            No tengo cuenta, deseo registrarme
          </Link>
          <br />
          <Link className="text-gray-800 text-sm hover:underline" to="/Admin">
            Admin
          </Link>

        </div>
      </div>
    </div>
  );
};