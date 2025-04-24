import React from "react";
import { Actividad } from "./activities";

interface CondicionesClimaticas {
    temperatura: number;
    viento: number;
    lluvia: boolean;
    indiceUV: number;
  }
  
  interface Props {
    actividad: Actividad;
    condiciones: CondicionesClimaticas;
  }
  
  const Recomendacion: React.FC<Props> = ({ actividad, condiciones }) => {
    const {
      temperatura,
      viento,
      lluvia,
      indiceUV,
    } = condiciones;
  
    const esAdecuada =
      temperatura >= actividad.temperatura.min &&
      temperatura <= actividad.temperatura.max &&
      viento <= actividad.vientoMax &&
      (!lluvia || actividad.lluviaPermitida) &&
      indiceUV <= actividad.indiceUVMax;
  
    return (
      <div className="p-4 rounded-xl shadow bg-white space-y-2 border border-gray-200">
        <h2 className="text-xl font-bold text-blue-600">{actividad.nombre}</h2>
        <p>
          Condiciones actuales: {temperatura}°C, {viento} km/h,{" "}
          {lluvia ? "lluvia" : "sin lluvia"}, UV: {indiceUV}
        </p>
        <p className={`font-semibold ${esAdecuada ? "text-green-600" : "text-red-600"}`}>
          {esAdecuada
            ? "Condiciones ideales para esta actividad."
            : "No se recomienda realizar esta actividad en este momento."}
        </p>
      </div>
    );
  };
  
  export default Recomendacion;