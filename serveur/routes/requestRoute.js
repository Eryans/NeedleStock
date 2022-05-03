const express = require("express");
const router = express.Router();
const {
  getGroupRequests,
  updateRequest,
  setRequest,
  deleteRequest
} = require("../controllers/requestController");
const { protect } = require("../middleware/authMiddleware");

router.route("/getGroupRequests").post(protect, getGroupRequests);
router.route("/setRequest").post(protect, setRequest);
router.route("/updateRequest").put(protect, updateRequest);
router.route("/deleteRequest").delete(protect,deleteRequest);

module.exports = router;
