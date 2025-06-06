import React, { useState } from "react";
import axios from "axios";

interface Props {
  onAuthSuccess: () => void;
}

/* URL del backend --------------------------------------------------------- */
// axios.defaults.baseURL = 'http://localhost:4000';

const Auth: React.FC<Props> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);

  /* Estado del formulario */
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    age: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.email ||
      !form.password ||
      (!isLogin && (!form.username || !form.age))
    ) {
      return setError("Completa todos los campos.");
    }

    try {
      const route = isLogin ? "/login" : "/register";
      /* El backend usa `username`, aquí enviamos el email como tal */
      const payload = isLogin
        ? { email: form.email, password: form.password, route } // backend espera "username" como email
        : {
            username: form.username,
            email: form.email,
            password: form.password,
            age: Number(form.age),
            route,
          };

      const { data } = await axios.post(route, payload); // { id, username } si es login

      if (isLogin) {
        localStorage.setItem("user", JSON.stringify(data));
      }

      setError("");
      onAuthSuccess(); // avisa a App para recargar
    } catch (err: any) {
      const st = err.response?.status;
      if (st === 409) setError("El correo ya está registrado.");
      else if (st === 401) setError("Credenciales inválidas.");
      else setError("Error del servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-500 via-sky-400 to-blue-500">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        {/* Logo y nombre */}
        <div className="flex flex-col items-center mb-6">
          <img
            src="public/assets/logo.png"
            alt="Logo"
            className="h-20 w-20 rounded-full mb-2"
          />
          <h1 className="text-3xl font-bold text-blue-700">Climátika</h1>
        </div>

        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          {isLogin ? "Iniciar Sesión" : "Registrarse"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          {!isLogin && (
            <>
              <input
                name="username"
                type="text"
                placeholder="Nombre de usuario"
                value={form.username}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </>
          )}

          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          {!isLogin && (
            <>
              <input
                name="age"
                type="number"
                placeholder="Edad"
                value={form.age}
                onChange={handleChange}
                className="w-full p-3 rounded-xl border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </>
          )}

          {error && <p className="text-red-600 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            {isLogin ? "Entrar" : "Registrarse"}
          </button>
        </form>

        <div className="mt-4">
          <button
            className="text-blue-300 hover:text-white underline text-sm"
            onClick={() => {
              setIsLogin(!isLogin);
              setError("");
            }}
          >
            {isLogin
              ? "¿No tienes cuenta? Regístrate"
              : "¿Ya tienes cuenta? Inicia sesión"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
