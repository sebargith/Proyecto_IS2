import React, { useState, useCallback, useEffect } from "react";
import { useWeather } from "./hooks/useWeather";
import WeatherWidget from "./components/WeatherWidget";
import Auth from "./components/Auth";
import { useAuth } from "./hooks/useAuth";
import SeleccionarPreferencias from "./components/SeleccionarPreferencias";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Recomendacion from "./components/Recomendacion";
import { actividades } from "./activities";

interface Preferencia {
  id_preferencia: number;
  nombre: string;
}

const App: React.FC = () => {
  const { user, logout } = useAuth();
  const [verPreferencias, setVerPreferencias] = useState<boolean | null>(null);
  const [cargandoPantalla, setCargandoPantalla] = useState(true);

  const [locationQuery, setLocationQuery] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState("");
  const [geoError, setGeoError] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);

  const [preferenciasUsuario, setPreferenciasUsuario] = useState<number[]>([]);
  const [nombresPreferencias, setNombresPreferencias] = useState<string[]>([]);

  const {
    condiciones,
    isLoading: loadingWeather,
    error: weatherError,
  } = useWeather(locationQuery);

  useEffect(() => {
    const fetchPreferenciasUsuario = async () => {
      if (!user) return;

      try {
        const response = await axios.post("http://localhost:8000", {
          route: "/obtener-preferencias-usuario",
          username: user,
        });

        if (Array.isArray(response.data) && response.data.length > 0) {
          const ids = response.data.map(
            (pref: { id_preferencia: number }) => pref.id_preferencia
          );
          setPreferenciasUsuario(ids);

          const todasPreferencias = await axios.get(
            "http://localhost:8000/preferencias"
          );

          const nombres = todasPreferencias.data
            .filter((pref: Preferencia) => ids.includes(pref.id_preferencia))
            .map((pref: Preferencia) => pref.nombre);

          setNombresPreferencias(nombres);
          setVerPreferencias(false);
        } else {
          setVerPreferencias(true);
        }
      } catch (error) {
        console.error("Error al consultar preferencias:", error);
        setVerPreferencias(true);
      } finally {
        setCargandoPantalla(false);
      }
    };

    fetchPreferenciasUsuario();
  }, [user]);

  const handleDetectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError("Tu navegador no soporta geolocalización.");
      return;
    }

    setDetecting(true);
    setGeoError(null);
    setLocationQuery(null);

    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setLocationQuery(`${latitude},${longitude}`);
        setDetecting(false);
      },
      (error) => {
        let msg = "No se pudo obtener la ubicación.";
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = "Permiso de ubicación denegado.";
            break;
          case error.POSITION_UNAVAILABLE:
            msg = "Posición no disponible.";
            break;
          case error.TIMEOUT:
            msg = "Se agotó el tiempo de espera.";
            break;
        }
        setGeoError(msg);
        setDetecting(false);
      }
    );
  }, []);

  const handleSubmitCity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (manualInput.trim()) {
      setLocationQuery(manualInput.trim());
      setGeoError(null);
    }
  };

  if (!user) {
    return <Auth onAuthSuccess={() => window.location.reload()} />;
  }

  if (cargandoPantalla || verPreferencias === null) {
    return (
      <div className="h-screen flex items-center justify-center bg-white">
        <p className="text-gray-500">Cargando…</p>
      </div>
    );
  }

  const actividadesRecomendadas = condiciones
    ? actividades.filter((actividad) => {
        const { temperatura, viento, lluvia, indiceUV } = condiciones;

        const cumpleClima =
          temperatura >= actividad.temperatura.min &&
          temperatura <= actividad.temperatura.max &&
          viento <= actividad.vientoMax &&
          (!lluvia || actividad.lluviaPermitida) &&
          indiceUV <= actividad.indiceUVMax;

        const tienePreferencia = actividad.etiquetas.some((id) =>
          preferenciasUsuario.includes(id)
        );

        return cumpleClima && tienePreferencia;
      })
    : [];
  const storedUser = JSON.parse(localStorage.getItem("user") || "null");
  return (
    <AnimatePresence mode="wait">
      {verPreferencias ? (
        <motion.div
          key="preferencias"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-screen"
        >
          <SeleccionarPreferencias
            onContinue={() => setVerPreferencias(false)}
          />
        </motion.div>
      ) : (
        <motion.div
          key="principal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="h-screen flex flex-col"
        >
          {/* Barra superior */}
          <header className="w-full h-32 bg-blue-500 shadow-md flex items-center justify-center relative">
            <div
              onClick={() => window.location.reload()}
              className="flex items-center gap-4 cursor-pointer hover:scale-105 transition-transform"
            >
              <img
                src="public/assets/logo.png"
                alt="Logo"
                className="h-16 w-16 object-contain rounded-full"
              />
              <h1 className="text-3xl font-bold text-white">Climátika</h1>
            </div>
            <button
              onClick={logout}
              className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white font-semibold text-lg bg-transparent border-2 border-white rounded-xl px-6 py-2 hover:bg-white hover:text-blue-500 transition-all duration-300 ease-in-out shadow-md"
            >
              Salir
            </button>
            {condiciones && (
              <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
                <WeatherWidget condiciones={condiciones} />
              </div>
            )}
          </header>

          {/* Contenido */}
          <main className="flex flex-1 overflow-hidden">
            <aside className="w-64 bg-blue-100 p-4 overflow-y-auto border-r border-blue-300">
              <h2 className="text-xl font-bold text-blue-900 mb-4">
                ¡Bienvenido, {storedUser}!
              </h2>
              <h3 className="font-semibold text-lg text-blue-800 mb-3">
                Tus preferencias
              </h3>
              <ul className="text-base text-blue-700 list-disc pl-5 space-y-1">
                {nombresPreferencias.map((nombre) => (
                  <li key={nombre}>{nombre}</li>
                ))}
              </ul>
            </aside>

            <section className="flex-1 p-6 overflow-y-auto bg-blue-50">
              {/* Selector de ubicación */}
              <div className="p-4 border border-blue-300 rounded-xl bg-blue-100 mt-6 shadow-sm">
                <h2 className="text-xl font-semibold mb-4 text-blue-800">
                  Elige tu ubicación
                </h2>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    onClick={handleDetectLocation}
                    disabled={detecting}
                    className="flex-1 bg-blue-500 hover:bg-blue-300 text-white font-semibold py-2 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {detecting ? "Detectando…" : "Detectar mi ubicación"}
                  </button>

                  <form onSubmit={handleSubmitCity} className="flex flex-1">
                    <input
                      type="text"
                      value={manualInput}
                      onChange={(e) => setManualInput(e.target.value)}
                      placeholder="Escribe ciudad o lat,lon"
                      className="flex-grow p-2 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                    />
                    <button
                      type="submit"
                      className="bg-blue-500 hover:bg-blue-300 text-white font-semibold px-4 rounded-r-xl"
                    >
                      Buscar
                    </button>
                  </form>
                </div>

                {geoError && (
                  <p className="text-red-600 mt-2 text-sm">{geoError}</p>
                )}
                {locationQuery && !detecting && (
                  <p className="text-gray-600 mt-2 text-sm">
                    Mostrando clima para&nbsp;
                    {locationQuery.includes(",")
                      ? "ubicación detectada"
                      : locationQuery}
                  </p>
                )}
              </div>

              {/* Estado de carga o error */}
              {locationQuery && loadingWeather && (
                <p className="text-center text-gray-600 mt-4">
                  Cargando clima…
                </p>
              )}
              {locationQuery && weatherError && (
                <p className="text-center text-red-600 mt-4">
                  Error al cargar clima: {weatherError}
                </p>
              )}

              {/* Recomendaciones */}
              {condiciones && (
                <>
                  <h2 className="text-xl font-semibold mt-10 mb-4 text-blue-800">
                    Recomendaciones para hoy
                  </h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {actividadesRecomendadas.length > 0 ? (
                      actividadesRecomendadas.map((actividad) => (
                        <Recomendacion
                          key={actividad.nombre}
                          actividad={actividad}
                          condiciones={condiciones}
                        />
                      ))
                    ) : (
                      <p className="text-gray-600 text-sm col-span-full">
                        No hay actividades recomendadas con las condiciones
                        actuales.
                      </p>
                    )}
                  </div>
                </>
              )}
            </section>
          </main>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default App;
