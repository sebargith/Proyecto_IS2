import React from 'react';
import { CondicionesClimaticas } from '../hooks/useWeather';

interface Props {
  condiciones: CondicionesClimaticas;
}

const WeatherWidget: React.FC<Props> = ({ condiciones }) => {
  const { ciudad, temperatura, viento, lluvia, indiceUV } = condiciones;

  return (
    <div className="fixed top-4 right-4 w-56 p-4 rounded-xl shadow-lg bg-sky-50 border border-sky-200">
      <h3 className="text-lg font-semibold text-sky-700 mb-2">Clima actual en {ciudad}</h3>

      <ul className="space-y-1 text-sm text-gray-800">
        <li>🌡️ Temperatura: <strong>{temperatura} °C</strong></li>
        <li>💨 Viento: <strong>{viento} km/h</strong></li>
        <li>{lluvia ? '🌧️ Llueve' : '☀️ Sin lluvia'}</li>
        <li>🔆 Índice UV: <strong>{indiceUV}</strong></li>
      </ul>
    </div>
  );
};

export default WeatherWidget;
