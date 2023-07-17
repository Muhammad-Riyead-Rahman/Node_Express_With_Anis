const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});


app.get("/circle", (req, res) => {
  res.sendFile(__dirname + "/views/circle.html");
});


app.get("/triangle", (req, res) => {
  res.sendFile(__dirname + "/views/triangle.html");
});


app.post("/circle", (req, res) => {
  const radius = req.body.radius;

  const area = Math.PI * radius * radius;

  // calculate area, depend on req.body(value->radius)
  res.send(`<h2>Area of Circle is : ${area}</h2>`);
});


app.post("/triangle", (req, res) => {
  console.log(req.body);

  const { base, height } = req.body;

  // calculate area, depend on req.body(value->base & height)
  const area = 0.5 * base * height;

  res.send(`<h2>Area of Triangle is : ${area}</h2>`);
});


module.exports = app;