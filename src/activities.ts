
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
      temperatura: { min: 10, max: 20 },
      vientoMax: 15,
      lluviaPermitida: false,
      indiceUVMax: 6,
    },
    {
      nombre: "Jardinería",
      temperatura: { min: 15, max: 25 },
      vientoMax: 20,
      lluviaPermitida: false,
      indiceUVMax: 7,
    },
    {
      nombre: "Senderismo",
      temperatura: { min: 10, max: 18 },
      vientoMax: 15,
      lluviaPermitida: false,
      indiceUVMax: 6,
    },
    {
      nombre: "Entrenamiento en gimnasio",
      temperatura: { min: 18, max: 25 },
      vientoMax: 0,
      lluviaPermitida: true,
      indiceUVMax: 0,
    },
    {
      nombre: "Manualidades en familia",
      temperatura: { min: 18, max: 25 },
      vientoMax: 0,
      lluviaPermitida: true,
      indiceUVMax: 0,
    },
    {
      nombre: "Caza del tesoro",
      temperatura: { min: 15, max: 25 },
      vientoMax: 20,
      lluviaPermitida: false,
      indiceUVMax: 7,
    },
    {
      nombre: "Meditación guiada",
      temperatura: { min: 18, max: 25 },
      vientoMax: 0,
      lluviaPermitida: true,
      indiceUVMax: 0,
    },
    {
      nombre: "Observación de la naturaleza",
      temperatura: { min: 15, max: 25 },
      vientoMax: 15,
      lluviaPermitida: false,
      indiceUVMax: 5,
    },
    {
      nombre: "Pintura en taller",
      temperatura: { min: 18, max: 25 },
      vientoMax: 0,
      lluviaPermitida: true,
      indiceUVMax: 0,
    },
    {
      nombre: "Fotografía en la naturaleza",
      temperatura: { min: 15, max: 25 },
      vientoMax: 15,
      lluviaPermitida: false,
      indiceUVMax: 6,
    },
  ];
  