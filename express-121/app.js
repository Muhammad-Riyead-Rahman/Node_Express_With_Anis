// //match from database authentication
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const md5 = require("md5");

const User = require("./models/user.model");

const dbURL = process.env.MONGO_URL;


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


//established database connection
mongoose.connect(dbURL)
  .then(() => {
    console.log("MongoDB Atlas Is Connceted");
})
  .catch((error) => {
    console.log(error);
    process.exit(1);
})



app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});



app.post("/register", async (req, res) => {
  // initial checking state
  
  /* const { email, password } = req.body; //form encoded data

  res.status(201).json({ email, password }); */

  try {
    const newUser = new User({
      email: req.body.email,
      password: md5(req.body.password)
    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json(error.message);
  }

});


app.post("/login", async (req, res) => {
  // res.status(201).json({ message: "user is login" });

  try {
    const email = req.body.email;
    const password = md5(req.body.password);

    const user = await User.findOne({
      email: email
    });

    if ( user && user.password === password ) {
      res.status(200).json({ status: "valid user" });
    } else {
      res.status(404).json({ status: "Not valid user" });
    }
    
  } catch (error) {
      res.status(500).json(error.message);
  }

});


// route not found error handling middleware
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
    });
});
  
  
// server error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "something broke",
  });
});


module.exports = app;