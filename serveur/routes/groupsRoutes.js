const express = require("express");
const router = express.Router();
const {
  getGroups,
  setGroup,
  updateGroup,
  deleteGroup,
  getUserGroups,
  getSingleGroup
} = require("../controllers/groupController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getGroups);
router.route("/getSingleGroup").post(protect, getSingleGroup);
router.route("/setGroup").post(protect, setGroup);
router.route("/findGroups").post(protect,getUserGroups);
router.route("/:id").put(protect, updateGroup).delete(protect, deleteGroup);

module.exports = router;
