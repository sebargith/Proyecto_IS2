import React, { useState, useCallback } from 'react';
import profiles, { Profile } from './profiles';
import Recomendacion from './recomendations';

import ProfileSelect from './components/ProfileSelect';
import { useWeather } from './hooks/useWeather';
import WeatherWidget from './components/WeatherWidget';

// Etiquetas de listas despleglables
const LABELS = ['Preferencia 1', 'Preferencia 2', 'Preferencia 3', 'Preferencia 4'];

const App: React.FC = () => {
  // Estado de ubicación
  const [locationQuery, setLocationQuery] = useState<string | null>(null);
  const [manualInput, setManualInput] = useState('');
  const [geoError, setGeoError] = useState<string | null>(null);
  const [detecting, setDetecting] = useState(false);

  // hook del clima
  const { condiciones, isLoading: loadingWeather, error: weatherError } =
    useWeather(locationQuery);

  // Estado de perfiles
  const [slots, setSlots] = useState<string[]>(['', '', '', '']);

  const handleSlotChange = (index: number, newId: string) =>
    setSlots(prev => {
      const next = [...prev];
      next[index] = newId;
      return next;
    });

  // Perfiles únicos seleccionados
  const perfilesElegidos: Profile[] = Array.from(
    new Set(
      slots
        .filter(Boolean) // quita strings vacíos
        .map(id => profiles.find(p => p.id.toString() === id)!)
    )
  );

  // Geolocalización
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

  // Poner localización manualmente
  const handleSubmitCity = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (manualInput.trim()) {
      setLocationQuery(manualInput.trim());
      setGeoError(null);
    }
  };

  return (
    <>
      {/* Widget de clima*/}
      {condiciones && <WeatherWidget condiciones={condiciones} />}

      <div className="w-[800px] mx-auto p-4 bg-gray-100 shadow-lg rounded-lg">
        {/*Tarjeta de ubicación */}
        <div className="mb-6 p-4 border border-gray-300 rounded-md bg-white">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Elige tu ubicación</h2>

          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <button
              onClick={handleDetectLocation}
              disabled={detecting}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {detecting ? 'Detectando…' : 'Detectar Mi Ubicación'}
            </button>

            <span className="hidden sm:inline self-center text-gray-500 mx-2">o</span>

            <form onSubmit={handleSubmitCity} className="flex flex-grow w-full sm:w-auto">
              <input
                type="text"
                value={manualInput}
                onChange={e => setManualInput(e.target.value)}
                placeholder="Escribe ciudad o lat,lon"
                className="flex-grow p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-r-md"
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

        {/* Cuatro listas desplegables en una fila */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 place-items-center">
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

        {/*Mensajes de carga / error del clima */}
        {locationQuery && loadingWeather && (
          <p className="text-center text-gray-600 my-4">Cargando clima…</p>
        )}
        {locationQuery && weatherError && (
          <p className="text-center text-red-600 my-4">Error al cargar clima: {weatherError}</p>
        )}

        {/*Recomendaciones */}
        {condiciones && perfilesElegidos.length > 0 && (
          perfilesElegidos.map(profile => (
            <div key={profile.id} className="mb-6">
              <h3 className="text-md font-medium text-gray-800 mb-2">{profile.name}</h3>

              <div className="space-y-2">
                {profile.activities
                  .filter(actividad => {
                    // Evaluar si la actividad cumple con las condiciones climáticas
                    const esAdecuada =
                      condiciones.temperatura >= actividad.temperatura.min &&
                      condiciones.temperatura <= actividad.temperatura.max &&
                      condiciones.viento <= actividad.vientoMax &&
                      (!condiciones.lluvia || actividad.lluviaPermitida) &&
                      condiciones.indiceUV <= actividad.indiceUVMax;

                    return esAdecuada; // Solo incluir actividades adecuadas
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
          <p className="text-center text-gray-600 mt-4">
            Selecciona al menos un perfil en las listas de arriba.
          </p>
        )}
      </div>
    </>
  );
};

export default App;
