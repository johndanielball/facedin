var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var pg = require('pg');
var passport = require('passport');//./strategies/user_sql.js
var session = require('express-session');

var index = require('./routes/index');
var user = require('./routes/user');
var register = require('./routes/register');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
  secret: 'secret',
  key: 'user',
  resave: 'true',
  saveUninitialized: false,
  cookie: {maxage: 60000, secure: false}
}));

app.use(passport.initialize());
app.use(passport.session());
require('./strategies/user_sql');

app.use('/register', register);
app.use('/user', user);
app.use('/', index);

app.get('/*', function(req, res){
  if(req.params[0]){
    res.sendFile(__dirname + '/public/' + req.params[0]);
  } else {
    res.sendFile(__dirname + '/public/views/index.html');
  }
});

app.listen(5000, function(){
  console.log('app is listening on Port 5000. giggity giggity');
});