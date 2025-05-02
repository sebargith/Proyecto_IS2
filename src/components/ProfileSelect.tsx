import React from 'react';
import { Profile } from '../profiles';

interface Props {
  // textos "preferencia 1,2,3,4"
  label: string;
  // Para que las opciones sean iguales en la selección 
  perfiles: Profile[];
  //ID del perfil 
  value: string;
  // Devuelve el nuevo ID al componente padre
  onChange: (newId: string) => void;
}

const ProfileSelect: React.FC<Props> = ({ label, perfiles, value, onChange }) => (
  <div className="flex flex-col items-center">
    <span className="mb-1 font-semibold text-gray-700">{label}</span>

    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      className="px-2 py-1 rounded border-2 border-yellow-300 bg-yellow-50
                 hover:bg-yellow-100 focus:outline-none focus:ring-2 focus:ring-yellow-400 text-xs"
    >
      <option value="">— Selecciona —</option>
      {perfiles.map(p => (
        <option key={p.id} value={p.id}>{p.name}</option>
      ))}
    </select>
  </div>
);

export default ProfileSelect;