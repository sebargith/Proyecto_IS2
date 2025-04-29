export type Location = {
    lat: number,
    lon: number,

    name: string,
    region: string,
    country: string,

    tz_id: string,
    localtime_epoch: number,
    localtime: string,
}

export type Realtime = {
    last_updated: string,// Local time when the real time data was updated.
    last_updated_epoch: number,// Local time when the real time data was updated in unix time.
    temp_c: number,// Temperature in celsius
    temp_f: number,// Temperature in fahrenheit
    feelslike_c: number,// Feels like temperature in celsius
    feelslike_f: number,// Feels like temperature in fahrenheit
    windchill_c: number,// Windchill temperature in celcius
    windchill_f: number,// Windchill temperature in fahrenheit
    heatindex_c: number,// Heat index in celcius
    heatindex_f: number,// Heat index in fahrenheit
    dewpoint_c: number,// Dew point in celcius
    dewpoint_f: number,// Dew point in fahrenheit
    condition: {
        text: string,// Weather condition text
        icon: string,// Weather icon url
        code: number,// Weather condition unique code.
    },
    wind_mph: number,// Wind speed in miles per hour
    wind_kph: number,// Wind speed in kilometer per hour
    wind_degree: number,// Wind direction in degrees
    wind_dir: string,// Wind direction as 16 point compass. e.g.: NSW
    pressure_mb: number,// Pressure in millibars
    pressure_in: number,// Pressure in inches
    precip_mm: number,// Precipitation amount in millimeters
    precip_in: number,// Precipitation amount in inches
    humidity: number,// Humidity as percentage
    cloud: number,// Cloud cover as percentage
    is_day: 0 | 1,// 1 = Yes 0 = No
    // Whether to show day condition icon or night icon
    uv: number,// UV Index
    gust_mph: number,// Wind gust in miles per hour
    gust_kph: number,// Wind gust in kilometer per hour
}

export enum Method {
    Current = 'current.json',
    Forecast = 'forecast.json',
}

export type APIResponse = {
    location: Location,
    current: Realtime,
}

const BASE_URL: string = 'http://api.weatherapi.com/v1';

export function makeQuery(method: Method, locationQuery: string): string {
    // Asegúrate de que la API key está configurada en tu .env
    if (!import.meta.env.VITE_API_KEY) {
        console.error("Error: VITE_API_KEY no está definida en el entorno.");
        // Podrías lanzar un error o devolver una query inválida
        return `${BASE_URL}/${method}?key=NO_API_KEY&q=${encodeURIComponent(locationQuery)}`;
    }
    // Codifica la ubicación para seguridad en la URL
    return `${BASE_URL}/${method}?key=${import.meta.env.VITE_API_KEY}&q=${encodeURIComponent(locationQuery)}`;
}

export async function current(locationQuery: string): Promise<Realtime> {
    try {
        const response = await fetch(makeQuery(Method.Current, locationQuery));
        if (!response.ok) {
            // Manejar errores de la API (ej: ubicación no encontrada, API key inválida)
            const errorData = await response.json();
            console.error("Error de WeatherAPI:", errorData);
            throw new Error(errorData.error?.message ?? `Error ${response.status} al obtener el clima`);
        }
        const { current }: APIResponse = await response.json();
        return current;
    } catch (e) {
        console.error("Error en la función current:", e);
        throw e; // Re-lanzar el error para que sea manejado por quien llama
    }
}

export async function forecast(locationQuery: string, days: number = 1): Promise<any> {
    if (days < 1 || days > 14) {
        throw new Error(`El pronóstico debe estar en el rango de [1, 14] días, se recibió: ${days}`);
    }

    try {
        // Se construye la query con la ubicación y el número de días
        const query = `${makeQuery(Method.Forecast, locationQuery)}&days=${days}`;
        const response = await fetch(query);

        if (!response.ok) {
            // Manejar errores de la API
            const errorData = await response.json();
            console.error("Error de WeatherAPI (forecast):", errorData);
            throw new Error(errorData.error?.message ?? `Error ${response.status} al obtener el pronóstico`);
        }

        // Retornamos el resultado completo del pronóstico
        return await response.json();
    } catch (e) {
        console.error("Error en la función forecast:", e);
        throw e; // Re-lanzar el error para que sea manejado por quien llama
    }
}