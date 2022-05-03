const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema({
  items: [
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "item",
    },
  ],
  quantityToChange: 
    {
      type: Number,
      required: true,
    },
});

const requestSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  actions: [actionSchema]
});

const requestModel = mongoose.model("request", requestSchema);
module.exports = requestModel;
