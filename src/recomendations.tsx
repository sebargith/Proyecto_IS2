import React from "react";
import { Actividad } from "./activities";

interface Props {
  actividad: Actividad;
}

const Recomendacion: React.FC<Props> = ({ actividad }) => {
  return (
    <div
      className="p-5 rounded-2xl shadow-md transform transition duration-300 hover:scale-105 border-2 border-green-400 bg-gradient-to-br from-green-50 to-white"
    >
      <h2 className="text-2xl font-bold mb-3 text-gray-800">{actividad.nombre}</h2>

      {/* Mostrar la descripción de la actividad */}
      <p className="text-sm text-gray-600 mb-3">{actividad.descripcion}</p>

      <p className="font-semibold text-green-700">
        ✅ Condiciones ideales para esta actividad.
      </p>
    </div>
  );
};

export default Recomendacion;