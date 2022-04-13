const express = require("express");
const router = express.Router();
const {
  getJewelrys,
  setJewelry,
  updateJewelry,
  deleteJewelry,
} = require("../controllers/jewelryController");
const {protect} = require('../middleware/authMiddleware');

router.route("/").get(protect,getJewelrys).post(protect,setJewelry);
router.route("/:id").put(protect,updateJewelry).delete(protect,deleteJewelry);

module.exports = router;
