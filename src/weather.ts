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

const BASE_URL: string = 'http://api.weatherapi.com/v1';

export function makeQuery(method: Method): string {
    return `${BASE_URL}/${method}?key=${import.meta.env.VITE_API_KEY}&q=Concepcion`
}

export async function current(): Promise<Realtime> {
    return (await fetch(makeQuery(Method.Current))).json();
}

export function forecast(days: number = 1) {
    if (days < 0 || days > 14) {
        throw Error(`Forecast must be in the [0, 4] range, got ${days}`);
    }

    const query = `${makeQuery(Method.Forecast)}&days=${days}`;

    return query
}