const express = require("express");
const cors = require("cors");
require("./config/db");


const userRouter = require("./routes/user.route");


const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cors());


app.use("/api/users", userRouter);

// api/users : GET
// api/users/:id : GET
// api/users/ : POST
// api/users/:id : PATCH
// api/users/:id : DELETE




app.get("/", (req, res) => {
  res.sendFile(__dirname + "/./views/index.html");
});



// route not found error handling middleware
app.use((req, res, next) => {
  res.status(404).json({
    message: "route not found",
  });
});


// server error handling middleware
app.use((err, req, res, next) => {
  res.status(500).json({
    message: "something broke",
  });
});


module.exports = app;