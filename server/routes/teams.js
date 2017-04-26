console.log('teams.js loaded');
var express = require('express');
var router = express.Router();
var getPool = require('../modules/database.js');
var pool = getPool();
// console.log('pool at teams.js load:', pool);

// '/teams' POST - post new team to the database
router.post('/', function(req, res) {
  // var pool = getPool();
  console.log('pool inside of router.post:', pool);
  pool.connect(function(err, database, done) {
    if (err) { // connection error
      console.log('error connecting to the database:', err);
      res.sendStatus(500);
    } else { // we connected
      res.sendStatus(201);
    }
  });
});

module.exports = router;
