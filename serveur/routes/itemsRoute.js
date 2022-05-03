const express = require("express");
const router = express.Router();
const {
  getItems,
  setItem,
  updateItem,
  deleteItem,
  getSingleItem,
  updateItemQuantity
} = require("../controllers/itemController");
const { protect } = require("../middleware/authMiddleware");

router.route("/").get(protect, getItems).post(protect, setItem);
router.route("/setItem").post(protect, setItem);
router.route("/updateItem").put(protect, updateItem);
router.route("/getSingleItem").post(protect, getSingleItem);
router.route("/deleteItem").delete(protect, deleteItem);
router.route("/updateItemQuantity").put(protect, updateItemQuantity)

module.exports = router;
