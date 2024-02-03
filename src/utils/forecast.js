const request = require("request");
const forecast = (longitude, latitude, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=b87c050a9ad62e5f7b8c740512e0e8ab&query=${latitude},${longitude}&units=f`
    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location!', undefined)
        } else {
            callback(undefined, {
                forecastData:`${body.current.weather_descriptions[0]} Its Currently ${body.current.temperature} degree and Its feels like ${body.current.feelslike} degree .`
            })
        }
    })

}
module.exports = forecast