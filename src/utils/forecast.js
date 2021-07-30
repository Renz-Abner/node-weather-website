const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=3b6f624d4090355ee7a055e931423da1&query=" +
    latitude +
    "," +
    longitude +
    "&units=m";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        "Unable to connect to location services. Check your internet connection",
        undefined
      );
    } else if (body.error) {
      callback("Unable to find the target location. Check input", undefined);
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degrees out. It feels like ${body.current.feelslike} degrees."`
      );
    }
  });
};
module.exports = forecast;
