const { v4: uuidv4 } = require("uuid");

const User = require("../models/user.model");


// get all users from mdb
const getAllUsers = async (req, res) => {

  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).send(error.message);
  }

};


// get one user from mdb, base on provided id
const getOneUser = async (req, res) => {

  try {
    const user = await User.findOne({ id: req.params.id });

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }

};


// create a user & store it into mdb
const createUser = async (req, res) => {

  try {
    const newUser = new User({

      id: uuidv4(),
      name: req.body.name,
      age: Number(req.body.age),

    });

    await newUser.save();

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).send(error.message);
  }

};


// update user from mdb, base on provided id
const updateUser = async (req, res) => {

  try {
    const user = await User.findOne({ id: req.params.id });

    user.name = req.body.name;
    user.age = Number(req.body.age);

    await user.save();

    res.status(200).json(user);
  } catch (error) {
    res.status(500).send(error.message);
  }

};


// delete user from mdb, base on provided id
const deleteUser = async (req, res) => {

  try {
    await User.deleteOne({ id: req.params.id });

    res.status(200).json({ message: "user is deleted" });
  } catch (error) {
    res.status(500).send(error.message);
  }

};


// export all function to user router
module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  updateUser,
  deleteUser,
};