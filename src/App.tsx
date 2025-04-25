// App.tsx
import React, { useState, useEffect } from 'react';
import profiles, { Profile } from './profiles';
import Recomendacion from './recomendations';
import { getData, APIResponse } from './get';

interface CondicionesClimaticas {
  temperatura: number;
  viento: number;
  lluvia: boolean;
  indiceUV: number;
}

const App: React.FC = () => {
  const [selectedProfiles, setSelectedProfiles] = useState<Profile[]>([]);
  const [condiciones, setCondiciones] = useState<CondicionesClimaticas | null>(null);

  useEffect(() => {
    const fetchClima = async () => {
      try {
        const data: APIResponse = await getData();
        setCondiciones({
          temperatura: data.current.temp_c,
          viento: data.current.wind_kph,
          lluvia: data.current.precip_mm > 0,
          indiceUV: data.current.uv,
        });
      } catch (err) {
        console.error('Error al obtener datos climáticos:', err);
      }
    };
    fetchClima();
  }, []);

  const handleProfileToggle = (profile: Profile) => {
    setSelectedProfiles((prev) =>
      prev.includes(profile)
        ? prev.filter((p) => p.id !== profile.id)
        : [...prev, profile]
    );
  };

  return (
    <div className="w-[800px] mx-auto p-4 bg-white shadow-lg">
      {/* Checklist de Perfiles */}
      <div className="mb-4">
        {profiles.map((profile) => (
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
      {selectedProfiles.length > 0 && condiciones && (
        <div>
          {selectedProfiles.map((profile) => (
            <div key={profile.id} className="mb-4">
              <h3 className="text-md font-medium text-gray-800 mb-2">{profile.name}</h3>
              {profile.activities.length > 0 ? (
                <div className="space-y-2">
                  {profile.activities.map((actividad, index) => (
                    <Recomendacion
                      key={`${profile.id}-${index}`}
                      actividad={actividad}
                      condiciones={condiciones}
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
  );
};

export default App;