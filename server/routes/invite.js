var express = require('express');
var router = express.Router();
var pool = require('../modules/database.js');
var mailer = require('../modules/mail.js');

// '/invite' GET - get any invites from the "invites" table for the current user
router.get('/', function(req, res) {
  if (req.isAuthenticated()) { // user is authenticated
    pool.connect(function(err, database, done) {
      if (err) { // connection error
        console.log('error connecting to the database:', err);
        res.sendStatus(500);
      } else { // we connected
        database.query('SELECT "team_id", "name", "manager" FROM "invites" JOIN "teams" ON "invites"."team_id" = "teams"."id" WHERE "invites"."email" = $1;', [req.user.username],
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
      } // end DB connection if-else
    }); // end pool.connect
  } else { // user not authenticated
    res.sendStatus(401);
  }
}); // end '/games' GET

// '/invite' POST - post a new invite to the 'invites' table
router.post('/', function(req, res) {
  if (req.isAuthenticated()) { // user is authenticated
    var team_id = req.body.team_id;
    var teamName = req.body.teamName;
    var email = req.body.email;
    var manager = req.body.manager;
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
            } else { // invite added to the DB
              // send email invitation
              mailer.invite(email, teamName);
              console.log('successful insert into "invites"', result);
              res.send(result);
            }
          }); // end query
      } // end if-else
    }); // end pool.connect
  } else { // user not authenticated
    res.sendStatus(401);
  }
}); // end '/invite' POST

// '/invite' DELETE - delete an invite from the 'invites' table
router.delete('/:teamId', function(req, res) {
  if (req.isAuthenticated()) { // user is authenticated
    var team_id = req.params.teamId;
    pool.connect(function(err, database, done) {
      if (err) { // connection error
        console.log('error connecting to the database:', err);
        res.sendStatus(500);
      } else { // we connected
        database.query('DELETE FROM "invites" WHERE ("team_id", "email") = ($1, $2);', [team_id, req.user.username],
          function(queryErr, result) { // query callback
            done(); // release connection to the pool
            if (queryErr) {
              console.log('error making query', queryErr);
              res.sendStatus(500);
            } else {
              console.log('successful deletion from "invites"', result);
              res.send(result);
            }
          }); // end query
      } // end if-else
    }); // end pool.connect
  } else { // user not authenticated
    res.sendStatus(401);
  }
}); // end '/invite/:teamId' DELETE

module.exports = router;