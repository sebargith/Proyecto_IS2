// App.tsx
import React, { useState } from 'react';
import profiles, { Profile } from './profiles';
import Recomendacion from './recomendations';

import { useWeather } from './hooks/useWeather';
import WeatherWidget from './components/WeatherWidget';

const App: React.FC = () => {
  const [selectedProfiles, setSelectedProfiles] = useState<Profile[]>([]);
  const condiciones = useWeather();       // nuevo hook

  const handleProfileToggle = (profile: Profile) => {
    setSelectedProfiles(prev =>
      prev.includes(profile)
        ? prev.filter(p => p.id !== profile.id)
        : [...prev, profile]
    );
  };

  return (
    <>
      {/* Widget fijo arriba-derecha */}
      {condiciones && <WeatherWidget condiciones={condiciones} />}

      {/* Contenedor principal */}
      <div className="w-[800px] mx-auto p-4 bg-white shadow-lg">
        {/* Checklist de perfiles */}
        <div className="mb-4">
          {profiles.map(profile => (
            <label key={profile.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                checked={selectedProfiles.includes(profile)}
                onChange={() => handleProfileToggle(profile)}
                className="mr-2"
              />
              <span className="text-gray-700">{profile.name}</span>
            </label>
          ))}
        </div>

        {/* Recomendaciones */}
        {condiciones && selectedProfiles.length > 0 && (
          <div>
            {selectedProfiles.map(profile => (
              <div key={profile.id} className="mb-4">
                <h3 className="text-md font-medium text-gray-800 mb-2">{profile.name}</h3>

                {profile.activities.length > 0 ? (
                  <div className="space-y-2">
                    {profile.activities.map((actividad, idx) => (
                      <Recomendacion
                        key={`${profile.id}-${idx}`}
                        actividad={actividad}
                        condiciones={condiciones}   // ahora viene del hook
                      />
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-600">No hay actividades para este perfil.</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default App;
