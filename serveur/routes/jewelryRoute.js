const express = require("express");
const router = express.Router();
const {
  getJewelrys,
  setJewelry,
  updateJewelry,
  deleteJewelry,
} = require("../controllers/jewelryController");

router.route("/").get(getJewelrys).post(setJewelry);
router.route("/:id").put(updateJewelry).delete(deleteJewelry);

module.exports = router;
