var express = require('express');
var router = express.Router();
var pool = require('../modules/database.js');

// '/invite/:username' GET - get any invites from the "invites" table for the specified username
router.get('/:username', function(req, res) {
var username = req.params.username.toString();
console.log('getting invites for username', username);
pool.connect(function(err, database, done) {
  if (err) { // connection error
    console.log('error connecting to the database:', err);
    res.sendStatus(500);
  } else { // we connected
    database.query('SELECT * FROM "invites" JOIN "teams" ON "invites"."team_id" = "teams"."id" WHERE "invites"."email" = $1;', [username],
      function(queryErr, result) { // query callback
        done(); // release connection to the pool
        if (queryErr) {
          console.log('error making query', queryErr);
          res.sendStatus(500);
        } else {
          console.log('successful got any & all of the users invites', result);
          res.send(result);
        }
      }); // end query callback
    } // end if-else
  }); // end pool.connect
}); // end '/games/:teamId' GET

// '/invite' POST - post a new invite to the 'invites' table
router.post('/', function(req, res) {
  console.log(req.body);
  var team_id = req.body.teamId;
  var email = req.body.email;
  var manager = req.body.isManager;;
  pool.connect(function(err, database, done) {
    if (err) { // connection error
      console.log('error connecting to the database:', err);
      res.sendStatus(500);
    } else { // we connected
      database.query('INSERT INTO "invites" ("team_id", "email", "manager") VALUES ($1, $2, $3);', [team_id, email, manager],
        function(queryErr, result) { // query callback
          done(); // release connection to the pool
          if (queryErr) {
            console.log('error making query', queryErr);
            res.sendStatus(500);
          } else {
            console.log('successful insert into "invites"', result);
            res.send(result);
          }
        }); // end query
    } // end if-else
  }); // end pool.connect
}); // end '/invite' POST

// '/invite' DELETE - delete an invite from the 'invites' table
router.delete('/:teamId/:username', function(req, res) {
  var team_id = req.params.teamId;
  var email = req.params.username;
  pool.connect(function(err, database, done) {
    if (err) { // connection error
      console.log('error connecting to the database:', err);
      res.sendStatus(500);
    } else { // we connected
      database.query('DELETE FROM "invites" WHERE ("team_id", "email") = ($1, $2);', [team_id, email],
        function(queryErr, result) { // query callback
          done(); // release connection to the pool
          if (queryErr) {
            console.log('error making query', queryErr);
            res.sendStatus(500);
          } else {
            console.log('successful insert into "invites"', result);
            res.send(result);
          }
        }); // end query
    } // end if-else
  }); // end pool.connect
}); // end '/invite' DELETE

module.exports = router;