// it's related to index file & route file
const express = require("express");
const app = express();
const userRouter = require("./routes/user.route");


app.use('/api/user', userRouter);


app.get('/', (req, res) => {
  // pass string as response
  res.send("<h1>I'm a get request at home route</h1>");
});


app.get('/product', (req, res) => {
  // pass string & statusCode as response
  res.status(200).json({
    message: "I'm json response of product page with status code",
    statusCode: 200
  });
});


app.get('/products', (req, res) => {
  // response status code & html file
  res.statusCode = 200;
  res.sendFile(__dirname + "/views/index.html");
});


app.get('/register', (req, res) => {
  res.redirect('/login');
});


app.get('/login', (req, res) => {
  res.cookie("name", "riyead");
  res.cookie("age", "30");

  // clear cookie function
  /* res.clearCookie("name");
  res.clearCookie("age"); */

  // by append methodsent value at inspect->network->header
  res.append("id", "1234567890"); 
  res.send("I am a get request at login route");
});


app.use((req, res) => {
  res.send("<h1>404 ! Not a valid url</h1>");
});


module.exports = app;