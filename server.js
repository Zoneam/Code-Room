const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var cookieParser = require('cookie-parser');
// Always require near the top
require('dotenv').config();
// Connect to the server
// Make sure that dotenv is already required
require('./config/database');
require('./config/passport');
const app = express();

app.use(logger('dev'));
// body parser middleware - adds properties to req.body
app.use(express.json());
// Configure both serve-favicon & static
// middleware to server from the 'build' folder
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(cookieParser());
// Middleware to verify token and assign user object of payload to req.user.
// Be sure to mount before routes
app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(function (req, res, next) {
  res.locals.user = req.user;
  next();
});

app.use(require('./config/checkToken'));

app.use('/', require('./controllers/api/auth'));
// Put API routes here, before the "catch all" route
app.use('/api/users', require('./routes/api/users'));

// Protect the api routes below from anonymous users
const ensureLoggedIn = require('./config/ensureLoggedIn');
app.use('/api/posts',ensureLoggedIn, require('./routes/api/posts'));

// The following "catch all" route (note the *) 
// is necessary to return the index.html on ALL
// non-AJAX requests
app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Configure express app to listen on port 3001
// to avoid conflicting with the react server
const port = process.env.PORT || 3001;

app.listen(port, function() {
  console.log(`Express app running on port ${port}`);
});