import React from "react";
import { CondicionesClimaticas } from "../hooks/useWeather";

interface Props {
  condiciones: CondicionesClimaticas;
}

const WeatherWidget: React.FC<Props> = ({ condiciones }) => {
  const { ciudad, temperatura, viento, lluvia, indiceUV } = condiciones;

  return (
    <div className="flex flex-col items-start bg-blue-100 px-4 py-2 rounded-xl shadow-md text-sm text-blue-900 border border-blue-300">
      <h3 className="font-semibold text-blue-800 mb-1 text-l">
        Clima actual en {ciudad}
      </h3>
      <div className="flex gap-3 flex-wrap">
        <span>🌡 {temperatura}°C</span>
        <span>💨 {viento} km/h</span>
        <span>{lluvia ? "🌧️ Llueve" : "☀️ Sin lluvia"}</span>
        <span>🔆 UV {indiceUV}</span>
      </div>
    </div>
  );
};

export default WeatherWidget;
