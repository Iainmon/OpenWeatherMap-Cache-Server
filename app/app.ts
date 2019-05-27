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

    CacheManager.response(userLocation).then( response => {
        res.json(response);
    });

});

app.listen(3000, function () {
    CacheManager.init();
    console.log('Open Weather Map Cache listening on port 3000!');
});


