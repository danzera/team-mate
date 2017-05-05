var express = require('express');
var router = express.Router();
var pool = require('../modules/database.js');

// '/teams/:userId' GET - get all of a users teams from the database
router.get('/:userId', function(req, res) {
  var user_id = req.params.userId;
  console.log(user_id, 'is requesting all their teams');
  pool.connect(function(err, database, done) {
    if (err) { // connection error
      console.log('error connecting to the database:', err);
    } else { // we connected
      database.query('SELECT * FROM "teams" JOIN "users_teams" ON "teams"."id" = "users_teams"."team_id" WHERE "users_teams"."user_id" = $1;', [user_id],
        function(queryErr, result) { // query callback
          done();
          if (queryErr) {
            console.log('error making query:', queryErr);
            res.sendStatus(500);
          } else {
            console.log('got users_teams/teams', result);
            res.send(result);
          }
      }); // end query
    } // end if-else
  }); // end pool.connect
}); // end '/teams/:userId' GET

// '/teams' POST - post new team to the database
router.post('/', function(req, res) {
  var name = req.body.name;
  var creator_id = req.body.creatorId;
  pool.connect(function(err, database, done) {
    if (err) { // connection error
      console.log('error connecting to the database:', err);
      res.sendStatus(500);
    } else { // we connected
      database.query('INSERT INTO "teams" ("name", "creator_id") VALUES ($1, $2) RETURNING "id";', [name, creator_id],
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
}); // end '/teams' POST

// '/teams/add-player/:teamId/:userId' POST - add player to the "users_team" in the database
router.post('/add-player/:teamId/:userId', function(req, res) {
  var team_id = req.params.teamId;
  var user_id = req.params.userId;
  var joined = req.body[team_id].hasJoined;
  var manager = req.body[team_id].isManager;
  pool.connect(function(err, database, done) {
    if (err) { // connection error
      console.log('error connecting to the database:', err);
      res.sendStatus(500);
    } else { // we connected
      database.query('INSERT INTO "users_teams" ("user_id", "team_id", "joined", "manager") VALUES ($1, $2, $3, $4);', [user_id, team_id, joined, manager],
        function(queryErr, result) { // query callback
          done(); // release connection to the pool
          if (queryErr) {
            console.log('error making query', queryErr);
            res.sendStatus(500);
          } else {
            console.log('successful insert into "users_teams" on the /teams/add-player route');
            res.sendStatus(201);
          }
        }); // end query
    } // end if-else
  }); // end pool.connect
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
