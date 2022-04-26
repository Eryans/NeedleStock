const mongoose = require('mongoose');

const toolsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    unit_price: {
        type: Number,
        required: false
    }
})

const toolModel = mongoose.model("tool",toolsSchema);
module.exports = toolModel;