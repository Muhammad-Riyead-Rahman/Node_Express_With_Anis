const express = require("express");
const app = express();

const appLavelMiddleWare = (req, res, next) => {
  console.log("I'm Application Lavel Middleware function");

  req.currentTime = new Date(Date.now());
  next();
};


const routeLavelMiddleWare = (req, res, next) => {
  console.log("I'm Route Lavel Middleware function");

  req.name = "Riyead Rahman";
  next();
};



// it's a application lavel middleware, that is why it's default call, no need to use it explicitly for any routing. it's defultly call for all route
app.use(appLavelMiddleWare);


app.get("/", (req, res) => {
  console.log("I'm home & appliecation lavel middleware current time is: " + req.currentTime);

  res.send(`<h2>I'm home route</h2>`);
});


app.get("/about", routeLavelMiddleWare, (req, res) => {
  console.log("I'm about & appliecation lavel middleware current time is: " + req.currentTime);
  console.log(`I'm about & route lavel middleware varriable value is: ${req.name}`);

  res.send(`<h2>I'm about route</h2>`);
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