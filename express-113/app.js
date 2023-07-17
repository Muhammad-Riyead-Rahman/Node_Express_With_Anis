const express = require("express");
const bodyParser = require('body-parser');
const cors = require("cors");

const userRouter = require("./routes/users.route");
const productRouter = require("./routes/products.route");


const app = express();


app.use(cors())


app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());


app.use(userRouter);
app.use(productRouter);


//error handling middleware (route not found)
app.use((req, res, next) => {
  res.send("404! bad url request");
});

 
// other's error handlign middleware, that's basically response if used middle ware function throw any error
app.use((err, req, res, next) => {
  res.status(500).send("Something broke!");
});


module.exports = app;