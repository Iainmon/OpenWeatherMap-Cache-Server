# Open Weather Map Caching Server

## About

Open Weather Map provides a free version for their services, but it is limited to 60 queries per minute. What if you want to create a weather app, but don't want to spend a bunch of money on the API?

This project allows you to connect multiple (or just one) free Open Weather Map accounts. If one key from one account reaches its limit, the next one will be used, without any delay. It also has the ability to cache the API responses so you don't have to waste API calls. The cached responses have a lifetime and are only used if the coordinates are within a certain raidius of the user requesting the data. For example: If someone has requested weather data, and then someone 3 blocks a way also requests weather data, chances are that the weather data is going to be the same.

This probably violates some of Open Weather Map's rules, but I love making weather realted projects, but I do not have a lot of money to spend on API's.

## Usage

- Clone and run `npm install`
- Configure the `app/keys.json` file. Delete the first sample entry. You may add as many free keys form different free accounts in the `keys` array.
- `npm run prod` or `npm run dev`