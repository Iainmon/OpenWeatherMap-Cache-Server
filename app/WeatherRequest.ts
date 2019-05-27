import Location from './Location'
import fetch from 'node-fetch'
import Key from './Key';

export interface WeatherRequestOptions {
    location: Location;
    lifeTime?: number;
}

export class WeatherRequest {

    public location: Location;

    private data: any = null;

    public static defaultLifeTime = 15 * 1000 * 60; // 15 minutes

    public lifeTime = WeatherRequest.defaultLifeTime;
    public startTime: number; // Milliseconds

    constructor(options: WeatherRequestOptions) {

        this.location = options.location;
        this.startTime = new Date().getTime();

        if (options.lifeTime) {
            this.lifeTime = options.lifeTime;
        }
    }

    private requestWeather(location: Location, key: string): Promise<any> {
        console.log(`Fetching data for ${location.longitude}, ${location.latitude}`);
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${key}`);
    }

    public async getData(key: Key) {

        // todo - tell key that it does not work

        if (this.data !== null) {
            return this.data;
        }

        let response = await this.requestWeather(this.location, key.value);
        this.data = response.json();

        return this.data;
    }

    public hasExpired(): boolean {
        return (new Date().getTime() >= (this.startTime + this.lifeTime));
    }
}