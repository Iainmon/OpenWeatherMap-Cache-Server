"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WeatherRequest = /** @class */ (function () {
    function WeatherRequest(options) {
        this.data = null;
        this.lifeTime = WeatherRequest.defaultLifeTime;
        this.location = options.location;
        if (options.lifeTime) {
            this.lifeTime = options.lifeTime;
        }
    }
    WeatherRequest.prototype.requestWeather = function (location, key) {
        console.log("Fetching data for " + location.longitude + ", " + location.latitude);
        return fetch("https://api.openweathermap.org/data/2.5/weather?lat=" + location.latitude + "&lon=" + location.longitude + "&appid=" + key);
    };
    WeatherRequest.prototype.getData = function (key) {
        if (this.data === null) {
            return this.requestWeather(this.location, key);
        }
        else {
            return this.data;
        }
    };
    WeatherRequest.defaultLifeTime = 15 * 1000 * 60; // 15 minutes
    return WeatherRequest;
}());
exports.WeatherRequest = WeatherRequest;
