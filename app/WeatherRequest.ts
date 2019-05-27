import Location from './Location'
import fetch from 'node-fetch'
import Key from './Key';
import { response } from 'express';

export interface WeatherRequestOptions {
    location: Location;
    lifeTime?: number;
}

export class WeatherRequest {

    public location: Location;

    public static keys = Array<Key>();

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

    private static requestWeather(location: Location, key: string): Promise<any> {
        console.log(`Fetching data for ${location.longitude}, ${location.latitude}`);
        return fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.latitude}&lon=${location.longitude}&appid=${key}`);
    }

    public async getData() {

        if (this.data !== null) {
            return this.data;
        }


        let key: Key | null;
        let response: Response;
        do {
            key = WeatherRequest.getWorkingKey();
            if (key == null) {
                return {
                    error : 529,
                    message : 'No working keys.',
                    request : {
                        longitude : this.location.longitude,
                        latitude : this.location.latitude
                    }
                }
            }

            response = await WeatherRequest.requestWeather(this.location, key.value);

            if (response.status == 429) {
                key.failed();
            }

        } while (response.status == 429);

        this.data = response.json();

        return this.data;
    }

    public hasExpired(): boolean {
        return (new Date().getTime() >= (this.startTime + this.lifeTime));
    }

    private static getWorkingKey(): Key | null {
        for (let i = 0; i < WeatherRequest.keys.length; i++) {
            if (WeatherRequest.keys[i].isValid) {
                return WeatherRequest.keys[i];
            }
        }
        return null;
    }
}