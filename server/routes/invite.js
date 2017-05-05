var express = require('express');
var router = express.Router();
var pool = require('../modules/database.js');

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

module.exports = router;