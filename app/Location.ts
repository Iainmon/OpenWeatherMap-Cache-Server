export default class Location {

    public longitude: number;
    public latitude: number;

    constructor(longitude: number, latitude: number) {
        this.longitude = longitude;
        this.latitude = latitude;
    }

    public getDistance(location: Location): number {

        let longitudeDifference = location.longitude - this.longitude;
        let latitudeDifference = location.latitude - this.latitude;

        longitudeDifference *= longitudeDifference;
        latitudeDifference *= latitudeDifference;

        let distance = longitudeDifference + latitudeDifference;

        return Math.sqrt(distance);
    }
}
