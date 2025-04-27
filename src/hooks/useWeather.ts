import { useEffect, useState } from 'react';
import { current, Realtime } from '../weather';

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
        const { temp_c, wind_kph, precip_mm, uv, }: Realtime = await current();           // ya existente
        setCond({
          temperatura: temp_c,
          viento: wind_kph,
          lluvia: precip_mm > 0,
          indiceUV: uv,
        });
      } catch (e) {
        console.error('Fallo al obtener clima:', e);
      }
    })();
  }, []);

  return cond;           // null mientras carga
}
