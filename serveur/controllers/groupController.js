const Group = require('../models/Group')
const bcrypt = require('bcryptjs')
const UserModel = require('../models/Users')

// @desc Get Groups
// @route GET /api/group
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find()
    res.status(200).json(groups)
  } catch (err) {
    console.error(err)
  }
}
const getSingleGroup = async (req, res) => {
  try {
    const groups = await Group.findOne({ _id: req.body.id })
    res.status(200).json(groups)
  } catch (err) {
    console.error(err)
  }
}
const getUserGroups = async (req, res) => {
  try {
    const groups = await Group.find({ users: { _id: req.body.id } })
    return res.json({
      groups: groups,
      message: 'Donnée renvoyée',
      userId: req.body.id,
    })
  } catch (err) {}
}
// @route POST /api/group
const setGroup = async (req, res) => {
  const { name, password } = req.body.values
  if (!name || !password) {
    return res.json({ message: 'Veuillez remplir toutes les informations' })
  }
  try {
    const user = await UserModel.findById(req.body.id)
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const group = await Group.create({
      name: name,
      password: hashedPassword,
      users: [user],
    })
    user.groups = [...groups, group]
    user.save()
    res.status(200).json(group)
  } catch (err) {
    console.error(err)
  }
}
// @route PUT /api/group//updateGroup
const updateGroup = async (req, res) => {
  const group = await Group.findById(req.body._id)
  if (!group) {
    res.status(400)
    throw new Error('Group not found')
  }
  try {
    const updatedGroup = await Group.findByIdAndUpdate(
      req.body._id,
      /*  req.body,
      {
        new: true,
      } */
    )
    res.status(200).json(updatedGroup)
  } catch (err) {
    console.error(err)
  }
}
// @route PUT /api/group/updateGroupItems
const updateGroupItems = async (req, res) => {
  
  const group = await Group.findById(req.body.groupId)
  if (!group) {
    res.status(400)
    throw new Error('Group not found')
  }
  try {
    group.items.push(req.body.item)
    group.save()
    res.status(200).json(group)
  } catch (err) {
    console.error(err)
  }
}
// @route DELETE /api/group/:id
const deleteGroup = async (req, res) => {
  const group = await Group.findById(req.params.id)
  if (!group) {
    res.status(400)
    throw new Error('Group not found')
  }
  try {
    const deletedGroup = await Group.findByIdAndDelete(req.params.id)
    res.status(200).json({ message: `${group.name} was deleted` })
  } catch (err) {
    console.error(err)
  }
}

module.exports = {
  getGroups,
  setGroup,
  updateGroup,
  deleteGroup,
  getUserGroups,
  getSingleGroup,
  updateGroupItems,
}
