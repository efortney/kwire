/**
 * Index for SO-clone server.
 * 
 * By convention, the index.js file of a folder in js is the root or default file. 
 * This is where we will import all of our back end logic, it's similar to a main class in java. 
 * Our server framework express, will be used to create our backend routes for our api.
 */

/**
 * Require is similar to import in java, its basically just pulling in a bunch of code (known as an API). 
 */
const express = require('express');
const passport = require('passport');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const bodyParser = require('body-parser');

// This can be confusing. Whats happening here is we are declaring a var called app, and anytime you call it,
// it will call the express library.
const app = express();

// port our server is listening on
const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: ['sfasdfajkwerhailsdkjfnalekrsjhakj3q48p9rdsfyw398547sidoufha']
  })
);

// register models
require('./models/userSchema');
require('./models/questionSchema');

const Questions = mongoose.model('questions');
const Users = mongoose.model('users');

app.use(passport.initialize());
app.use(passport.session());

require('./access_management')(app);
require('./access_management/mongoose');
require('./access_management/passport');
require('./dev_dashboard')(app);
require('./questions')(app, Questions, Users);

if (process.env.NODE_ENV === 'production') {
  // Express will serve up production assets
  // like our main.js file, or main.css file!
  app.use(express.static('client/build'));

  // Express will serve up the index.html file
  // if it doesn't recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

console.log(`app running on ${PORT}`);
app.listen(PORT);
