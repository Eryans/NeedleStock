const mongoose = require("mongoose");

const customFieldsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
});

const itemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    customFields: [customFieldsSchema],
  },
  {
    timestamps: true,
  }
);

const itemModel = mongoose.model("item", itemSchema);
module.exports = itemModel;
