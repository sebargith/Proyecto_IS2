// App.tsx
import React, { useState, useCallback } from 'react';
import profiles, { Profile } from './profiles';
import Recomendacion from './recomendations';

import { useWeather } from './hooks/useWeather';
import WeatherWidget from './components/WeatherWidget';

const App: React.FC = () => {
  const [selectedProfiles, setSelectedProfiles] = useState<Profile[]>([]);
  const [locationQuery, setLocationQuery] = useState<string | null>(null);
  const [manualLocationInput, setManualLocationInput] = useState<string>('');
  const [geoError, setGeoError] = useState<string | null>(null);
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);

  const { condiciones, isLoading: isLoadingWeather, error: weatherError } = useWeather(locationQuery);

  const handleProfileToggle = (profile: Profile) => {
    setSelectedProfiles(prev =>
      prev.includes(profile)
        ? prev.filter(p => p.id !== profile.id)
        : [...prev, profile]
    );
  };

  const handleDetectLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setGeoError('Tu navegador no soporta geolocalización.');
      return;
    }

    setIsDetectingLocation(true);
    setGeoError(null);
    setLocationQuery(null);

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocationQuery(`${latitude},${longitude}`);
        setIsDetectingLocation(false);
      },
      (error) => {
        console.error("Error de Geolocalización:", error);
        let message = 'No se pudo obtener la ubicación.';
        switch (error.code) {
          case error.PERMISSION_DENIED:
            message = "Permiso de ubicación denegado.";
            break;
          case error.POSITION_UNAVAILABLE:
            message = "Información de ubicación no disponible.";
            break;
          case error.TIMEOUT:
            message = "Se agotó el tiempo de espera para obtener la ubicación.";
            break;
        }
        setGeoError(message);
        setIsDetectingLocation(false);
      }
    );
  }, []);

  const handleManualLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setManualLocationInput(event.target.value);
  };

  const handleManualLocationSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (manualLocationInput.trim()) {
      setLocationQuery(manualLocationInput.trim());
      setGeoError(null);
    }
  };

  return (
    <>
      {condiciones && <WeatherWidget condiciones={condiciones} />}

      <div className="w-[800px] mx-auto p-4 bg-gray-100 shadow-lg rounded-lg">
        <div className="mb-6 p-4 border border-gray-300 rounded-md bg-white">
          <h2 className="text-lg font-semibold mb-3 text-gray-700">Elige tu ubicación</h2>
          <div className="flex flex-col sm:flex-row gap-4 items-start">
            <button
              onClick={handleDetectLocation}
              disabled={isDetectingLocation}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
            >
              {isDetectingLocation ? 'Detectando...' : 'Detectar Mi Ubicación'}
            </button>

            <span className="hidden sm:inline self-center text-gray-500 mx-2">ó</span>

            <form onSubmit={handleManualLocationSubmit} className="flex flex-grow w-full sm:w-auto">
              <input
                type="text"
                value={manualLocationInput}
                onChange={handleManualLocationChange}
                placeholder="Escribe una ciudad (ej: Santiago)"
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
          {locationQuery && !isDetectingLocation && (
            <p className="text-gray-600 mt-2 text-sm">Mostrando clima para: <span className="font-medium">{locationQuery.includes(',') ? 'Ubicación detectada' : locationQuery}</span></p>
          )}
        </div>

        {locationQuery && (
          <>
            {isLoadingWeather && <p className="text-center text-gray-600 my-4">Cargando clima...</p>}
            {weatherError && <p className="text-center text-red-600 my-4">Error al cargar clima: {weatherError}</p>}

            {condiciones && !weatherError && (
              <div className="bg-white p-4 rounded-md shadow">
                <div className="mb-4">
                  <h3 className="text-md font-semibold mb-2 text-gray-800">Selecciona Perfiles:</h3>
                  {profiles.map(profile => (
                    <label key={profile.id} className="flex items-center mb-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedProfiles.includes(profile)}
                        onChange={() => handleProfileToggle(profile)}
                        className="mr-2 h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-gray-700">{profile.name}</span>
                    </label>
                  ))}
                </div>

                {selectedProfiles.length > 0 && (
                  <div>
                    <h3 className="text-lg font-semibold mb-3 text-gray-800 border-t pt-4 mt-4">Recomendaciones:</h3>
                    {selectedProfiles.map(profile => (
                      <div key={profile.id} className="mb-4">
                        <h4 className="text-md font-medium text-gray-700 mb-2">{profile.name}</h4>
                        {profile.activities.length > 0 ? (
                          <div className="space-y-3">
                            {profile.activities.map((actividad, idx) => (
                              <Recomendacion
                                key={`${profile.id}-${idx}`}
                                actividad={actividad}
                                condiciones={condiciones}
                              />
                            ))}
                          </div>
                        ) : (
                          <p className="text-gray-600 text-sm">No hay actividades sugeridas para este perfil.</p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </>
        )}

        {!locationQuery && !isDetectingLocation && (
          <p className="text-center text-gray-500 mt-6">
            Por favor, detecta tu ubicación o busca una ciudad para ver las recomendaciones.
          </p>
        )}
      </div>
    </>
  );
};

export default App;
