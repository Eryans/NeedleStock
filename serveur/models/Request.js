const mongoose = require("mongoose");

const actionSchema = new mongoose.Schema({
  item: 
    {
      type: mongoose.Types.ObjectId,
      required: false,
      ref: "item",
    },
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
  actions: [actionSchema],
  group:{
    type: mongoose.Types.ObjectId,
    required:true,
    ref:"group"
  }
});

const requestModel = mongoose.model("request", requestSchema);
module.exports = requestModel;
