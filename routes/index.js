var express = require('express');
var router = express.Router();
var passport = require('passport');

router.post('/',
  passport.authenticate('local', {
    successRedirect: '/views/user.html',
    failureRedirect: '/views/failure.html'
  })
);

module.exports = router;