import React, { useState, useCallback } from "react";
import profiles, { Profile } from "./profiles";
import Recomendacion from "./components/Recomendacion";
import ProfileSelect from "./components/ProfileSelect";
import { useWeather } from "./hooks/useWeather";
import WeatherWidget from "./components/WeatherWidget";
import Auth from "./components/Auth";
import { useAuth } from "./hooks/useAuth";   // ← añadido

const LABELS = [
  "Preferencia 1",
  "Preferencia 2",
  "Preferencia 3",
  "Preferencia 4",
];

const App: React.FC = () => {
  /* -------- autenticación -------- */
  const { user, logout } = useAuth();        // ← reemplaza estado local

  /* -------- estado clima y UI ----- */
  const [locationQuery, setLocationQuery] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState("");
  const [geoError, setGeoError] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);

  const {
    condiciones,
    isLoading: loadingWeather,
    error: weatherError,
  } = useWeather(locationQuery);

  const [slots, setSlots] = useState<string[]>(["", "", "", ""]);

  const handleSlotChange = (index: number, newId: string) =>
    setSlots((prev) => {
      const next = [...prev];
      next[index] = newId;
      return next;
    });

  const perfilesElegidos: Profile[] = Array.from(
    new Set(
      slots
        .filter(Boolean)
        .map((id) => profiles.find((p) => p.id.toString() === id)!)
    )
  );

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

  /* ---------- si no hay usuario, mostrar Auth -------- */
  if (!user) {
    return <Auth onAuthSuccess={() => window.location.reload()} />;
  }

  /* ---------- UI principal (igual que antes) ---------- */
  return (
    <div className="h-screen flex flex-col">
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

        {/* Botón salir */}
        <button
          onClick={logout}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 text-white underline"
        >
          Salir
        </button>

        {condiciones && (
          <div className="absolute right-6 top-1/2 transform -translate-y-1/2">
            <WeatherWidget condiciones={condiciones} />
          </div>
        )}
      </header>

      {/* Contenedor principal */}
      <main className="flex flex-1 overflow-hidden">
        {/* Sidebar izquierda */}
        <aside className="w-64 bg-blue-100 p-4 overflow-y-auto border-r border-blue-300">
          <h2 className="text-lg font-semibold mb-4 text-blue-900">
            Selecciona Perfiles
          </h2>
          <div className="space-y-4">
            {LABELS.map((lbl, idx) => (
              <ProfileSelect
                key={idx}
                label={lbl}
                perfiles={profiles}
                value={slots[idx]}
                onChange={(val) => handleSlotChange(idx, val)}
              />
            ))}
          </div>
        </aside>

        {/* Contenido principal */}
        <section className="flex-1 p-6 overflow-y-auto bg-blue-50">
          {/* Tarjeta ubicación */}
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

          {/* Mensajes de estado */}
          {locationQuery && loadingWeather && (
            <p className="text-center text-gray-600 mt-4">Cargando clima…</p>
          )}
          {locationQuery && weatherError && (
            <p className="text-center text-red-600 mt-4">
              Error al cargar clima: {weatherError}
            </p>
          )}

          {/* Recomendaciones */}
          {condiciones &&
            perfilesElegidos.length > 0 &&
            perfilesElegidos.map((profile) => (
              <div key={profile.id} className="mt-8 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800">
                  {profile.name}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {profile.activities
                    .filter((actividad) => {
                      const esAdecuada =
                        condiciones.temperatura >=
                          actividad.temperatura.min &&
                        condiciones.temperatura <=
                          actividad.temperatura.max &&
                        condiciones.viento <= actividad.vientoMax &&
                        (!condiciones.lluvia || actividad.lluviaPermitida) &&
                        condiciones.indiceUV <= actividad.indiceUVMax;

                      return esAdecuada;
                    })
                    .map((actividad, i) => (
                      <Recomendacion
                        key={`${profile.id}-${i}`}
                        actividad={actividad}
                        condiciones={condiciones}
                      />
                    ))}
                </div>
              </div>
            ))}

          {condiciones && perfilesElegidos.length === 0 && (
            <p className="text-center text-gray-600 mt-6">
              Selecciona al menos un perfil en la columna izquierda.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default App;
