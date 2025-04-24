
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
  ];