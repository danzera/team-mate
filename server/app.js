console.log('app.js loaded');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var path = require('path');
var passport = require('./strategies/user_sql.js');
var session = require('express-session');

// ROUTES
var index = require('./routes/index.js');
var user = require('./routes/user.js');
var register = require('./routes/register.js');
var teams = require('./routes/teams.js');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Serve back static files
app.use(express.static(path.join(__dirname, './public')));

// PASSPORT SESSION CONFIGURATION
app.use(session({
   secret: 'secret',
   key: 'user',
   resave: 'true',
   saveUninitialized: false,
   cookie: {maxage: 60000, secure: false}
}));

// START UP PASSPORT SESSIONS
app.use(passport.initialize());
app.use(passport.session());

// ROUTES
app.use('/register', register);
app.use('/user', user);
app.use('/teams', teams);
app.use('/*', index);

// SET PORT
app.set('port', (process.env.PORT || 5000));

// LISTEN
app.listen(app.get("port"), function(){
   console.log("Listening on port:", app.get("port"));
});
