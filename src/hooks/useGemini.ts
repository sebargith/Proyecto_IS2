import { useState, useEffect, useRef, useCallback } from 'react';
import { generateActivitiesForCity } from '../gemini';
import { Actividad } from '../activities';

interface UseGeminiProps {
  city: string | undefined;
  enabled: boolean;
  userPreferences: number[]; // Array de IDs de preferencias
}

export const useGemini = ({ city, enabled, userPreferences }: UseGeminiProps) => {
  const [activities, setActivities] = useState<Actividad[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const lastRequestRef = useRef<{ city: string; prefs: string } | null>(null);

  const fetchActivities = useCallback(async (currentCity: string, currentPrefs: number[]) => {
    lastRequestRef.current = { city: currentCity, prefs: JSON.stringify(currentPrefs) };
    setIsLoading(true);
    setError(null);

    try {
      // Pasamos las preferencias a la función de la API.
      console.log("llamando a gemini...")
      const result = await generateActivitiesForCity(currentCity, currentPrefs);
      setActivities(result);
    } catch (e) {
      if (e instanceof Error) {
        setError(e.message);
      } else {
        setError('Ocurrió un error inesperado al contactar la IA.');
      }
      setActivities([]);
      lastRequestRef.current = null; // Permitir reintento en caso de error.
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const prefsAsString = JSON.stringify(userPreferences);
    const hasNewRequestState = enabled && city && 
      (city !== lastRequestRef.current?.city || prefsAsString !== lastRequestRef.current?.prefs);
    
    if (hasNewRequestState) {
      fetchActivities(city, userPreferences);
    }

    if (!enabled) {
      setActivities([]);
      setError(null);
      lastRequestRef.current = null;
    }
    
  }, [city, enabled, userPreferences, fetchActivities]);

  return { activities, isLoading, error };
};
