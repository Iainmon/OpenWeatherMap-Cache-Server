"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Location = /** @class */ (function () {
    function Location(longitude, latitude) {
        this.longitude = longitude;
        this.latitude = latitude;
    }
    Location.prototype.getDistance = function (location) {
        var longitudeDifference = location.longitude - this.longitude;
        var latitudeDifference = location.latitude - this.latitude;
        longitudeDifference *= longitudeDifference;
        latitudeDifference *= latitudeDifference;
        var distance = longitudeDifference + latitudeDifference;
        return Math.sqrt(distance);
    };
    return Location;
}());
exports.default = Location;
