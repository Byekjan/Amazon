const mongoose = require('mongoose');

const CategorySchema = new  mongoose.Schema({
    name: {
        type: String,
        required: [true, "Category cant be null"],
        unique: true,
        trim: true,
        maxLength: [50, "Category accepts length is 50 characters"],
    },
    description: {
        type: String,
        maxLength: [500, "Category maximum limit 500"]
    },
    photo: {
        type: String,
        default: "No-photo.jpg"
    },
    averageRating: {
        type: Number,
        min: [1, "Minimum rating limit must be 1"],
        max: [10, "Maximum rating limit must be 10"]
    },
    averagePrice: Number,
    createdAt: {
        type: Date,
        default: Date.now,
    }
    

});

module.exports = mongoose.model("Category", CategorySchema);