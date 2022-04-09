// @desc Get Users
// @route GET /api/user
const getUsers = async (req, res) => {
  try {
    res.status(200).json({ message: "Get Users" });
    console.log("It worked !")
  } catch (err) {
    console.log(err);
    return next(err)
  }
};
// @route POST /api/user
const setUser = async (req, res) => {
    try{
  res.status(200).json({ message: `Hello ${req.body.name}` });
    } catch (err){
        console.log(err);
        return next(err)
    }
};
// @route PUT /api/user/:id
const updateUser = async (req, res) => {
  res.status(200).json({ message: "Update User" });
};
// @route DELETE /api/user/:id
const deleteUser = async (req, res) => {
  res.status(200).json({ message: "Delete User" });
};

module.exports = {
  getUsers,
  setUser,
  updateUser,
  deleteUser,
};
