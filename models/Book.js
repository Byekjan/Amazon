const mongoose = require('mongoose');

const BoockSchema = new mongoose.Schema({
    name: {
        type: String,
        unique: true
    },
    price: Number
});

module.exports = mongoose.model("Book", BoockSchema);