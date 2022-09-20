const express = require('express');
const router = express.Router();
const axios = require('axios');
const { buildResponse } = require('../../utils/functions');

const countries = {
  Europe: 'http://3.101.113.126/Server-Europe-Continent/index.php',
  Africa: 'http://3.85.32.230/Server-Africa-Continent/index.php',
  'North America': 'http://34.226.202.66/server-america-continent/index.php',
  'South America': 'http://34.226.202.66/server-america-continent/index.php',
};

const capitalize = (str) => {
  const lower = str.toLowerCase();
  return lower.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
};

// GET all countries 
router.get('/countries', async(req, res) => {
  try {
    const { name } = req.query;
    const continent = await axios.get(`https://restcountries.com/v3.1/name/${name}`);
    const response = await axios.get(`${countries[continent?.data[0]?.continents[0]]}?Name=${name}`);
    res.json(
      buildResponse(
        'Success',
        200,
        'The countries resource has been loaded successfully.',
        response?.data,
      )
    );
  } catch (e) {
    const { response : { data }} = e
    res.json(
      buildResponse(
        'Error',
        data.status,
        data.message,
      )
    );
  }
});

// GET all countries 
router.get('/countries-by-continent', async(req, res) => {
  try {
    const { continent } = req.query;
    const response = await axios.get(`${countries[capitalize(continent)]}`);
    res.json(
      buildResponse(
        'Success',
        200,
        'The countries resource has been loaded successfully.',
        response?.data,
      )
    );
  } catch (e) {
    res.json(
      buildResponse(
        'Error',
        404,
        'Not found',
      )
    );

  }
});

module.exports = router;
