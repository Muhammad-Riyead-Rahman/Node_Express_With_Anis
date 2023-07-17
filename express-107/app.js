const express = require("express");
const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// check it's from thunder client, body->json->{"name": "anis","id": 30}
app.post("/user", (req, res) => {
  const name = req.body.name;
  const id = req.body.id;

  res.send(`<h1>Student name is: ${name} and id is: ${id}</h1>`);
});


// 1-show index file, Where there is a form
app.get("/register", (req, res) => {
  res.sendFile(__dirname + "/views/index.html");
});

// 2-which the server responds to when submitted
app.post('/register', (req, res) => {
  console.log(req.body);

  const { name, id } = req.body;
  res.send(`<h1>Student name is: ${name} and id is: ${id}</h1>`);
});


module.exports = app;