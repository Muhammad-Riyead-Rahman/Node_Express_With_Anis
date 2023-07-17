require("dotenv").config();

const bcrypt = require("bcrypt");
const passport = require("passport");

const User = require("../models/user.model");

const GoogleStrategy = require("passport-google-oauth20").Strategy;


passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:3000/auth/google/callback"
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ googleId: profile.id }, (err, user) => {
        if (err) return cb(err, null);

        //not a user; so create a new user with new google id
        if (!user) {
          let newUser = new Userl({
            googleId: profile.id,
            username: profile.displayName
          });
          newUser.save();

          return cb(null, newUser);
        } else {
          //if we find an user just return user
          return cb(null, user);
        }
      })
    }
  )
);


//create session id
//whenever we login it creates user id inside session
passport.serializeUser((user, done) => {
  done(null, user.id);
});


//find session info using session id
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, false);
  }
});

