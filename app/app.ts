import Location from './Location'
import CacheManager from './CacheManager';

import express = require('express');

const app: express.Application = express();

app.get('/', function (req, res) {
    res.json({
        ping : 'pong'
    });
});

app.get('/weather/', function (req, res) {

    let userLocation = new Location(parseFloat(req.query.longitude), parseFloat(req.query.latitude));

    CacheManager.weatherResponse(userLocation).then( response => {
        if (!!response.error) {
            res.status(500);
        }
        res.json(response);
    });

});

app.get('/forecast/', function (req, res) {

    let userLocation = new Location(parseFloat(req.query.longitude), parseFloat(req.query.latitude));

    CacheManager.forecastResponse(userLocation).then( response => {
        if (!!response.error) {
            res.status(500);
        }
        res.json(response);
    });

});

app.listen(3000, function () {
    CacheManager.init();
    console.log('Open Weather Map Cache listening on port 3000!');
});


