import React, { useState } from "react";
import axios from "axios";

interface Props {
  onAuthSuccess: () => void;
}

const Auth: React.FC<Props> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: "", password: "", name: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (form.email && form.password && (isLogin || form.name)) {
      axios.post("/api", form).then(({ data }) => {
        if (data) {
          setError("");
          onAuthSuccess();
        } else {
          setError("Oh no!");
        }
      });
    } else {
      setError("Completa todos los campos.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-500 via-sky-400 to-blue-500">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        {/* Logo y nombre de la app */}
        <div className="flex flex-col items-center justify-center mb-6">
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
            <input
              name="name"
              type="text"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
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
            onClick={() => setIsLogin(!isLogin)}
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
