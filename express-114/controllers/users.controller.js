const path = require("path");
const { v4:uuidv4 } = require('uuid');


// If const is used, it can't be changed
let users = require("../models/users.model");


// get all users
exports.getAllUsers = (req, res) => {
  res.status(200).json({users});


  // res.sendFile(path.join(__dirname + "/../views/users.html"));
};


// create user
exports.createUsers = (req, res) => {
  const name = req.body.name.toString();
  const email = req.body.email.toString();

  const user = {
    id: uuidv4(),
    name,
    email
  };

  users.push(user);

  res.status(201).json({
    success: true,
    users
  });

};


// update user
exports.updateUser = (req, res) => {
  const id = req.params.id;
  const { name, email } = req.body;

  users
    .filter((user) => user.id === id)
    .map((selectedUser) => {
      selectedUser.name = name;
      selectedUser.email = email;
    });

  res.status(200).json(users);
};


// delete user
exports.deleteUser = (req, res) => {
  const id = req.params.id;

  users = users.filter((user) => user.id !== id);

  res.status(200).json({users});
};
