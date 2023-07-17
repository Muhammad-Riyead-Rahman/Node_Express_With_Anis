// require .env file
require("dotenv").config();


// require express, cors, bycrypt, jwt, passport
const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const passport = require("passport");

// rquire model from models folder
const User = require("./models/user.model");


// describe slt rounds number
const saltRounds = 10;


// create app
const app = express();

// require database from config folder
require("./config/database");


// use cors, express url parser ,, json perser & passport
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(passport.initialize());


// require passpost for generating access token
require("./config/passport");




// home route
app.get("/", (req, res) => {
  res.send("<h1> Welcome to the server </h1>");
});



// register route
app.post("/register", async (req, res) => {

  try {
    // checking req.body.username already exist or not
    const user = await User.findOne({ username: req.body.username });

    if (user) return res.status(400).send("User already exists");



    // if user doesn't exist, then create new user and save him
    bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
      const newUser = new User({
        username: req.body.username,
        password: hash,
      });
      
      await newUser
        .save()
        .then((user) => {
          res.send({
            success: true,
            message: "User is created Successfully",
            user: {
              id: user._id,
              username: user.username,
            },
          });
        })
        .catch((error) => {
          res.send({
            success: false,
            message: "User is not created",
            error: error,
          });
        });
    });
  } catch (error) {
    res.status(500).send(error.message);
  }

});



// login route
app.post("/login", async (req, res) => {
  const user = await User.findOne({ username: req.body.username });

  // handle user doesn't found
  if (!user) {
    return res.status(401).send({
      success: false,
      message: "User is not found",
    });
  }


  // if user found, then handle un-matched password
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).send({
      success: false,
      message: "Incorrect password",
    });
  }


  // creating payload
  const payload = {
    id: user._id,
    username: user.username,
  };


  // creating token
  const token = jwt.sign(payload, process.env.SECRET_KEY, {
    // token expiration time
    expiresIn: "2d",
  });

  
  // if token successfully create, then response it
  return res.status(200).send({
    success: true,
    message: "User is logged in successfully",
    token: "Bearer " + token,
  });

});



// profile route
app.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  function (req, res) {
    return res.status(200).send({
      success: true,
      user: {
        id: req.user._id,
        username: req.user.username,
      },
    });
  }
);



//resource not found
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});



//server error
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});


module.exports = app;
