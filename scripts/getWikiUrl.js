/* eslint-disable no-console */
const path = require('path');
const fs = require('fs');
const https = require('https');
const { promisify } = require('util');

const datafile = path.resolve('./data/plants.json');
const data = require('../data/plants.json');

https.get[promisify.custom] = function getAsync(options) {
  return new Promise((resolve, reject) => {
    https.get(options, (response) => {
      // eslint-disable-next-line no-shadow
      response.end = new Promise((resolve) => response.on('end', resolve));
      resolve(response);
    }).on('error', reject);
  });
};

const get = promisify(https.get);

const getUrl = (plant) => {
  const url = 'https://en.wikipedia.org/wiki/';
  const plantName = plant.replace(' ', '_');
  return `${url}${plantName}`;
};

(async () => {
  try {
    const plants = await Promise.all(data.map(async (plant) => {
      const url = getUrl(plant.scientificName);
      const response = await get(url);
      // if we get a 200 the url is probably good
      const wikipediaUrl = (response.statusCode === 200) ? url : null;

      return {
        ...plant,
        wikipediaUrl,
      };
    }));

    // console.log(JSON.stringify(plants, null, 2))
    fs.writeFile(datafile, JSON.stringify(plants, null, 2), (err) => {
      if (err) throw err;
    });
  } catch (err) {
    console.log(err);
  }
})();
