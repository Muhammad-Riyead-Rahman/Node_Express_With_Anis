const express = require("express");
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());



const htmlForm = `
 <form method="POST" action="/users">

  <input type="text" name="name" placeholder="Enter Name" >
  <input type="number" name="age" placeholder="Enter Age" >

  <button type="submit">Save User</button>

 </form>
`;


const users = [
  {
    name: "Riyead Rahman",
    age: 30
  },
  {
    name: "Misti Rahman",
    age: 16
  }
];


app.get("/users", (req, res) => {
  res.send(htmlForm);
});


app.post("/users", (req, res) => {
  const name = (req.body.name).toString();
  const age = Number(req.body.age);

  const user = {
    name,
    age
  };

  users.push(user);

  res.status(201).json({
    success: true,
    users
  });

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