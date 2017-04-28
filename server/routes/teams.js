console.log('teams.js loaded');
var express = require('express');
var router = express.Router();
var pool = require('../modules/database.js');

// '/teams' POST - post new team to the database
router.post('/', function(req, res) {
  console.log('posting new team in teams.js');
  pool.connect(function(err, database, done) {
    if (err) { // connection error
      console.log('error connecting to the database:', err);
      res.sendStatus(500);
    } else { // we connected
      done();
      res.sendStatus(201);
    }
  });
});

module.exports = router;
