const express = require("express");
const router = express.Router();
const {
  getUsers,
  setUser,
  updateUser,
  deleteUser,
  loginUser
} = require("../controllers/userController");

const { protect } = require('../middleware/authMiddleware');

router.get("/",protect,getUsers)
router.post("/",setUser);
router.post("/login",loginUser);
router.route("/:id").put(protect,updateUser).delete(protect,deleteUser);

module.exports = router;
