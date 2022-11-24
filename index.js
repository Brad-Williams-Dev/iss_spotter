const { nextISSTimesForMyLocation } = require('./iss');


const convertPassTimes = function(passTime) {
  for (const pass of passTime) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass will be ${datetime} for ${duration} seconds!`);
  }
};

nextISSTimesForMyLocation((error, passTime) => {
  if (error) {
    return console.log("It didn't work!", error);
  }

  convertPassTimes(passTime);
});

