// require passport
const passport = require("passport");

// require .env file
require("dotenv").config();

// require model
const User = require("../models/user.model");

// require passport -jwt strategy & token bearer extractor form token string
const JwtStrategy = require("passport-jwt").Strategy, ExtractJwt = require("passport-jwt").ExtractJwt;


// for adding token & secret key
const opts = {};

// 1st line: it's remove bearer form token
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY;


// prepare passport jwt
passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {

    User.findOne({ id: jwt_payload.id }, function (err, user) {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });

  })
);
