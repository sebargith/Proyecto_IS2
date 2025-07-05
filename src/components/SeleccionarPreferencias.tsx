import React, { useState, useEffect } from "react";
import axios from "axios";

interface Props {
  onContinue: () => void;
}

const SeleccionarPreferencias: React.FC<Props> = ({ onContinue }) => {
  const [preferencias, setPreferencias] = useState<
    { id_preferencia: number; nombre: string }[]
  >([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedPreferences, setSelectedPreferences] = useState<number[]>([]);

  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user") || "null");
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  const fetchPreferencias = async () => {
    try {
      const response = await axios.get("http://localhost:8000/preferencias");
      setPreferencias(response.data);
    } catch (error) {
      setError("No se pudieron cargar las preferencias.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPreferencias();
  }, []);

  const handleSelectPreference = (id: number) => {
    setError("");
    setSelectedPreferences((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((preferenceId) => preferenceId !== id)
        : [...prevSelected, id]
    );
  };

  const movePreference = (index: number, direction: "up" | "down") => {
    const newOrder = [...selectedPreferences];
    const newIndex = direction === "up" ? index - 1 : index + 1;
    if (newIndex < 0 || newIndex >= newOrder.length) return;
    [newOrder[index], newOrder[newIndex]] = [newOrder[newIndex], newOrder[index]];
    setSelectedPreferences(newOrder);
  };

  const handleContinue = async () => {
    if (selectedPreferences.length < 3) {
      setError("Debes seleccionar al menos tres preferencias.");
      return;
    }

    if (!user) {
      setError("El usuario no está autenticado.");
      return;
    }

    try {
      await axios.post("http://localhost:8000", {
        route: "/guardar-preferencias",
        username: user,
        preferencias: selectedPreferences,
      });
      onContinue();
    } catch (err) {
      console.error("Error al guardar preferencias:", err);
      setError("Ocurrió un error al guardar tus preferencias.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-sky-500 via-sky-400 to-blue-500">
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-md text-center">
        <h1 className="text-3xl font-bold text-blue-700 mb-4">
          Elige tus temas favoritos
        </h1>

        {loading ? (
          <p>Cargando preferencias...</p>
        ) : error && preferencias.length === 0 ? (
          <p className="text-red-600 text-sm">{error}</p>
        ) : (
          <>
            <div className="flex flex-wrap gap-2 mb-6 justify-center">
              {preferencias.map((p) => (
                <div
                  key={p.id_preferencia}
                  className={`px-4 py-2 rounded-full border cursor-pointer ${
                    selectedPreferences.includes(p.id_preferencia)
                      ? "bg-blue-600 text-white"
                      : "border-blue-500 bg-white text-blue-500"
                  }`}
                  onClick={() => handleSelectPreference(p.id_preferencia)}
                >
                  {p.nombre}
                </div>
              ))}
            </div>

            {/* Ordenar preferencias seleccionadas */}
            {selectedPreferences.length > 0 && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2 text-blue-700">
                  Ordena tus preferencias (más arriba = más importante):
                </h2>
                <ul className="space-y-2">
                  {selectedPreferences.map((prefId, idx) => {
                    const pref = preferencias.find(
                      (p) => p.id_preferencia === prefId
                    );
                    return (
                      <li key={prefId} className="flex items-center justify-between bg-blue-100 px-4 py-2 rounded-xl shadow">
                        <span>{pref?.nombre}</span>
                        <div className="space-x-2">
                          <button
                            onClick={() => movePreference(idx, "up")}
                            className="text-blue-600 font-bold"
                          >
                            ⬆️
                          </button>
                          <button
                            onClick={() => movePreference(idx, "down")}
                            className="text-blue-600 font-bold"
                          >
                            ⬇️
                          </button>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}
          </>
        )}

        {error && <p className="text-red-600 text-sm">{error}</p>}

        <button
          onClick={handleContinue}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Continuar
        </button>
      </div>
    </div>
  );
};

export default SeleccionarPreferencias;
