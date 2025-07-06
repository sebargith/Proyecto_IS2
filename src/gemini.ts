import { GoogleGenAI } from "@google/genai";
import { Actividad } from './activities'; 

const GOOGLE_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
    
if (!GOOGLE_API_KEY) {
  console.error("VITE_GEMINI_API_KEY no está configurada en tu archivo .env");
}


const genAI = new GoogleGenAI({apiKey: GOOGLE_API_KEY});


interface GeminiActividadResponse {
  nombre: string;
  temperatura: { min: number; max: number };
  vientoMax: number;
  lluviaPermitida: boolean;
  indiceUVMax: number;
  imagen: string;
  descripcion: string;
  etiquetas: number[];
  ciudad: string;
}


const createPromptForCity = (city: string, userPreferences: number[]): string => {
  
  const preferenceMap: { [key: number]: string } = {
    1 : "Arte" ,
    2 : "Deporte",
    3 : "Música" ,
    4 : "Familia" ,
    5 : "Educación" ,
    6 : "Social" ,
    7 : "Aventura" ,
    8 : "Relajación" ,
    9 : "Naturaleza" ,
    10 : "Cultura" ,
    11 : "Salud" ,
    12 : "Turismo" ,
    13 : "Bienestar" ,
    14 : "Ecología" ,
    15 : "Vacaciones" ,
    16 : "Convivencia" ,
    17 : "Relaciones" ,
  };

  const preferenceNames = userPreferences.map(id => preferenceMap[id]).filter(Boolean);

  const preferenceInstruction = preferenceNames.length > 0
    ? `Prioriza actividades que coincidan con los siguientes intereses del usuario: ${preferenceNames.join(', ')}. Cada actividad generada DEBE tener al menos una etiqueta que coincida con las preferencias del usuario.`
    : `Genera una mezcla variada de actividades, ya que el usuario no ha especificado preferencias.`;
  
  return `
Genera 5 actividades únicas para hacer en la ciudad de ${city}.
${preferenceInstruction}

Para cada actividad, proporciona un objeto JSON con los siguientes campos detallados:
- nombre: Un título conciso para la actividad.
- temperatura: Un objeto con 'min' y 'max' indicando el rango de temperatura ideal en grados Celsius.
- vientoMax: La velocidad máxima ideal del viento en km/h.
- lluviaPermitida: Un booleano ('true' si es apta para lluvia, 'false' si no).
- indiceUVMax: El índice UV máximo tolerable (0-11).
- imagen: Un término de búsqueda corto en inglés para una imagen (ej. "hiking trail in a forest").
- descripcion: Un resumen cautivador de 1-2 frases sobre la actividad.
- etiquetas: Un array de números basado en la siguiente lista de categorías. ¡Usa solo los números de esta lista!
    1: Arte, 2: Deporte, 3: Música, 4: Familia, 5: Educación, 6: Social, 7: Aventura, 8: Relajación, 9: Naturaleza, 10: Cultura, 11: Salud, 12: Turismo, 13: Bienestar, 14: Ecología, 15: Vacaciones, 16: Convivencia, 17: Relaciones.
- ciudad: El nombre de la ciudad, que debe ser "${city}".

Devuelve la respuesta estrictamente como un array de objetos JSON válido. No incluyas ningún texto o formato markdown fuera del array.

Ejemplo de formato:
[
  {
    "nombre": "Cena en un Restaurante con Estrella Michelin",
    "temperatura": { "min": 10, "max": 30 },
    "vientoMax": 30,
    "lluviaPermitida": true,
    "indiceUVMax": 11,
    "imagen": "michelin star restaurant elegant dining",
    "descripcion": "Disfruta de una experiencia culinaria inolvidable en uno de los restaurantes más aclamados de la ciudad.",
    "etiquetas": [2, 5],
    "ciudad": "${city}"
  }
]
`;
};


export const generateActivitiesForCity = async (city: string, userPreferences: number[]): Promise<Actividad[]> => {
  if (!GOOGLE_API_KEY) {
    throw new Error("La clave de API no está configurada.");
  }

  
  
  const prompt = createPromptForCity(city, userPreferences);

  const groundingTool = {
  googleSearch: {},
  };


  const config = {
  tools: [groundingTool],
  responseMimeType: "text/plain",
    temperature: 0.8,
};

  try {
    const response = await  genAI.models.generateContent({
       model: "gemini-2.5-flash",
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config,
    });
    
    // ... (el resto de la función para parsear y validar el JSON no cambia) ...
    const responseText = response.text || '';
    console.log(responseText)
    const cleanJsonText = responseText.replace(/```json\n?|\n?```/g, "").trim();

    let parsedData: GeminiActividadResponse[];
    try {
      parsedData = JSON.parse(cleanJsonText);
    } catch (parseError) {
      console.error("Error al parsear la respuesta JSON de Gemini:", cleanJsonText, parseError);
      throw new Error("El formato recibido de la IA no es válido.");
    }
    
    if (!Array.isArray(parsedData) || parsedData.some(item => 
        typeof item.nombre !== 'string' || 
        typeof item.temperatura?.min !== 'number' ||
        typeof item.lluviaPermitida !== 'boolean'
    )) {
      console.error("Estructura JSON inesperada:", parsedData);
      throw new Error("La IA ha devuelto datos en una estructura inesperada.");
    }
    
    return parsedData.map((item) => ({
      ...item,
      id: crypto.randomUUID(), 
    }));

  } catch (error) {
    console.error("Error al generar actividades con Gemini:", error);
    throw new Error(`No se pudieron generar actividades para ${city}.`);
  }
};
