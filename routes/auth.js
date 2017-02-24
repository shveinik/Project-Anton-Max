var express = require('express');
var router  = express.Router();

/* Added requirements */
const bcrypt      = require("bcrypt");
const bcryptSalt  = 10;
const passport = require("passport");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');
const User = require("../models/user");


/* GET Sign up */
router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('signup');
});

/* GET Login */
router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('login');
});

/* GET homepage */
router.get("/main", ensureLoggedIn(), (req, res) => {
  res.render("main", { user: req.user });
});

/* GET homepage */
router.post("/main", ensureLoggedIn(), (req, res) => {
  res.render("main", { user: req.user });
});

/* POST User Info to DB */
router.post('/signup', ensureLoggedOut(), passport.authenticate('signup', {
  successRedirect : '/main',
  failureRedirect : '/signup'
}));

/* POST Login to server to redirect User to homepage */
router.post('/login', ensureLoggedOut(), passport.authenticate('login', {
  successRedirect : '/main',
  failureRedirect : '/'
}));

/* GET logout*/
router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    req.session.destroy();
    res.redirect('/');
});




module.exports = router;
