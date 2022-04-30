const Group = require("../models/Group");
const bcrypt = require("bcryptjs");

// @desc Get Groups
// @route GET /api/group
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json(groups);
  } catch (err) {
    console.log(err);
  }
};
// @route POST /api/group
const setGroup = async (req, res) => {
  const {name,password} = req.body;
  if ( !name || !password) {
    return res.json({message:"Veuillez remplir toutes les informations"});
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const group = await Group.create({
      name: req.body.name,
      password: hashedPassword,
      //user:[...window.localStorage.getItem("user")]
    });
    res.status(200).json(group);
  } catch (err) {
    console.log(err);
  }
};
// @route PUT /api/group/:id
const updateGroup = async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) {
    res.status(400);
    throw new Error("Group not found");
  }
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      }
    );
    res.status(200).json(updatedGroup);
  } catch (err) {
    console.log(err);
  }
};
// @route DELETE /api/group/:id
const deleteGroup = async (req, res) => {
  const group = await Group.findById(req.params.id);
  if (!group) {
    res.status(400);
    throw new Error("Group not found");
  }
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: `${group.name} was deleted` });
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getGroups,
  setGroup,
  updateGroup,
  deleteGroup,
};
