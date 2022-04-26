const express = require("express");
const router = express.Router();
const {
  getTool,
  setTool,
  updateTool,
  deleteTool,
} = require("../controllers/toolController");
const {protect} = require('../middleware/authMiddleware');

router.route("/").get(protect,getTool).post(protect,setTool);
router.route("/:id").put(protect,updateTool).delete(protect,deleteTool);

module.exports = router;
