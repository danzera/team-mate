var express = require('express');
var router = express.Router();
var pool = require('../modules/database.js');

// '/teams' GET - get any teams from the "teams" table for the current user
router.get('/', function(req, res) {
  if (req.isAuthenticated()) { // user is authenticated
    pool.connect(function(err, database, done) {
      if (err) { // connection error
        console.log('error connecting to the database:', err);
      } else { // we connected
        database.query('SELECT "team_id", "name", "manager" FROM "teams" JOIN "users_teams" ON "teams"."id" = "users_teams"."team_id" WHERE "users_teams"."user_id" = $1;', [req.user.id],
          function(queryErr, result) { // query callback
            done();
            if (queryErr) {
              console.log('error making query:', queryErr);
              res.sendStatus(500);
            } else {
              res.send(result);
            }
        }); // end query callback
      } // end DB connection if-else
    }); // end pool.connect
  } else { // user not authenticated
    res.sendStatus(401);
  }
}); // end '/teams' GET

// '/teams' POST - post new team to the database
router.post('/', function(req, res) {
  if (req.isAuthenticated()) { // user is authenticated
    var name = req.body.name;
    pool.connect(function(err, database, done) {
      if (err) { // connection error
        console.log('error connecting to the database:', err);
        res.sendStatus(500);
      } else { // we connected
        database.query('INSERT INTO "teams" ("name", "creator_id") VALUES ($1, $2) RETURNING "id";', [name, req.user.id],
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
  } else {
    res.sendStatus(401);
  }
}); // end '/teams' POST

// '/teams/add-player/:teamId/:userId' POST - add player to the "users_team" in the database
router.post('/add-player', function(req, res) {
  if (req.isAuthenticated()) { // user is authenticated
    var team_id = req.body.team_id;
    var manager = req.body.manager; // should probably be based on the req.user info...?
    pool.connect(function(err, database, done) {
      if (err) { // connection error
        console.log('error connecting to the database:', err);
        res.sendStatus(500);
      } else { // we connected
        database.query('INSERT INTO "users_teams" ("user_id", "team_id", "manager") VALUES ($1, $2, $3);', [req.user.id, team_id, manager],
          function(queryErr, result) { // query callback
            done(); // release connection to the pool
            if (queryErr) {
              console.log('error making query', queryErr);
              res.sendStatus(500);
            } else {
              res.sendStatus(201);
            }
          }); // end query
      } // end if-else
    }); // end pool.connect
  } else { // user not authenticated
    res.sendStatus(401);
  }
}); // end '/teams/add-player' POST


// @TODO EDIT A TEAM
// '/teams/:team_id' PUT - update team info in the database
// router.put('/:team_id', function(req, res) {
//   var team_id = req.params.team_id;
//   console.log('updating current team in teams.js, team_id =', team_id);
//   pool.connect(function(err, database, done) {
//     if (err) { // connection error
//       console.log('error connecting to the database:', err);
//       res.sendStatus(500);
//     } else { // we connected
//       done();
//       res.sendStatus(201);
//     }
//   });
// });
// @TODO DELETE A TEAM
// // --UNUSED AS OF YET--
// // '/teams/:team_id' DELETE - update team info in the database
// router.delete('/:team_id', function(req, res) {
//   var team_id = req.params.team_id;
//   console.log('deleting current team in teams.js, team_id =', team_id);
//   pool.connect(function(err, database, done) {
//     if (err) { // connection error
//       console.log('error connecting to the database:', err);
//       res.sendStatus(500);
//     } else { // we connected
//       done();
//       res.sendStatus(204); // USE 200 IF YOU WANT TO SEND ADDITIONAL DATA IN THE RESPONSE
//     }
//   });
// });

module.exports = router;
