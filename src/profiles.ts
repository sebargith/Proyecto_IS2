// Ilustraciones sacadas de: https://blush.design/collections/L9oIBvB7R7IjzZWxOfIu/open-doodles

import { Actividad, actividades } from './activities';

export interface Profile {
  id: number;
  name: string;
  image: string;
  description: string;
  activities: Actividad[];
}

const profiles: Profile[] = [
  {
    id: 1,
    name: "Apasionada del Deporte",
    image: "https://blush.design/api/download?shareUri=pkKoNmfad&w=800&h=800&fm=png",
    description: "Vivo para moverme: correr al aire libre o entrenar en el gimnasio me llena de energía.",
    activities: [
      actividades.find((a) => a.nombre === "Correr al aire libre")!,
      actividades.find((a) => a.nombre === "Entrenamiento en gimnasio")!,
      actividades.find((a) => a.nombre === "Paseo en bicicleta")!,
      actividades.find((a) => a.nombre === "Patinaje en parque")!,
      actividades.find((a) => a.nombre === "Pesca recreativa")!,
      actividades.find((a) => a.nombre === "Ciclismo de montaña")!,
      actividades.find((a) => a.nombre === "Escalada en roca")!,
      actividades.find((a) => a.nombre === "Slackline en parque")!,
      actividades.find((a) => a.nombre === "Tiro con arco en campo")!,
    ],
  },
  {
    id: 2,
    name: "Creador de Recuerdos en Familia",
    image: "https://blush.design/api/download?shareUri=Fg65g0GMW&w=800&h=800&fm=png",
    description: "Disfruto crear recuerdos con mis hijos, ya sea explorando parques o haciendo manualidades en casa.",
    activities: [
      actividades.find((a) => a.nombre === "Caza del tesoro")!,
      actividades.find((a) => a.nombre === "Manualidades en familia")!,
      actividades.find((a) => a.nombre === "Picnic en el parque")!,
      actividades.find((a) => a.nombre === "Paseo con mascotas")!,
      actividades.find((a) => a.nombre === "Campamento nocturno")!,
      actividades.find((a) => a.nombre === "Paseo a caballo")!,
      actividades.find((a) => a.nombre === "Huerto en casa")!,
      actividades.find((a) => a.nombre === "Carrera de sacos")!,
      actividades.find((a) => a.nombre === "Juego de escondidas")!,
      
    ],
  },
  {
    id: 3,
    name: "Buscador de serenidad",
    image: "https://blush.design/api/download?shareUri=uUPxG062l&w=800&h=800&fm=png",
    description: "Busco calma meditando en casa o contemplando la naturaleza, disfrutando momentos de paz.",
    activities: [
      actividades.find((a) => a.nombre === "Observación de la naturaleza")!,
      actividades.find((a) => a.nombre === "Meditación guiada")!,
      actividades.find((a) => a.nombre === "Picnic en el parque")!,
      actividades.find((a) => a.nombre === "Observación de aves")!,
      actividades.find((a) => a.nombre === "Caminata por la playa")!,
      actividades.find((a) => a.nombre === "Observación de estrellas")!,
      actividades.find((a) => a.nombre === "Campamento nocturno")!,

    ],
  },
  {
    id: 4,
    name: "Alma Creativa",
    image: "https://blush.design/api/download?shareUri=RLcye7uGH&w=800&h=800&fm=png",
    description: "Amo pintar en mi taller o capturar la belleza de la naturaleza con mi arte.",
    activities: [
      actividades.find((a) => a.nombre === "Fotografía en la naturaleza")!,
      actividades.find((a) => a.nombre === "Pintura en taller")!,
      actividades.find((a) => a.nombre === "Lectura al aire libre")!,
      actividades.find((a) => a.nombre === "Tour fotográfico")!,
      actividades.find((a) => a.nombre === "Taller de cerámica")!,
      actividades.find((a) => a.nombre === "Dibujo con tizas en la vereda")!,
    ],
  },
];

export default profiles;
