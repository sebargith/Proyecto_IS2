import React, { useState, useCallback, useEffect } from "react";
import { useWeather } from "./hooks/useWeather";
import WeatherWidget from "./components/WeatherWidget";
import Auth from "./components/Auth";
import { useAuth } from "./hooks/useAuth";
import SeleccionarPreferencias from "./components/SeleccionarPreferencias";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import Recomendacion from "./components/Recomendacion";
import { actividades, Actividad } from "./activities";

interface Preferencia {
  id_preferencia: number;
  nombre: string;
}

const App: React.FC = () => {
  const { user, logout } = useAuth();
  const [verPreferencias, setVerPreferencias] = useState<boolean | null>(null);
  const [cargandoPantalla, setCargandoPantalla] = useState(true);
  const [showPrefs, setShowPrefs] = useState(false);
  const [locationQuery, setLocationQuery] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState("");
  const [geoError, setGeoError] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);
  const [activeTab, setActiveTab] = useState<"recomendadas" | "ia">(
    "recomendadas"
  );

  const [preferenciasUsuario, setPreferenciasUsuario] = useState<number[]>([]);
  const [nombresPreferencias, setNombresPreferencias] = useState<string[]>([]);

  const {
    condiciones,
    isLoading: loadingWeather,
    error: weatherError,
  } = useWeather(locationQuery);

  const fetchPreferenciasUsuario = useCallback(async () => {
    if (!user) return;
    setCargandoPantalla(true);
    const start = Date.now();
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
      const elapsed = Date.now() - start;
      const minDelay = 600; // milisegundos
      if (elapsed < minDelay) {
        setTimeout(() => setCargandoPantalla(false), minDelay - elapsed);
      } else {
        setCargandoPantalla(false);
      }
    }
  }, [user]);

  useEffect(() => {
    fetchPreferenciasUsuario();
  }, [user, fetchPreferenciasUsuario]);

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
      <AnimatePresence>
        <motion.div
          key="loading"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="h-screen flex items-center justify-center bg-white"
        >
          <motion.div
            className="w-12 h-12 border-4 border-blue-400 border-t-transparent rounded-full animate-spin"
            aria-label="Cargando"
            initial={{ scale: 0.8, opacity: 0.5 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, type: "spring" }}
          />
          <p className="text-gray-500 ml-6 text-xl font-semibold">Cargando…</p>
        </motion.div>
      </AnimatePresence>
    );
  }
  const handleLogout = () => {
    setCargandoPantalla(true);
    setTimeout(() => {
      logout();
      setCargandoPantalla(false);
    }, 700);
  };

  const calcularPuntaje = (actividad: Actividad) => {
   let puntaje = 0;
   actividad.etiquetas.forEach((id) => {
     const idx = preferenciasUsuario.indexOf(id);
     if (idx === 0) puntaje += 0.5;
     else if (idx === 1) puntaje += 0.3;
     else if (idx === 2) puntaje += 0.2;
    });
    return puntaje;
   };
  const actividadesRecomendadas = condiciones
    ? actividades
        .filter((actividad) => {
          const { temperatura, viento, lluvia, indiceUV, ciudad } = condiciones;

          const cumpleClima =
            temperatura >= actividad.temperatura.min &&
            temperatura <= actividad.temperatura.max &&
            viento <= actividad.vientoMax &&
            (!lluvia || actividad.lluviaPermitida) &&
            indiceUV <= actividad.indiceUVMax;

          const tienePreferencia = actividad.etiquetas.some((id) =>
            preferenciasUsuario.includes(id)
          );

          // Validación de ciudad ignora tildes y mayúsculas
          const normalize = (str: string) =>
            str
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");

          const ciudadValida =
            actividad.ciudad === "" ||
            normalize(actividad.ciudad) === normalize(ciudad);

          return cumpleClima && tienePreferencia && ciudadValida;
        })
        // Ordenar por cantidad de coincidencias de etiquetas
        .sort((a, b) => calcularPuntaje(b) - calcularPuntaje(a))
    : [];

  const moverPreferencia = (from: number, to: number) => {
    setNombresPreferencias((prev) => {
      const newPrefs = [...prev];
      const [moved] = newPrefs.splice(from, 1);
      newPrefs.splice(to, 0, moved);
      return newPrefs;
    });
    setPreferenciasUsuario((prev) => {
      const newOrder = [...prev];
      const [moved] = newOrder.splice(from, 1);
      newOrder.splice(to, 0, moved);
      return newOrder;
    });
  };  
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
          <SeleccionarPreferencias onContinue={fetchPreferenciasUsuario} />
        </motion.div>
      ) : (
        <motion.div
          key="principal"
          initial={{ opacity: 0, scale: 0.98, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 40 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="h-screen flex flex-col bg-gradient-to-br from-sky-100 via-blue-100 to-blue-200"
        >
          {/* Barra superior */}
          <header className="w-full h-32 bg-gradient-to-r from-blue-500 via-sky-500 to-blue-400 shadow-lg flex items-center justify-center relative rounded-b-3xl">
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
              onClick={handleLogout}
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
            <aside className="w-64 bg-gradient-to-b from-blue-200 via-blue-100 to-sky-100 p-4 overflow-y-auto border-r-4 border-blue-300 shadow-xl rounded-tr-3xl rounded-br-3xl">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="flex flex-col items-center bg-white/80 rounded-2xl shadow-lg p-4 mb-6"
              >
                <img
                  src="https://ui-avatars.com/api/?name=Usuario&background=93c5fd&color=1e3a8a&rounded=true"
                  alt="Perfil"
                  className="w-16 h-16 rounded-full border-4 border-blue-200 shadow mb-2"
                />
                <span className="text-base font-semibold text-blue-900">
                  {storedUser}
                </span>
              </motion.div>
              <div className="mb-3">
                <div className="mb-3">
                  <motion.button
                    onClick={() => setShowPrefs((prev) => !prev)}
                    className="w-full flex justify-between items-center bg-blue-200 hover:bg-blue-300 text-blue-900 font-semibold py-2 px-4 rounded-xl transition shadow"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    Tus preferencias
                    <motion.span
                      animate={{ rotate: showPrefs ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="inline-block"
                    >
                      ▼
                    </motion.span>
                  </motion.button>
                  <AnimatePresence initial={false}>
                    {showPrefs && (
                      <motion.ul
                        key="prefs-list"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: "easeInOut" }}
                        className="mt-2 text-base text-blue-700 list-disc pl-5 space-y-1 bg-blue-50 rounded-xl p-2 shadow-inner overflow-hidden"
                      >
                        {nombresPreferencias.map((nombre, idx) => (
                          <li key={nombre} className="flex items-center justify-between">
                            <span>{nombre}</span>
                            <div className="flex gap-1 ml-2">
                              <button
                                onClick={() => moverPreferencia(idx, idx - 1)}
                                disabled={idx === 0}
                                className="text-blue-600 hover:text-blue-900 text-xs disabled:opacity-50"
                              >
                               ▲
                              </button>
                              <button
                                onClick={() => moverPreferencia(idx, idx + 1)}
                                disabled={idx === nombresPreferencias.length - 1}
                                className="text-blue-600 hover:text-blue-900 text-xs disabled:opacity-50"
                              >
                                ▼
                              </button>
                            </div>
                          </li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              {/* Botón para volver a seleccionar preferencias */}
              <button
                onClick={() => setVerPreferencias(true)}
                className="mt-2 w-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-500 hover:from-yellow-400 hover:to-yellow-300 text-yellow-900 font-semibold py-2 px-4 rounded-xl transition shadow-lg"
              >
                Cambiar preferencias
              </button>
              {/* Mapa de ubicación con Google Maps */}
              {locationQuery && (
                <div className="mt-6">
                  <h4 className="text-blue-800 font-semibold mb-2 text-base">
                    Ubicación
                  </h4>
                  <div className="rounded-xl overflow-hidden border border-blue-300 shadow">
                    <iframe
                      title="Tu ubicación"
                      width="100%"
                      height="180"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={
                        // Si es lat,lon, muestra el punto; si es texto, busca la ubicación
                        locationQuery.includes(",")
                          ? `https://www.google.com/maps?q=${locationQuery}&z=10&output=embed`
                          : `https://www.google.com/maps?q=${encodeURIComponent(
                              locationQuery
                            )}&z=14&output=embed`
                      }
                    />
                  </div>
                </div>
              )}
            </aside>

            <section className="flex-1 p-6 overflow-y-auto bg-white/70 rounded-3xl shadow-inner border border-blue-100 mt-6 mx-4">
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

                  <div className="flex gap-4 mt-8 mb-6">
                    <button
                      onClick={() => setActiveTab("recomendadas")}
                      className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all duration-300 shadow ${
                        activeTab === "recomendadas"
                          ? "bg-blue-500 text-white"
                          : "bg-blue-100 text-blue-900 hover:bg-blue-200"
                      }`}
                    >
                      Recomendaciones normales
                    </button>
                    <button
                      onClick={() => setActiveTab("ia")}
                      className={`flex-1 py-2 px-4 rounded-xl font-semibold transition-all duration-300 shadow ${
                        activeTab === "ia"
                          ? "bg-blue-500 text-white"
                          : "bg-blue-100 text-blue-900 hover:bg-blue-200"
                      }`}
                    >
                      Sugeridas por IA
                    </button>
                  </div>

                  {activeTab === "recomendadas" && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                      {actividadesRecomendadas.length > 0 ? (
                        actividadesRecomendadas.map((actividad) => (
                          <Recomendacion
                            key={actividad.nombre}
                            actividad={actividad}
                            condiciones={condiciones}
                            preferenciasUsuario={preferenciasUsuario}
                          />
                        ))
                      ) : (
                        <p className="text-gray-600 text-sm col-span-full">
                          No hay actividades recomendadas con las condiciones
                          actuales.
                        </p>
                      )}
                    </div>
                  )}
                  {activeTab === "ia" && (
                    <div>
                      {/* aqui van las actividdades recomendadas por ia */}
                    </div>
                  )}
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
