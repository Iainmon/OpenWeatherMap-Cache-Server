import Location from './Location';
import { WeatherRequest, WeatherForecastRequest, WeatherRequestOptions} from './WeatherRequest';
import * as keys from './keys.json';
import Key from './Key';
import Thread from 'async-threading';

export default class CacheManager {

    private static weatherRequests = Array<WeatherRequest>();
    private static forecastRequests = Array<WeatherForecastRequest>();
    private static requestValidator: Thread;

    public static acceptableRaidius = 0.19; // degree

    public static init(): void {
        keys['keys'].forEach(key => {
            WeatherRequest.keys.push( new Key(key) );
        });
        CacheManager.requestValidator = new Thread( () => {
            for (let i = 0; i < CacheManager.weatherRequests.length; i++) {
                if (CacheManager.weatherRequests[i].hasExpired()) {
                    CacheManager.weatherRequests.splice(i, 1);
                    i--;
                }
            }
            for (let i = 0; i < CacheManager.forecastRequests.length; i++) {
                if (CacheManager.forecastRequests[i].hasExpired()) {
                    CacheManager.forecastRequests.splice(i, 1);
                    i--;
                }
            }
        }, 60 * 1000, false);
    }

    private static validateLocation(location: Location): boolean {
        return !(isNaN(location.longitude) || isNaN(location.latitude));
    }

    private static newWeatherRequest(location: Location) {
        let newRequestOptions = {
            location : location,
        } as WeatherRequestOptions;

        let newWeatherRequest = new WeatherRequest(newRequestOptions);
        
        CacheManager.weatherRequests.push(newWeatherRequest);

        return newWeatherRequest.getWeatherData();
    }

    public static async weatherResponse(location: Location): Promise<any> {
        
        if (!CacheManager.validateLocation(location)) {
            return {
                error : 400,
                message : 'Location not valid.',
                request : {
                    longitude : location.longitude,
                    latitude : location.latitude
                }
            }
        }

        if (CacheManager.weatherRequests.length < 1) {
            return await CacheManager.newWeatherRequest(location);
        }

        let distances = Array<Number>();

        CacheManager.weatherRequests.forEach( request => {
            distances.push(request.location.getDistance(location));
        });

        let lowestNumber = distances[0];
        let lowestIndex = 0;

        for (let i = 0; i < distances.length; i++) {
            if (distances[i] < lowestNumber) {
                lowestNumber = distances[i];
                lowestIndex = i;
            }
        }

        if (lowestNumber <= CacheManager.acceptableRaidius) {
            return CacheManager.weatherRequests[lowestIndex].getWeatherData(); // Serves the cached response.
        } else {
            return await CacheManager.newWeatherRequest(location); // Creates a new response, and waits for it to resolve.
        }
    }

    private static newForecastRequest(location: Location) {
        let newRequestOptions = {
            location : location,
        } as WeatherRequestOptions;

        let newForecastRequest = new WeatherForecastRequest(newRequestOptions);
        
        CacheManager.forecastRequests.push(newForecastRequest);

        return newForecastRequest.getForecastData();
    }

    public static async forecastResponse(location: Location): Promise<any> {
        
        if (!CacheManager.validateLocation(location)) {
            return {
                error : 400,
                message : 'Location not valid.',
                request : {
                    longitude : location.longitude,
                    latitude : location.latitude
                }
            }
        }

        if (CacheManager.forecastRequests.length < 1) {
            return await CacheManager.newForecastRequest(location);
        }

        let distances = Array<Number>();

        CacheManager.forecastRequests.forEach( request => {
            distances.push(request.location.getDistance(location));
        });

        let lowestNumber = distances[0];
        let lowestIndex = 0;

        for (let i = 0; i < distances.length; i++) {
            if (distances[i] < lowestNumber) {
                lowestNumber = distances[i];
                lowestIndex = i;
            }
        }

        if (lowestNumber <= CacheManager.acceptableRaidius) {
            return CacheManager.forecastRequests[lowestIndex].getForecastData(); // Serves the cached response.
        } else {
            return await CacheManager.newForecastRequest(location); // Creates a new response, and waits for it to resolve.
        }
    }
}
