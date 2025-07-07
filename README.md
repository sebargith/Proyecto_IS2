# Weather app
**Weather App** es una aplicación web que recomienda actividades a partir de las condiciones climáticas actuales de tu ubicación. Además permite seleccionar una serie de perfiles para que se las recomendaciones se adapten a tus gustos.

## Características
Actualmente se encuentra en una versión preliminar que tiene las siguientes características:

- Selección de múltiples perfiles
- Recomendaciones personalizadas
- Widget de visualización del clima actual

## Requisitos previos
- Node.js
- npm
- Una clave de la API de [WeatherApi] (https://www.weatherapi.com/)
- Una clave de la API de Gemini

## Instalación
1. Clona el repositorio:
 ```bash
   git clone https://github.com/<tu-usuario>/Proyecto_IS2.git
   cd Proyecto_IS2
```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Configura la clave de la API:
   - Crea un archivo `.env` en la raíz del proyecto.
   - Añade tu clave de WeatherAPI:
     ```env
     VITE_API_KEY=tu-clave-api-weather
     VITE_GEMINI_API_KEY= tu-clave-api-gemini
     ```
4. Inicia la aplicación:
   - Inicia el backend en una ventana de comandos:
   ```bash
   node backend.js
   ```

   - Inicia la aplicación frontend en otra ventana de comandos:
   ```bash
   npm run dev
   ```
6. Abre `http://localhost:XXXX` en tu navegador.

## Créditos
Desarrollado por Equipo 2 del curso Ingeniería de Software 2, UdeC.
