const User = require("../models/Users");
const { use } = require("../routes/userRoutes");

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
    const user = await User.create({
      name: req.body.name,
    });
    res.status(200).json(user);
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
		new:true,	
	})
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
    const deletedUser = await User.findByIdAndDelete(req.params.id)
	res.status(200).json({message:`${user.name} was deleted`});
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getUsers,
  setUser,
  updateUser,
  deleteUser,
};
