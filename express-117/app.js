const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const morgan = require("morgan");


const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(morgan('dev'));


// Connecting to DB
const connectDB = async () => {

  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/usersTestDB");

    console.log("DB is connected");
  } catch (error) {
    console.log("DB is not connected");
    console.log(error);

    process.exit(1);
  }

};


// Schema, Model & validation
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "user name is required"],
  },
  image: {
    type: String,
    required: [true, "user image is required"],
  }
});


const User = mongoose.model("Users", userSchema);


// File upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },

  filename: function (req, file, cb) {
    const name = Date.now() + "_" + file.originalname;
    cb(null, name);
  },
});


const upload = multer({ storage: storage });


// get all users from mdb
app.get("/", async (req, res) => {

    try {
      const users = await User.find();
  
      res.status(200).json(users);
    } catch (error) {
      res.status(500).send(error.message);
    }
  
  });


// for file upload interface
app.get("/fup", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});


// for uploaded file post
app.post("/fup", upload.single("image"), async (req, res) => {

  try {
    const newUser = new User({
      name: req.body.name,
      image: req.file.filename,
    });

    await newUser.save();

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }

});


app.get("/test", (req, res) => {
  res.status(200).send("testing api");
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


module.exports = { app, connectDB };