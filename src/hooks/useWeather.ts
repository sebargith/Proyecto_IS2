import { useEffect, useState } from 'react';
import { APIResponse, current } from '../weather'; // Ajusta la ruta si es necesario

export interface CondicionesClimaticas {
  ciudad: string,
  temperatura: number;   // °C
  viento: number;        // km/h
  lluvia: boolean;       // ¿hay precipitación?
  indiceUV: number;
}

// Este hook se encarga de obtener el clima actual de una ciudad
// Puede ser null inicialmente o si hay un error obteniendo la ubicación.
export function useWeather(locationQuery: string | null) {
  const [cond, setCond] = useState<CondicionesClimaticas | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false); // Estado de carga
  const [error, setError] = useState<string | null>(null);     // Estado de error

  useEffect(() => {
    // Solo intentar buscar si tenemos una locationQuery válida
    if (locationQuery) {
      const fetchWeather = async () => {
        setIsLoading(true); // Inicia la carga
        setError(null);     // Limpia errores anteriores
        setCond(null);      // Limpia condiciones anteriores mientras carga
        try {
          // Pasamos la locationQuery a la función 'current'
          const apiresponse: APIResponse = await current(locationQuery);
          const curr = apiresponse.current
          const location = apiresponse.location
          setCond({
            ciudad: location.name,
            temperatura: curr.temp_c,
            viento: curr.wind_kph,
            lluvia: curr.precip_mm > 0,
            indiceUV: curr.uv,
          });
        } catch (e) {
          console.error('Fallo al obtener clima:', e);
          setError(e instanceof Error ? e.message : 'Ocurrió un error desconocido al obtener el clima');
        } finally {
          setIsLoading(false); // Termina la carga (éxito o error)
        }
      };

      fetchWeather();
    } else {
      // Si no hay locationQuery, reseteamos el estado
      setCond(null);
      setIsLoading(false);
      setError(null);
    }
    // Agregamos locationQuery como dependencia.
    // Cada vez que cambie, el useEffect se volverá a ejecutar.
  }, [locationQuery]);

  // Devolvemos también el estado de carga y error para usar en la UI
  return { condiciones: cond, isLoading, error };
}
