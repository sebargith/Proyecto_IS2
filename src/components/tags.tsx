import React, { useState } from "react";

interface Tag {
  id: string;
  label: string;
}

const OutdoorTags: React.FC = () => {
  const initialTags: Tag[] = [
    { id: "1", label: "Arte" },
    { id: "2", label: "Deporte" },
    { id: "3", label: "Música" },
    { id: "4", label: "Familia" },
    { id: "5", label: "Educación" },
    { id: "6", label: "Social" },
    { id: "7", label: "Aventura" },
    { id: "8", label: "Relajación" },
    { id: "9", label: "Naturaleza" },
    { id: "10", label: "Cultura" },
    { id: "11", label: "Salud" },
    { id: "12", label: "Turismo" },
    { id: "13", label: "Bienestar" },
    { id: "14", label: "Ecología" },
    { id: "15", label: "Vacaciones" },
    { id: "16", label: "Convivencia" },
    { id: "17", label: "Familia" },
    { id: "18", label: "Relaciones" },
  ];

  const [tags, setTags] = useState<Tag[]>(initialTags);
  const [selectedTags, setSelectedTags] = useState<Set<string>>(new Set());

  const handleToggleTag = (id: string) => {
    setSelectedTags((prevSelectedTags) => {
      const newSelectedTags = new Set(prevSelectedTags);
      if (newSelectedTags.has(id)) {
        newSelectedTags.delete(id);
      } else {
        newSelectedTags.add(id);
      }
      return newSelectedTags;
    });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-blue-600">
        Actividades al Aire Libre
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        {tags.map((tag) => (
          <button
            key={tag.id}
            onClick={() => handleToggleTag(tag.id)}
            className={`px-4 py-2 rounded-full text-white font-semibold ${
              selectedTags.has(tag.id)
                ? "bg-blue-500"
                : "bg-blue-300 hover:bg-blue-400"
            }`}
          >
            {tag.label}
          </button>
        ))}
      </div>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-gray-700">
          Etiquetas Seleccionadas
        </h3>
        <ul className="space-y-2 mt-2">
          {Array.from(selectedTags).map((tagId) => {
            const tag = tags.find((t) => t.id === tagId);
            return (
              tag && (
                <li key={tag.id} className="text-blue-600">
                  {tag.label}
                </li>
              )
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default OutdoorTags;
