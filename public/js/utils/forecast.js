const request = require('request');

const forecast = (lat, long, callback) => {
    url = `https://api.darksky.net/forecast/dae2ad407f40be96bda37c0694a7670a/${lat},${long}`
    
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to DarkSky Api.', undefined)
        } else if (body.error) {
            callback(body.error, undefined)
        } else {
            callback(undefined, `It is currently ${body.currently.summary}. It's ${body.currently.temperature}℉, and there is a ${body.currently.precipProbability}% chance of rain.`
            )
        }
    })
}

module.exports = forecast