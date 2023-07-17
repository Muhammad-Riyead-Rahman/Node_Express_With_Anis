const express = require("express");
const app = express();

app.use(express.static("public"));


app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});


//error handling middleware (route not found)
app.use((req, res, next) => {
  res.send("404! bad url request");
});


// other's error handlign middleware, that's basically response if used middle ware function throw any error
app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});


module.exports = app;