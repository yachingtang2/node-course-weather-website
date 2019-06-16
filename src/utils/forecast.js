const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = 'https://api.darksky.net/forecast/cbf42712862285e830c6f052e81108c0/' + latitude + ',' + longitude + '?lang=zh-tw';

  request({
    url,
    json: true
  }, (error, { body }) => {
    if (error) {
      console.log('Unable to connect to weather service');
    } else if (body.error) {
      console.log('Unable to find location');
    } else {
      const {
        daily,
        currently
      } = body;

      console.log('YCT - daily = ', daily);
      const data = daily.data[0].summary + ' Today\'s high is ' + daily.data[0].temperatureHigh + ' degrees and low is ' + daily.data[0].temperatureLow + ' degrees. It is currently ' + currently.temperature + ' degrees out. There is a ' + currently.precipProbability + '% chance of rain.';
      callback(undefined, data);
    }
  });
};

module.exports = forecast;