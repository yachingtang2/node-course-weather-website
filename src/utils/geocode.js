const request = require('request');

const geocode = (address, callback) => {
  
  const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoieWFjaGluZ3RhbmciLCJhIjoiY2p3dHdpaHRwMGF1bjN5bzV3OXFmdTgzdCJ9.i2WSttCEHouVVq4cEkPOyQ&limit=1';

  request({
    url,
    json: true
  }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to location service!');
    } else if (body.features.length === 0) {
      callback('Unable to find location.  Try another search.');
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;