var express = require('express');
var router = express.Router();
var pool = require('../modules/database.js');

// '/games' POST - post new game to the database
router.post('/', function(req, res) {
  console.log(req.body);
  var team_id = req.body.teamId;
  var date = req.body.gameDate;
  var time = req.body.gameTime;
  var location = req.body.location;
  var opponent = req.body.opponent;
  pool.connect(function(err, database, done) {
    if (err) { // connection error
      console.log('error connecting to the database:', err);
      res.sendStatus(500);
    } else { // we connected
      // INSERT INTO "games" ("team_id", "date", "time", "location", "opponent") VALUES (12, '2017-05-08', '09:30:00', 'Taft 2', 'The Roys') RETURNING "id";
      database.query('INSERT INTO "games" ("team_id", "date", "time", "location", "opponent") VALUES ($1, $2, $3, $4, $5) RETURNING "id";', [team_id, date, time, location, opponent],
        function(queryErr, result) { // query callback
          done(); // release connection to the pool
          if (queryErr) {
            console.log('error making query', queryErr);
            res.sendStatus(500);
          } else {
            console.log('successful insert into "teams"', result);
            res.send(result);
          }
        }); // end query
    } // end if-else
  }); // end pool.connect
}); // end '/games' POST

// @TODO --ROUTE WORKING-- COME BACK TO THIS WHEN WE COME BACK TO THE TEAM-SCHEDULE BRANCH
// '/games/:teamId' GET - get team's games from the "games" table
router.get('/:teamId', function(req, res) {
  var team_id = req.params.teamId;
  console.log('getting games for team_id', team_id);
  pool.connect(function(err, database, done) {
    if (err) { // connection error
      console.log('error connecting to the database:', err);
      res.sendStatus(500);
    } else { // we connected
      // SELECT * FROM "games" WHERE "team_id" = 12 ORDER BY "date";
      database.query('SELECT * FROM "games" WHERE "team_id" = $1 ORDER BY "date";', [team_id],
        function(queryErr, result) { // query callback
          done(); // release connection to the pool
          if (queryErr) {
            console.log('error making query', queryErr);
            res.sendStatus(500);
          } else {
            console.log('successful insert into "teams"', result);
            res.send(result);
          }
        }); // end query callback
      } // end if-else
    }); // end pool.connect
  }); // end '/games/:teamId' GET

module.exports = router;
