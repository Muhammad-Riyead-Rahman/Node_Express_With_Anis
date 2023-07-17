const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Home Page</h1>");
});


// It'll accept any combination of 0-9
app.get("/product/:id([0-9]+)", (req, res) => {
  res.send(`<h2>Id: ${req.params.id}</h2>`);
});


// It'll accept any combination of a-zA-Z0-9
app.get("/product/:title([a-zA-Z0-9]+)", (req, res) => {
  res.send(`<h2>Title: ${req.params.title}</h2>`);
});





// It'll accept 3 digit combination of 0-9
app.get("/products/:id([0-9]{3})", (req, res) => {
  res.send(`<h2>Id: ${req.params.id}</h2>`);
});


// It'll accept 6 digit combination of a-zA-Z0-9
app.get("/products/:title([a-zA-Z0-9]{6})", (req, res) => {
  res.send(`<h2>Title: ${req.params.title}</h2>`);
});


//if doesn't match any route, then (wild card route) it's work
app.use("*", (req, res) => {
  res.status(404).send({
    message: "not a valid route",
  });
});


module.exports = app;