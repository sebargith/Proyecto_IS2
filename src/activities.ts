
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
}

export const actividades: Actividad[] = [
  {
    nombre: "Correr al aire libre",
    temperatura: { min: 5, max: 28 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
  },
  {
    nombre: "Jardinería",
    temperatura: { min: 8, max: 30 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
  },
  {
    nombre: "Senderismo",
    temperatura: { min: 5, max: 26 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
  },
  {
    nombre: "Entrenamiento en gimnasio",
    temperatura: { min: 0, max: 35 },
    vientoMax: 1000,
    lluviaPermitida: true,
    indiceUVMax: 1000,
  },
  {
    nombre: "Manualidades en familia",
    temperatura: { min: 0, max: 35 },
    vientoMax: 1000,
    lluviaPermitida: true,
    indiceUVMax: 1000,
  },
  {
    nombre: "Caza del tesoro",
    temperatura: { min: 8, max: 30 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
  },
  {
    nombre: "Meditación guiada",
    temperatura: { min: 0, max: 35 },
    vientoMax: 1000,
    lluviaPermitida: true,
    indiceUVMax: 1000,
  },
  {
    nombre: "Observación de la naturaleza",
    temperatura: { min: 6, max: 28 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
  },
  {
    nombre: "Pintura en taller",
    temperatura: { min: 0, max: 35 },
    vientoMax: 1000,
    lluviaPermitida: true,
    indiceUVMax: 1000,
  },
  {
    nombre: "Fotografía en la naturaleza",
    temperatura: { min: 6, max: 28 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
  },
];