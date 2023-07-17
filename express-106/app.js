// route parameter->write addressbar http://localhost:3000/userId/1000/userName/Riyead Rahman


const express = require("express");
const app = express();


app.get("/userId/:id/userName/:name", (req, res) => {
  /* const id = req.params.userId;
  const name = req.params.userName; */

  console.log(req.params);
  
  const { id, name } = req.params;
  res.send(`<h1>Student name is: ${name} and id is: ${id}</h1>`);
});


// write header of post man or thunder client-> id === 101 & name === Riyead Rahman
app.get("/header", (req, res) => {
  const id = req.header("id");
  const name = req.header("name");

  res.send(`<h1>Student name is: ${name} and id is: ${id}</h1>`);
});


module.exports = app;