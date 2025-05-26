import React, { useState, useCallback } from 'react';
import profiles, { Profile } from './profiles';
import Recomendacion from './components/Recomendacion';     

import ProfileSelect from './components/ProfileSelect';
import { useWeather } from './hooks/useWeather';
import WeatherWidget from './components/WeatherWidget';
import Auth from './components/Auth'; // <--- Agrega esta línea

// Etiquetas de listas desplegables
const LABELS = ['Preferencia 1', 'Preferencia 2', 'Preferencia 3', 'Preferencia 4'];

const App: React.FC = () => {
  // Nuevo estado para autenticación
  const [authed, setAuthed] = useState(false);

  const [locationQuery, setLocationQuery] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState('');
  const [geoError, setGeoError] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);

  const { condiciones, isLoading: loadingWeather, error: weatherError } =
    useWeather(locationQuery);

  const [slots, setSlots] = useState<string[]>(['', '', '', '']);

  const handleSlotChange = (index: number, newId: string) =>
    setSlots(prev => {
      const next = [...prev];
      next[index] = newId;
      return next;
    });

  const perfilesElegidos: Profile[] = Array.from(
    new Set(
      slots
        .filter(Boolean)
        .map(id => profiles.find(p => p.id.toString() === id)!)
    )
  );

  const handleDetectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError('Tu navegador no soporta geolocalización.');
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
      error => {
        let msg = 'No se pudo obtener la ubicación.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            msg = 'Permiso de ubicación denegado.';
            break;
          case error.POSITION_UNAVAILABLE:
            msg = 'Posición no disponible.';
            break;
          case error.TIMEOUT:
            msg = 'Se agotó el tiempo de espera.';
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

  const bgColor = 'bg-gradient-to-br from-blue-400 via-yellow-300 to-yellow-100';

  // Si no está autenticado, muestra Auth
  if (!authed) {
    return <Auth onAuthSuccess={() => setAuthed(true)} />;
  }

  return (
    <div className={`min-h-screen ${bgColor} p-6`}>
      <div className="max-w-4xl mx-auto bg-white shadow-2xl rounded-3xl p-6 space-y-6">
        {/* Widget clima */}
        {condiciones && <WeatherWidget condiciones={condiciones} />}

        {/* Tarjeta ubicación */}
        <div className="p-4 border border-gray-300 rounded-xl bg-gray-50">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">Elige tu ubicación</h2>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={handleDetectLocation}
              disabled={detecting}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {detecting ? 'Detectando…' : 'Detectar Mi Ubicación'}
            </button>

            <form onSubmit={handleSubmitCity} className="flex flex-1">
              <input
                type="text"
                value={manualInput}
                onChange={e => setManualInput(e.target.value)}
                placeholder="Escribe ciudad o lat,lon"
                className="flex-grow p-2 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 rounded-r-xl"
              >
                Buscar
              </button>
            </form>
          </div>

          {geoError && <p className="text-red-600 mt-2 text-sm">{geoError}</p>}
          {locationQuery && !detecting && (
            <p className="text-gray-600 mt-2 text-sm">
              Mostrando clima para&nbsp;
              {locationQuery.includes(',') ? 'ubicación detectada' : locationQuery}
            </p>
          )}
        </div>

        {/* Listas desplegables */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {LABELS.map((lbl, idx) => (
            <ProfileSelect
              key={idx}
              label={lbl}
              perfiles={profiles}
              value={slots[idx]}
              onChange={val => handleSlotChange(idx, val)}
            />
          ))}
        </div>

        {/* Mensajes de estado */}
        {locationQuery && loadingWeather && (
          <p className="text-center text-gray-600">Cargando clima…</p>
        )}
        {locationQuery && weatherError && (
          <p className="text-center text-red-600">Error al cargar clima: {weatherError}</p>
        )}

        {/* Recomendaciones */}
        {condiciones && perfilesElegidos.length > 0 && (
          perfilesElegidos.map(profile => (
            <div key={profile.id} className="space-y-2">
              <h3 className="text-lg font-semibold text-gray-800">{profile.name}</h3>
              
              {/* filas de 3 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {profile.activities
                  .filter(actividad => {
                    const esAdecuada =
                      condiciones.temperatura >= actividad.temperatura.min &&
                      condiciones.temperatura <= actividad.temperatura.max &&
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
          ))
        )}

        {condiciones && perfilesElegidos.length === 0 && (
          <p className="text-center text-gray-600">
            Selecciona al menos un perfil en las listas de arriba.
          </p>
        )}
      </div>
    </div>
  );
};

export default App;
