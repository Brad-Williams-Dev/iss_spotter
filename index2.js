const { nextISSTimesForMyLocation } = require('./iss_promised');

const convertPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass will be ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation()
  .then((passTimes) => {
    convertPassTimes(passTimes);
  })
  .catch((error) => {
    console.log('Sorry, it did not work! :', error.message);
  })




