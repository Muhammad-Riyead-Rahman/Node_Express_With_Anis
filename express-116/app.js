const express = require("express");
const multer = require("multer");

const app = express();


// prepare storage, destination & file name for file upload
const storage = multer.diskStorage({

  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },


  filename: function (req, file, cb) {
    /* const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix); */


    const name = Date.now() + "_" + file.originalname;
    cb(null, name);

  }
});


const upload = multer({ storage: storage });


app.get("/iup", (req, res) => {
  res.status(200).sendFile(__dirname + "/index.html");
});


app.post("/iup", upload.single("image"), (req, res) => {
  res.status(500).send("file is uploaded");
});


app.get("/", (req, res) => {
  res.status(200).send("testing api");
});


module.exports = app;