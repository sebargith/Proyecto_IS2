import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

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
    <AnimatePresence mode="wait">
      <motion.div
        key="auth-bg"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="min-h-screen flex items-center justify-center bg-gradient-to-br from-sky-500 via-sky-400 to-blue-500"
      >
        <motion.div
          key="auth-card"
          initial={{ opacity: 0, scale: 0.95, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 40 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center"
        >
          {/* Logo y nombre */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5, type: "spring" }}
            className="flex flex-col items-center mb-6"
          >
            <img
              src="public/assets/logo.png"
              alt="Logo"
              className="h-20 w-20 rounded-full mb-2 shadow-lg"
            />
            <h1 className="text-3xl font-bold text-blue-700">Climátika</h1>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="text-xl font-semibold text-gray-800 mb-4"
          >
            {isLogin ? "Iniciar Sesión" : "Registrarse"}
          </motion.h2>

          <AnimatePresence mode="wait">
            <motion.form
              key={isLogin ? "login" : "register"}
              onSubmit={handleSubmit}
              className="space-y-4 text-left"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.4 }}
            >
              {!isLogin && (
                <input
                  name="username"
                  type="text"
                  placeholder="Nombre de usuario"
                  value={form.username}
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

              {!isLogin && (
                <input
                  name="age"
                  type="number"
                  placeholder="Edad"
                  value={form.age}
                  onChange={handleChange}
                  className="w-full p-3 rounded-xl border border-blue-300 bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              )}

              {error && <p className="text-red-600 text-sm">{error}</p>}

              <motion.button
                type="submit"
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-xl transition"
              >
                {isLogin ? "Entrar" : "Registrarse"}
              </motion.button>
            </motion.form>
          </AnimatePresence>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.4 }}
            className="mt-4"
          >
            <button
              className="text-blue-300 hover:text-white underline text-sm transition"
              onClick={() => {
                setIsLogin(!isLogin);
                setError("");
              }}
            >
              {isLogin
                ? "¿No tienes cuenta? Regístrate"
                : "¿Ya tienes cuenta? Inicia sesión"}
            </button>
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Auth;
