export type LocationInfo = {
    name: string,
    region: string,
    country: string,
    lat: number,
    lon: number,
    tz_id: string,
    localtime_epoch: number,
    localtime: string,
}

export type ClimateInfo = {
    last_updated_epoch: string,
    last_updated: string,
    temp_c: number,
    temp_f: number,
    is_day: 0 | 1,
    condition: {
        text: string,
        icon: string,
        date: number,
    },
    wind_mph: number,
    wind_kph: number,
    wind_degree: number,
    wind_dir: 'N' | 'S' | 'E' | 'O',
    pressure_mb: number,
    pressure_in: number,
    precip_mm: number,
    precip_in: number,
    humidity: number,
    cloud: number,
    feelslike_c: number,
    feelslike_f: number,
    windchill_c: number,
    windchill_f: number,
    heatindex_c: number,
    heatindex_f: number,
    dewpoint_c: number,
    dewpoint_f: number,
    vis_km: number,
    vis_miles: number,
    uv: number,
    gust_mph: number,
    gust_kph: number,
}

export type APIResponse = {
    location: LocationInfo,
    current: ClimateInfo,
    forecast?: Array<ClimateInfo>,
}

export async function getData(): Promise<APIResponse> {
    const response = await fetch('http://api.weatherapi.com/v1/current.json?q=Concepcion&lang=es&&key=b39c59ab40ac4ebbb4012412251604')

    return response.json()
}


getData()
    .then(data => console.log(data))
    .catch(err => console.error(err));

