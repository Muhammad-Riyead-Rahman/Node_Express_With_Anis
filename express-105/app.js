//query parameter->write addressbar http://localhost:3000/?id=1000&name=Riyead Rahman

const express = require("express");
const app = express();


app.get("/", (req, res) => {
  // const id = req.query.id;
  // const name = req.query.name;

  console.log(req.query);

  const { id, name } = req.query;
  res.send(`<h1>Student name is: ${name} and id is: ${id}</h1>`);
});


module.exports = app;