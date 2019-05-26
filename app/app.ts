import Location from './Location'
import CacheManager from './CacheManager';

// lib/app.ts
import express = require('express');

// Create a new express application instance
const app: express.Application = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});

app.get('/weather/', function (req, res) {

    let userLocation = new Location(parseFloat(req.query.longitude), parseFloat(req.query.latitude));

    CacheManager.response(userLocation).then( response => {
        res.json(response);
    });
});
