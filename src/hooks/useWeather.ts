import { useEffect, useState } from 'react';
import { getData, APIResponse } from '../get';

export interface CondicionesClimaticas {
  temperatura: number;   // °C
  viento: number;        // km/h
  lluvia: boolean;       // ¿precipitación?
  indiceUV: number;
}

export function useWeather() {
  const [cond, setCond] = useState<CondicionesClimaticas | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const data: APIResponse = await getData();           // ya existente
        setCond({
          temperatura: data.current.temp_c,
          viento: data.current.wind_kph,
          lluvia: data.current.precip_mm > 0,
          indiceUV: data.current.uv,
        });
      } catch (e) {
        console.error('Fallo al obtener clima:', e);
      }
    })();
  }, []);

  return cond;           // null mientras carga
}
