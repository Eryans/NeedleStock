const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  users: [
    {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "users",
    },
  ],
  items: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "item",
    },
  ],
  password: {
    type: String,
    required: true,
  },
});

const groupModel = mongoose.model("group", groupSchema);
module.exports = groupModel;
