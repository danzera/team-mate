console.log('teams.js loaded');
var express = require('express');
var router = express.Router();
var pool = require('../modules/database.js');

// --UNUSED AS OF YET--
// '/teams' GET - get team info from the database
router.get('/', function(req, res) {
  console.log('posting new team in teams.js');
  pool.connect(function(err, database, done) {
    if (err) { // connection error
      console.log('error connecting to the database:', err);
      res.sendStatus(500);
    } else { // we connected
      done();
      res.sendStatus(200);
    }
  });
});

// --UNUSED AS OF YET--
// '/teams' POST - post new team to the database
router.post('/', function(req, res) {
  console.log('posting new team in teams.js, team:', req.body);
  var name = req.body.name;
  var creator_id = req.body.creatorId;
  pool.connect(function(err, database, done) {
    if (err) { // connection error
      console.log('error connecting to the database:', err);
      res.sendStatus(500);
    } else { // we connected
      // INSERT INTO "teams" ("name", "creator_id") VALUES ('Dukes', 6);
      database.query('INSERT INTO "teams" ("name", "creator_id") VALUES ($1, $2);',[name, creator_id],
        function(queryErr, result) { // query callback
          done(); // release connection to the pool
          if (queryErr) {
            console.log('error making query', queryErr);
            res.sendStatus(500);
          } else {
            console.log('successful insert into "teams"', result);
            res.send(201);
          }
        }); // end query callback
    } // end if-else
  }); // end pool.connect
}); // end '/teams' POST

// --UNUSED AS OF YET--
// '/teams/:team_id' PUT - update team info in the database
router.put('/:team_id', function(req, res) {
  var team_id = req.params.team_id;
  console.log('updating current team in teams.js, team_id =', team_id);
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

// --UNUSED AS OF YET--
// '/teams/:team_id' DELETE - update team info in the database
router.delete('/:team_id', function(req, res) {
  var team_id = req.params.team_id;
  console.log('deleting current team in teams.js, team_id =', team_id);
  pool.connect(function(err, database, done) {
    if (err) { // connection error
      console.log('error connecting to the database:', err);
      res.sendStatus(500);
    } else { // we connected
      done();
      res.sendStatus(204); // USE 200 IF YOU WANT TO SEND ADDITIONAL DATA IN THE RESPONSE
    }
  });
});

module.exports = router;
