const User = require("../models/Users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// @desc Get Users
// @route GET /api/user
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    console.log(err);
  }
};
// @route POST /api/user
const setUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400);
      throw new Error("Veuillez remplir toutes les informations");
    }
    // Check if user already exist
    const userExists = await User.findOne({email});
    if (userExists) {
      res.status(400);
      throw new Error("Utilisateur déjà enregistré");
    }
    // hash passward
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    // Register User
    const user = await User.create({
      name: name,
      email: email,
      password: hashedPassword,
    });

    if (user) {
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(400);
      throw new Error("INVALID USER DATA");
    }
  } catch (err) {
    console.log(err);
  }
};
const loginUser = async (req, res) => {
  try {
    res.status(200).json({ message: "Login user" });
  } catch (err) {
    console.log(err);
  }
};
// @route PUT /api/user/:id
const updateUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    console.log(err);
  }
};
// @route DELETE /api/user/:id
const deleteUser = async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(400);
    throw new Error("User not found");
  }
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `${user.name} was deleted` });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUsers,
  setUser,
  updateUser,
  deleteUser,
  loginUser,
};
