const mongoose = require("mongoose");

const customFieldsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: [1, "Le nom doit être en 1 et 75 caractères"],
    max: [75, "Le nom doit être en 1 et 75 caractères"],
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
      min: [1, "Le nom doit être en 1 et 75 caractères"],
      max: [75, "Le nom doit être en 1 et 75 caractères"],
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
    groups: [
      {
        type: mongoose.Types.ObjectId,
        required: false,
        ref: "group",
      },
    ]
  },
  {
    timestamps: true,
  }
);

const itemModel = mongoose.model("item", itemSchema);
module.exports = itemModel;
