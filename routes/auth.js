var express = require('express');
var router = express.Router();

/* GET Login */
router.get('/login', function(req, res, next) {
  res.render('login');
});

/* GET Sign up */
router.get('/signup', function(req, res, next) {
  res.render('signup');
});

module.exports = router;
