
export interface UmbralesClimaticos {
  min: number;
  max: number;
}

export interface Actividad {
  nombre: string;
  temperatura: UmbralesClimaticos;
  vientoMax: number;
  lluviaPermitida: boolean;
  indiceUVMax: number;
  descripcion: string;  // Nueva propiedad para la descripción
}

export const actividades: Actividad[] = [
  {
    nombre: "Correr al aire libre",
    temperatura: { min: 5, max: 28 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
    descripcion: "Actividad física al aire libre que consiste en correr, ideal para mantener la salud cardiovascular.",
  },
  {
    nombre: "Jardinería",
    temperatura: { min: 8, max: 30 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
    descripcion: "Trabajo en el jardín, que puede incluir plantar, regar y cuidar las plantas y flores.",
  },
  {
    nombre: "Senderismo",
    temperatura: { min: 5, max: 26 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
    descripcion: "Recorridos a pie por caminos y rutas naturales, disfrutando del paisaje y la naturaleza.",
  },
  {
    nombre: "Entrenamiento en gimnasio",
    temperatura: { min: 0, max: 35 },
    vientoMax: 1000,
    lluviaPermitida: true,
    indiceUVMax: 1000,
    descripcion: "Ejercicio físico realizado en un gimnasio con el uso de máquinas, pesas y otros equipos.",
  },
  {
    nombre: "Manualidades en familia",
    temperatura: { min: 0, max: 35 },
    vientoMax: 1000,
    lluviaPermitida: true,
    indiceUVMax: 1000,
    descripcion: "Actividades creativas y artísticas que pueden realizarse en familia, como pintar, coser o construir objetos.",
  },
  {
    nombre: "Caza del tesoro",
    temperatura: { min: 8, max: 30 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
    descripcion: "Juego de aventura en el que los participantes buscan objetos escondidos basados en pistas.",
  },
  {
    nombre: "Meditación guiada",
    temperatura: { min: 0, max: 35 },
    vientoMax: 1000,
    lluviaPermitida: true,
    indiceUVMax: 1000,
    descripcion: "Práctica de relajación y mindfulness guiada por una voz que ayuda a calmar la mente.",
  },
  {
    nombre: "Observación de la naturaleza",
    temperatura: { min: 6, max: 28 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
    descripcion: "Actividad tranquila que consiste en observar y disfrutar de la fauna y flora en su entorno natural.",
  },
  {
    nombre: "Pintura en taller",
    temperatura: { min: 0, max: 35 },
    vientoMax: 1000,
    lluviaPermitida: true,
    indiceUVMax: 1000,
    descripcion: "Actividad artística que se realiza en un taller donde se pinta sobre lienzos o cualquier otro material.",
  },
  {
    nombre: "Fotografía en la naturaleza",
    temperatura: { min: 6, max: 28 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
    descripcion: "Captura de imágenes de paisajes naturales, flora y fauna, utilizando cámaras fotográficas.",
  },
];