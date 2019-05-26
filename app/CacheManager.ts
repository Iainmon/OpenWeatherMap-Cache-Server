import Location from './Location';
import { WeatherRequest, WeatherRequestOptions} from './WeatherRequest';
import * as keys from './keys.json';

export default class CacheManager {

    private static requests = Array<WeatherRequest>();

    public static acceptableRaidius = 1; // degree

    private static keys: Array<string> = keys['keys'];

    private static validateLocation(location: Location): boolean {
        return !(isNaN(location.longitude) || isNaN(location.latitude));
    }

    private static newRequest(location: Location) {
        let newRequestOptions = {
            location : location,
        } as WeatherRequestOptions;

        let newWeatherRequest = new WeatherRequest(newRequestOptions);
        
        CacheManager.requests.push(newWeatherRequest);

        return newWeatherRequest.getData(CacheManager.keys[0]);
    }

    public static async response(location: Location): Promise<any> {
        
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

        if (CacheManager.requests.length < 1) {
            return await CacheManager.newRequest(location);
        }

        let distances = Array<Number>();

        CacheManager.requests.forEach( request => {
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
            console.log('Serving cached request.');
            return CacheManager.requests[lowestIndex].getData("");
        } else {
            return await CacheManager.newRequest(location);
        }
    }
}