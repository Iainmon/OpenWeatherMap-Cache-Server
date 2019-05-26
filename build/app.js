"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var Location_1 = __importDefault(require("./Location"));
var CacheManager_1 = __importDefault(require("./CacheManager"));
// lib/app.ts
var express = require("express");
// Create a new express application instance
var app = express();
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
app.get('/weather/', function (req, res) {
    var userLocation = new Location_1.default(req.params.longitude, req.params.latitude);
    res.json(CacheManager_1.default.response(userLocation));
});
