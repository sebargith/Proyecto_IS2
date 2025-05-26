import React, { useState } from 'react';

interface Props {
  onAuthSuccess: () => void;
}

const Auth: React.FC<Props> = ({ onAuthSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ email: '', password: '', name: '' });
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {    // Se debe modificar aquí cuando se posea la base de datos
    e.preventDefault();
    // Simulación de autenticación (reemplaza por lógica real)
    if (form.email && form.password && (isLogin || form.name)) {
      setError('');
      onAuthSuccess();
    } else {
      setError('Completa todos los campos.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-400 via-yellow-300 to-yellow-100">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <input
              name="name"
              type="text"
              placeholder="Nombre"
              value={form.name}
              onChange={handleChange}
              className="w-full p-3 rounded-xl border border-yellow-300 bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          )}
          <input
            name="email"
            type="email"
            placeholder="Correo electrónico"
            value={form.email}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-yellow-300 bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          <input
            name="password"
            type="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
            className="w-full p-3 rounded-xl border border-yellow-300 bg-yellow-50 focus:outline-none focus:ring-2 focus:ring-yellow-400"
          />
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl transition"
          >
            {isLogin ? 'Entrar' : 'Registrarse'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button
            className="text-blue-600 hover:underline text-sm"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin
              ? '¿No tienes cuenta? Regístrate'
              : '¿Ya tienes cuenta? Inicia sesión'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;