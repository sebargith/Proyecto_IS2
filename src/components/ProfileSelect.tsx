import React from 'react';
import { Profile } from '../profiles';

interface Props {
  // textos "preferencia 1,2,3,4"
  label: string;
  // Para que las opciones sean iguales en la selección 
  perfiles: Profile[];
  //ID del perfil 
  value: string;
  // Devuelve el nuego ID al componente padre
  onChange: (newId: string) => void;
}

const ProfileSelect: React.FC<Props> = ({ label, perfiles, value, onChange }) => (
  <div className="flex flex-col items-center">
    <span className="mb-1 font-semibold text-gray-700">{label}</span>

    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="px-4 py-2 rounded-full border-2 border-green-400 bg-green-100
                 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500"
    >
      <option value="">— Selecciona —</option>
      {perfiles.map(p => (
        <option key={p.id} value={p.id}>{p.name}</option>
      ))}
    </select>
  </div>
);

export default ProfileSelect;
