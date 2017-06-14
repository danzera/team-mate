var express = require('express');
var router = express.Router();
var pool = require('../modules/database.js');


// '/games/:teamId' GET - get team's games from the "games" table
router.get('/:teamId', function(req, res) {
var team_id = req.params.teamId;
pool.connect(function(err, database, done) {
  if (err) { // connection error
    console.log('error connecting to the database:', err);
    res.sendStatus(500);
  } else { // we connected
    database.query('SELECT * FROM "games" WHERE "team_id" = $1 ORDER BY "date";', [team_id],
      function(queryErr, result) { // query callback
        done(); // release connection to the pool
        if (queryErr) {
          console.log('error making query on /teams/:teamId GET', queryErr);
          res.sendStatus(500);
        } else {
          res.send(result);
        }
      }); // end query callback
    } // end if-else
  }); // end pool.connect
}); // end '/games/:teamId' GET

// '/games' POST - post new game to the database
router.post('/', function(req, res) {
  var team_id = req.body.team_id;
  var date = req.body.date;
  var time = req.body.time;
  var location = req.body.location;
  var opponent = req.body.opponent;
  pool.connect(function(err, database, done) {
    if (err) { // connection error
      console.log('error connecting to the database:', err);
      res.sendStatus(500);
    } else { // we connected
      database.query('INSERT INTO "games" ("team_id", "date", "time", "location", "opponent") VALUES ($1, $2, $3, $4, $5) RETURNING "id";', [team_id, date, time, location, opponent],
        function(queryErr, result) { // query callback
          done(); // release connection to the pool
          if (queryErr) {
            console.log('error making query on /teams POST', queryErr);
            res.sendStatus(500);
          } else {
            res.send(result);
          }
        }); // end query
    } // end if-else
  }); // end pool.connect
}); // end '/games' POST

module.exports = router;
