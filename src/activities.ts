
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
  imagen: string;
  descripcion: string;
}

export const actividades: Actividad[] = [
  {
    nombre: "Correr al aire libre",
    temperatura: { min: 5, max: 28 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/correr.jpg",
    descripcion: "Actividad física al aire libre que consiste en correr, ideal para mantener la salud cardiovascular.",
  },
  {
    nombre: "Jardinería",
    temperatura: { min: 8, max: 30 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/jardineria.jpg",
    descripcion: "Trabajo en el jardín, que puede incluir plantar, regar y cuidar las plantas y flores.",
  },
  {
    nombre: "Senderismo",
    temperatura: { min: 5, max: 26 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/senderismo.jpg",
    descripcion: "Recorridos a pie por caminos y rutas naturales, disfrutando del paisaje y la naturaleza.",
  },
  {
    nombre: "Entrenamiento en gimnasio",
    temperatura: { min: 0, max: 35 },
    vientoMax: 1000,
    lluviaPermitida: true,
    indiceUVMax: 1000,
    imagen: "/assets/actividades/entrenamiento.jpg",
    descripcion: "Ejercicio físico realizado en un gimnasio con el uso de máquinas, pesas y otros equipos.",
  },
  {
    nombre: "Manualidades en familia",
    temperatura: { min: 0, max: 35 },
    vientoMax: 1000,
    lluviaPermitida: true,
    indiceUVMax: 1000,
    imagen: "/assets/actividades/manualidades.jpg",
    descripcion: "Actividades creativas y artísticas que pueden realizarse en familia, como pintar, coser o construir objetos.",
  },
  {
    nombre: "Caza del tesoro",
    temperatura: { min: 8, max: 30 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/cazatesoro.jpg",
    descripcion: "Juego de aventura en el que los participantes buscan objetos escondidos basados en pistas.",
  },
  {
    nombre: "Meditación guiada",
    temperatura: { min: 0, max: 35 },
    vientoMax: 1000,
    lluviaPermitida: true,
    indiceUVMax: 1000,
    imagen: "/assets/actividades/meditacion.jpg",
    descripcion: "Práctica de relajación y mindfulness guiada por una voz que ayuda a calmar la mente.",
  },
  {
    nombre: "Observación de la naturaleza",
    temperatura: { min: 6, max: 28 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/observacion.jpg",
    descripcion: "Actividad tranquila que consiste en observar y disfrutar de la fauna y flora en su entorno natural.",
  },
  {
    nombre: "Pintura en taller",
    temperatura: { min: 0, max: 35 },
    vientoMax: 1000,
    lluviaPermitida: true,
    indiceUVMax: 1000,
    imagen: "/assets/actividades/pintura.jpg",
    descripcion: "Actividad artística que se realiza en un taller donde se pinta sobre lienzos o cualquier otro material.",
  },
  {
    nombre: "Fotografía en la naturaleza",
    temperatura: { min: 6, max: 28 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/fotografia.jpg",
    descripcion: "Captura de imágenes de paisajes naturales, flora y fauna, utilizando cámaras fotográficas.",
  },
  {
    nombre: "Picnic en el parque",
    temperatura: { min: 10, max: 30 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/picnic_parque.jpg",
    descripcion: "Reunión al aire libre para compartir comida y disfrutar del entorno natural."
  },
  {
    nombre: "Paseo en bicicleta",
    temperatura: { min: 8, max: 28 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/bicicleta_paseo.jpg",
    descripcion: "Actividad física y recreativa en la que se recorre una ruta montado en bicicleta."
  },
  {
    nombre: "Lectura al aire libre",
    temperatura: { min: 10, max: 28 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 5,
    imagen: "/assets/actividades/lectura_airelibre.jpg",
    descripcion: "Momento tranquilo para disfrutar de un buen libro en un parque o jardín."
  },
  {
    nombre: "Observación de aves",
    temperatura: { min: 6, max: 28 },
    vientoMax: 10,
    lluviaPermitida: false,
    indiceUVMax: 5,
    imagen: "/assets/actividades/observacion_aves.jpg",
    descripcion: "Actividad que consiste en observar e identificar distintas especies de aves."
  },
  {
    nombre: "Patinaje en parque",
    temperatura: { min: 10, max: 28 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/patinaje.jpg",
    descripcion: "Actividad recreativa sobre ruedas, ideal para disfrutar en espacios pavimentados al aire libre."
  },
  {
    nombre: "Pesca recreativa",
    temperatura: { min: 10, max: 30 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/pesca_recreativa.jpg",
    descripcion: "Actividad de ocio que consiste en capturar peces, generalmente como pasatiempo."
  },
  {
    nombre: "Caminata por la playa",
    temperatura: { min: 12, max: 30 },
    vientoMax: 25,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/caminata_playa.jpg",
    descripcion: "Paseo tranquilo por la orilla del mar, ideal para relajarse y disfrutar del paisaje."
  },
  {
    nombre: "Observación de estrellas",
    temperatura: { min: 8, max: 25 },
    vientoMax: 10,
    lluviaPermitida: false,
    indiceUVMax: 1,
    imagen: "/assets/actividades/observacion_estrellas.jpg",
    descripcion: "Actividad nocturna para contemplar el cielo y aprender sobre astronomía."
  },
  {
    nombre: "Ciclismo de montaña",
    temperatura: { min: 5, max: 25 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/ciclismo_montana.jpg",
    descripcion: "Deporte al aire libre que se practica en terrenos montañosos o caminos rurales."
  },
  {
    nombre: "Escalada en roca",
    temperatura: { min: 8, max: 25 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/escalada_roca.jpg",
    descripcion: "Deporte desafiante que consiste en subir superficies rocosas usando técnica y fuerza."
  },
  {
    nombre: "Tour fotográfico",
    temperatura: { min: 10, max: 30 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/tour_fotografico.jpg",
    descripcion: "Recorrido por lugares pintorescos o históricos para capturar fotografías."
  },
  {
    nombre: "Taller de cerámica",
    temperatura: { min: 0, max: 35 },
    vientoMax: 1000,
    lluviaPermitida: true,
    indiceUVMax: 1000,
    imagen: "/assets/actividades/ceramica.jpg",
    descripcion: "Actividad manual en la que se modela y hornea barro para crear objetos útiles o decorativos."
  },
  {
    nombre: "Paseo con mascotas",
    temperatura: { min: 8, max: 28 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/paseo_mascota.jpg",
    descripcion: "Actividad para caminar y ejercitarse acompañado de mascotas."
  },
  {
    nombre: "Slackline en parque",
    temperatura: { min: 10, max: 28 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/slackline.jpg",
    descripcion: "Deporte de equilibrio que se realiza sobre una cinta tensa entre dos puntos."
  },
  {
    nombre: "Tiro con arco en campo",
    temperatura: { min: 10, max: 28 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/tiroarco.jpg",
    descripcion: "Deporte de precisión que consiste en disparar flechas a un blanco con un arco."
  },
  {
    nombre: "Avistamiento de mariposas",
    temperatura: { min: 10, max: 28 },
    vientoMax: 10,
    lluviaPermitida: false,
    indiceUVMax: 5,
    imagen: "/assets/actividades/mariposas.jpg",
    descripcion: "Observación y fotografía de mariposas en su hábitat natural."
  },
  {
    nombre: "Baile libre al aire libre",
    temperatura: { min: 15, max: 30 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/baile_airelibre.jpg",
    descripcion: "Danza sin coreografía en espacios abiertos para expresarse y ejercitarse."
  },
  {
    nombre: "Campamento nocturno",
    temperatura: { min: 10, max: 25 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 3,
    imagen: "/assets/actividades/campamento_nocturno.jpg",
    descripcion: "Pasar la noche en carpa al aire libre, disfrutando de la naturaleza."
  },
  {
    nombre: "Paseo en bote",
    temperatura: { min: 12, max: 30 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/paseo_bote.jpg",
    descripcion: "Travesía relajante en bote por ríos o lagos, ideal para disfrutar el paisaje acuático."
  },
  {
    nombre: "Paseo a caballo",
    temperatura: { min: 10, max: 28 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/paseo_caballo.jpg",
    descripcion: "Montar a caballo por senderos naturales o rurales, ideal para conectar con la naturaleza."
  },
  {
    nombre: "Huerto en casa",
    temperatura: { min: 0, max: 35 },
    vientoMax: 1000,
    lluviaPermitida: true,
    indiceUVMax: 1000,
    imagen: "/assets/actividades/huerto_casa.jpg",
    descripcion: "Cultivar hortalizas y plantas en espacios reducidos como terrazas o balcones."
  },
  {
    nombre: "Dibujo con tizas en la vereda",
    temperatura: { min: 10, max: 28 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/tizas.jpg",
    descripcion: "Arte efímero en la calle usando tizas de colores sobre pavimento."
  },
  {
    nombre: "Carrera de sacos",
    temperatura: { min: 10, max: 30 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/sacos.jpg",
    descripcion: "Juego tradicional donde los participantes saltan dentro de sacos hasta una meta."
  },
  {
    nombre: "Juego de escondidas",
    temperatura: { min: 10, max: 30 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/escondidas.jpg",
    descripcion: "Juego infantil clásico donde un jugador busca a los demás mientras se esconden."
  },
  {
    nombre: "Paseo por la UdeC",
    temperatura: { min: 5, max: 30 },
    vientoMax: 30,
    lluviaPermitida: true,
    indiceUVMax: 8,
    imagen: "/assets/actividades/campus_udec.jpg",
    descripcion: "Visitar el Campus de la Universidad de Concepción, un lugar emblemático con hermosa arquitectura y áreas verdes."
  },
  {
    nombre: "Ir a la playa en Ramuntcho",
    temperatura: { min: 18, max: 30 },
    vientoMax: 25,
    lluviaPermitida: false,
    indiceUVMax: 7,
    imagen: "/assets/actividades/ramuntcho.jpg",
    descripcion: "Ir a la playa a relajarse y tomar Sol."
  },
  {
    nombre: "Paseo en bicicleta a Cerro Caracol",
    temperatura: { min: 10, max: 26 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/bicicleta_caracol .jpg",
    descripcion: "Recorrer el Cerro caracol en Bicileta."
  },
  {
    nombre: "Practicar Tenis en canchas del Parque ecuador",
    temperatura: { min: 10, max: 25 },
    vientoMax: 15,
    lluviaPermitida: false,
    indiceUVMax: 5,
    imagen: "/assets/actividades/tenis_ecuador.jpg",
    descripcion: "Practicar tenis en las canchas parque ecuador."
  },
  {
    nombre: "Arriendo de Karts en Mall del Trebol",
    temperatura: { min: 12, max: 25 },
    vientoMax: 35,
    lluviaPermitida: false,
    indiceUVMax: 7,
    imagen: "/assets/actividades/karts_conce.jpg",
    descripcion: "Hacer carreras de karting en circiuto ubicado en el Mall plaza Trebol"
  },
  {
    nombre: "Visitar el Cerro San Cristóbal",
    temperatura: { min: 10, max: 30 },
    vientoMax: 30,
    lluviaPermitida: false,
    indiceUVMax: 8,
    imagen: "/assets/actividades/cerro_san_cristobal.jpg",
    descripcion: "Ascender el Cerro San Cristóbal para disfrutar de vistas panorámicas de Santiago, visitar el Santuario de la Inmaculada Concepción y pasear por el Parque Metropolitano."
  },
  {
    nombre: "Explorar el Barrio Lastarria y Bellas Artes",
    temperatura: { min: 10, max: 30 },
    vientoMax: 30,
    lluviaPermitida: true,
    indiceUVMax: 8,
    imagen: "/assets/actividades/lastarria.jpg",
    descripcion: "Recorrer las calles bohemias del Barrio Lastarria, visitar el Museo Nacional de Bellas Artes, explorar tiendas de diseño, librerías y disfrutar de la oferta gastronómica y cultural."
  },
  {
    nombre: "Pasear por el Parque Forestal",
    temperatura: { min: 5, max: 30 },
    vientoMax: 25,
    lluviaPermitida: false,
    indiceUVMax: 7,
    imagen: "/assets/actividades/parque_forestal.jpg",
    descripcion: "Disfrutar de un paseo relajante por el Parque Forestal, un oasis verde en el centro de Santiago, admirando esculturas, fuentes y la arquitectura circundante."
  },
  {
    nombre: "Conocer el Palacio de La Moneda",
    temperatura: { min: 5, max: 30 },
    vientoMax: 30,
    lluviaPermitida: true,
    indiceUVMax: 8,
    imagen: "/assets/actividades/palacio_moneda.jpg",
    descripcion: "Visitar el Palacio de La Moneda, sede del gobierno de Chile, y conocer su historia y arquitectura. Posiblemente presenciar el cambio de guardia."
  },
  {
    nombre: "Recorrer el Mercado Central y La Vega",
    temperatura: { min: 5, max: 30 },
    vientoMax: 30,
    lluviaPermitida: true,
    indiceUVMax: 8,
    imagen: "/assets/actividades/lavega.jpg",
    descripcion: "Sumergirse en la vibrante vida local visitando el Mercado Central para probar mariscos y pescados frescos, y La Vega Central para conocer la variedad de productos agrícolas y artesanías."
  },
    {
    nombre: "Explorar las Iglesias de Chiloé ",
    temperatura: { min: 5, max: 20 },
    vientoMax: 35,
    lluviaPermitida: true,
    indiceUVMax: 5,
    imagen: "/assets/actividades/iglesias_chiloe.jpg",
    descripcion: "Recorrer las icónicas iglesias de madera de Chiloé, reconocidas como Patrimonio de la Humanidad por la UNESCO, admirando su arquitectura única."
  },
  {
    nombre: "Visitar el Parque Nacional Chiloé",
    temperatura: { min: 5, max: 20 },
    vientoMax: 30,
    lluviaPermitida: false,
    indiceUVMax: 5,
    imagen: "/assets/actividades/parque_nacional_chiloe.jpg",
    descripcion: "Senderismo y exploración de la naturaleza exuberante del Parque Nacional Chiloé, hogar de bosques nativos, dunas y una rica biodiversidad."
  },
  {
    nombre: "Paseo en bote por los palafitos de Castro",
    temperatura: { min: 18, max: 30 },
    vientoMax: 40,
    lluviaPermitida: false,
    indiceUVMax: 5,
    imagen: "/assets/actividades/palafitos_castro.jpg",
    descripcion: "Navegar entre los coloridos palafitos de Castro, las casas sobre pilotes que son un símbolo de la arquitectura chilota y ofrecen una perspectiva única de la ciudad."
  },
  {
    nombre: "Recorrer los mercados artesanales",
    temperatura: { min: 5, max: 25 },
    vientoMax: 30,
    lluviaPermitida: false,
    indiceUVMax: 5,
    imagen: "/assets/actividades/mercado_chiloe.jpg",
    descripcion: "Visitar los mercados de artesanía local para encontrar tejidos de lana, objetos de madera, y productos típicos de la isla, conociendo la rica tradición artesanal de Chiloé."
  },
  {
    nombre: "Ir de pesca en chiloe",
    temperatura: { min: 5, max: 20 },
    vientoMax: 30,
    lluviaPermitida: false,
    indiceUVMax: 5,
    imagen: "/assets/actividades/pesca_chiloe.jpg",
    descripcion: "Ir de pesca deportiva al rio Gamboa."
  },
  {
    nombre: "Pasear por los Cerros de Valparaíso y sus ascensores",
    temperatura: { min: 8, max: 28 },
    vientoMax: 25,
    lluviaPermitida: false,
    indiceUVMax: 7,
    imagen: "/assets/actividades/cerros_valparaiso.jpg",
    descripcion: "Recorrer a pie los coloridos cerros de Valparaíso, descubriendo sus laberínticas calles, pasajes y escaleras, y utilizando los históricos ascensores para subir y bajar."
  },
  {
    nombre: "Explorar el Muelle Prat y el Puerto",
    temperatura: { min: 8, max: 28 },
    vientoMax: 35,
    lluviaPermitida: true,
    indiceUVMax: 7,
    imagen: "/assets/actividades/muelle_prat_valparaiso.jpg",
    descripcion: "Visitar el Muelle Prat para observar la actividad portuaria, disfrutar de las vistas de la bahía y tomar un paseo en lancha para ver la ciudad desde el mar."
  },
  {
    nombre: "Visitar las dundas de Concon",
    temperatura: { min: 10, max: 35 },
    vientoMax: 25,
    lluviaPermitida: false,
    indiceUVMax: 7,
    imagen: "/assets/actividades/concon_dunas.jpg",
    descripcion: "Visitar las dunas de Concon a las afueras de Valparaiso"
  },
  {
    nombre: "Conocer los Ascensores de Valparaiso",
    temperatura: { min: 10, max: 30 },
    vientoMax: 25,
    lluviaPermitida: false,
    indiceUVMax: 7,
    imagen: "/assets/actividades/ascensores_valparaiso.jpg",
    descripcion: "Conocer los historicos ascensores que han servido para transportarse en los cerros para los habitantes de Valparaiso."
  },
  {
    nombre: "Catamaran en la bahia de Valparaiso",
    temperatura: { min: 8, max: 25 },
    vientoMax: 30,
    lluviaPermitida: false,
    indiceUVMax: 7,
    imagen: "/assets/actividades/catamaran_valparaiso.jpg",
    descripcion: "Recorrer el la bahia de Valparaiso en Catamaran para tener una vista unica de sus Cerros."
  },
  {
    nombre: "Visitar el Cerro Ñielol",
    temperatura: { min: 5, max: 25 },
    vientoMax: 20,
    lluviaPermitida: true,
    indiceUVMax: 6,
    imagen: "/assets/actividades/cerro_nielol.jpg",
    descripcion: "Ascender el Cerro Ñielol, un parque urbano con senderos, miradores y un importante valor cultural para el pueblo Mapuche, ofreciendo vistas de la ciudad."
  },
  {
    nombre: "Explorar el Mercado Municipal de Temuco",
    temperatura: { min: 5, max: 25 },
    vientoMax: 20,
    lluviaPermitida: true,
    indiceUVMax: 6,
    imagen: "/assets/actividades/mercado_municipal_temuco.jpg",
    descripcion: "Recorrer el Mercado Municipal para encontrar productos regionales, artesanía Mapuche, frutas, verduras y disfrutar de la gastronomía local."
  },
  {
    nombre: "Pasear por la Plaza de Armas Aníbal Pinto",
    temperatura: { min: 5, max: 25 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/plaza_armas_temuco.jpg",
    descripcion: "Disfrutar de un momento de relajo en la Plaza de Armas de Temuco, el corazón de la ciudad, rodeada de edificios históricos y áreas verdes."
  },
  {
    nombre: "Visitar el Museo Regional de La Araucanía",
    temperatura: { min: 5, max: 25 },
    vientoMax: 20,
    lluviaPermitida: true,
    indiceUVMax: 6,
    imagen: "/assets/actividades/museo_araucania_temuco.jpg",
    descripcion: "Aprender sobre la historia, cultura y tradiciones del pueblo Mapuche y la región de La Araucanía a través de las exposiciones del museo."
  },
  {
    nombre: "Recorrer el Parque Estadio Germán Becker",
    temperatura: { min: 5, max: 25 },
    vientoMax: 20,
    lluviaPermitida: false,
    indiceUVMax: 6,
    imagen: "/assets/actividades/estadio_temuco.jpg",
    descripcion: "Disfrutar de actividades al aire libre en el Parque Estadio Germán Becker, con áreas verdes, juegos infantiles y un estadio deportivo."
  }
];
