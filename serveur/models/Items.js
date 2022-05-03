const mongoose = require("mongoose");

const customFieldsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: [0, "Le nom doit être en 0 et 255 charactères"],
    max: [255, "Le nom doit être en 0 et 255 charactères"],
  },
  content: {
    type: mongoose.Schema.Types.Mixed,
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
      min: [0, "La quantité ne peut pas être en dessous de zéro"],
    },
    minimumAlert:{
      type: Number,
      required:false,
      min:[0,"La quantité minimum ne peut pas être en dessous de zéro"]
    },
    customFields: [customFieldsSchema],
  },
  {
    timestamps: true,
  }
);

const itemModel = mongoose.model("item", itemSchema);
module.exports = itemModel;
