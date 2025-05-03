import React from 'react';
import { Actividad } from '../activities';
import { CondicionesClimaticas } from '../hooks/useWeather';

interface Props {
  actividad: Actividad;
  condiciones: CondicionesClimaticas;
}

const Recomendacion: React.FC<Props> = ({ actividad, condiciones }) => {
  const { temperatura, viento, lluvia, indiceUV } = condiciones;

  const esAdecuada =
    temperatura >= actividad.temperatura.min &&
    temperatura <= actividad.temperatura.max &&
    viento <= actividad.vientoMax &&
    (!lluvia || actividad.lluviaPermitida) &&
    indiceUV <= actividad.indiceUVMax;

  return (
    <article
      className="bg-white border border-gray-200 rounded-xl overflow-hidden
                 shadow-lg transition
                 hover:-translate-y-1 hover:shadow-2xl
                 focus:-translate-y-1 focus:shadow-2xl
                 cursor-pointer"
      tabIndex={0}
      role="button"
    >
      <img
        src={actividad.imagen}
        alt={actividad.nombre}
        className="w-full h-40 object-cover"
        loading="lazy"
      />

      <div className="p-4 space-y-2">
        <h4 className="text-base font-semibold text-gray-800">
          {actividad.nombre}
        </h4>

        <p className="text-xs text-gray-600">
          Condiciones actuales: {temperatura} °C, {viento} km/h,&nbsp;
          {lluvia ? 'lluvia' : 'sin lluvia'}, UV: {indiceUV}
        </p>

        <p
          className={`text-sm font-semibold ${
            esAdecuada ? 'text-green-600' : 'text-red-600'
          }`}
        >
          {esAdecuada
            ? 'Condiciones ideales para esta actividad.'
            : 'No se recomienda realizar esta actividad en este momento.'}
        </p>
      </div>
    </article>
  );
};

export default Recomendacion;
