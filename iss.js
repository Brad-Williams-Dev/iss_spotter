const request = require('request');

const fetchMyIP = (callback) => {

  request('https://api.ipify.org?format=json', (error, response, body) => {

    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = JSON.parse(body).ip;
    return callback(null, ip);

  });
};

const fetchCoordsByIP = (ip, callback) => {

  request(`http://ipwho.is/${ip}`, (error, response, body) => {

    if (error) return callback(error, null);

    const data = JSON.parse(body);

    if (!data.success) {
      const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = data;
    return callback(null, { latitude, longitude });

  });
};

fetchISSFlyOverTimes = (coords, callback) => {

  request(`https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {

    if (error) return callback(error, null);

    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const pass = JSON.parse(body).response;
    return callback(null, pass);
  });

};

nextISSTimesForMyLocation = callback => {
  fetchMyIP((error, ip) => {
    if (error) {
      console.log("It didn't work!", error);
      return;
    }
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        console.log(error);
        return;
      }
      coords = { latitude: data.latitude, longitude: data.longitude };
      fetchISSFlyOverTimes(coords, (error, passTime) => {
        if (error) {
          console.log(error);
          return;
        }
        return callback(null, passTime);
      });
    });
  });
};


module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };

