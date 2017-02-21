var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var flash        = require('connect-flash');

/* Added Requirements */
const session        = require("express-session");
const bcrypt         = require("bcrypt");
const passport       = require("passport");
const LocalStrategy  = require("passport-local").Strategy;
const expressLayouts = require('express-ejs-layouts');
const User           = require("./models/user");
const Offer          = require("./models/offer");

const mongoose       = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Project2");

var index = require('./routes/index');
var auth = require('./routes/auth');
var offer = require('./routes/offers');

var app = express();

// Configuration and use of auth middlewares
app.use(session({
  secret: 'project2',
  resave: false,
  saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

// Passport confiugrations
passport.serializeUser((user, cb) => {
  cb(null, user.id);
});

passport.deserializeUser((id, cb) => {
  User.findOne({ "_id": id }, (err, user) => {
    if (err) { return cb(err); }
    cb(null, user);
  });
});

// Signing Up
passport.use('signup', new LocalStrategy(
  { passReqToCallback: true },
  (req, username, password, next) => {

    // To avoid race conditions
            User.findOne({

            'username': username
        }, (err, user) => {
            if (err){ return next(err); }

            if (user) {
              console.log('lol');
                return next(null, false);
            } else {
              console.log("Hello!");
                // Destructure the body
                const { username, email, password } = req.body;
                const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                const newUser = new User({
                  username,
                  email,
                  password: hashPass
                });

                newUser.save((err) => {
                    if (err){ next(err); }
                    return next(null, newUser);
                });
            }
        });

}));

//Login in
passport.use('login', new LocalStrategy((username, password, next) => {
  User.findOne({ username }, (err, user) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return next(null, false, { message: "Incorrect username" });
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return next(null, false, { message: "Incorrect password" });
    }

    return next(null, user);
  });
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');

app.use(expressLayouts);
app.set('layout', 'layouts/main-layout');

app.use('/', index);
app.use('/', auth);
app.use('/', offer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
