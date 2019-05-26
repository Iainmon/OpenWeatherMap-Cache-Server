import Location from './Location'
import fetch from 'node-fetch'

export interface WeatherRequestOptions {
    location: Location;
    lifeTime?: number;
}

export class WeatherRequest {

    public location: Location;

    private data: any = null;

    public static defaultLifeTime = 15 * 1000 * 60; // 15 minutes

    public lifeTime = WeatherRequest.defaultLifeTime;

    constructor(options: WeatherRequestOptions) {
        this.location = options.location;
        if (options.lifeTime) {
            this.lifeTime = options.lifeTime;
        }
    }

    private requestWeather(location: Location, key: string): Promise<any> {
        console.log(`Fetching data for ${location.longitude}, ${location.latitude}`);
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${key}`);
    }

    public async getData(key: string) {

        if (this.data !== null) {
            return this.data;
        }

        let response = await this.requestWeather(this.location, key);
        this.data = response.json();

        return this.data;
    }
}