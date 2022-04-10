const mongoose = require('mongoose');

const jewelrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    material: {
        type: String,
        required: true
    },
    height: {
        type: Number,
        required: true
    },
    width: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    }
})

const jewerlyModel = mongoose.model("jewelry",jewelrySchema);
module.exports = jewerlyModel;