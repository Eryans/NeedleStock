const express = require("express");
const router = express.Router();
const {
  getUsers,
  setUser,
  updateUser,
  deleteUser,
  loginUser
} = require("../controllers/userController");

router.route("/").get(getUsers).post(setUser);
router.post("/login",loginUser);
router.route("/:id").put(updateUser).delete(deleteUser);

module.exports = router;
