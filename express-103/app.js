// it's related to index file & route file

const express = require("express");
const app = express();
const userRouter = require("./routes/user.route");


app.use("/api/user", userRouter);

app.use("/", (req, res) => {
  res.send("<h1>I'm a get request at home route</h1>");
})

app.use((req, res) => {
  res.send("<h1>404 ! Not a valid url</h1>")
})

module.exports = app;