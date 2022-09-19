const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../db');
const { buildResponse } = require('../../utils/functions');

// GET all countries 
router.get('/countries', (req, res) => {
  mysqlConnection.query('SELECT * FROM countries', (err, rows) => {
    if (!err) {
      res.json(
        buildResponse(
          'Success',
          200,
          'The countries resource has been loaded successfully.',
          rows,
        )
      );
    } else {
      res.json(
        buildResponse(
          'Error',
          500,
          'An error ocurred while getting the resource.',
        )
      );
    }
  });
});

// GET a single country by name
router.get('/country', (req, res) => {
  const { name } = req.query;
  
  mysqlConnection.query('SELECT * FROM countries WHERE Name = ?', [name], (err, rows) => {
    if (!err) {
      res.json(
        buildResponse(
          'Success',
          200,
          'The country resource has been loaded successfully.',
          rows[0],
        )
      );
    } else {
      res.json(
        buildResponse(
          'Error',
          500,
          'An error ocurred while getting the resource.',
        )
      );
    }
  });
});



module.exports = router;
