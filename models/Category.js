const mongoose = require('mongoose');
const  { transliterate, slugify } = require("transliteration");

const CategorySchema = new  mongoose.Schema({
        name: {
            type: String,
            required: [true, "Category cant be null"],
            unique: true,
            trim: true,
            maxLength: [50, "Category accepts length is 50 characters"],
        },
        slug: String,
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
    }, { toJSON: {virtuals: true}, toObject: {virtuals: true}}
);

CategorySchema.virtual('books', {
    ref: 'Book',
    localField: '_id',
    foreignField: 'category',
    justOne: false
});

CategorySchema.pre('remove', async function(next) {
    await this.model('Book').deleteMany({category: this._id});
    next();
});

CategorySchema.pre('save', function(next) {
    //Name translator to slug
    this.slug = slugify(this.name);
    this.averageRating = Math.floor(Math.random() * 10) + 1;
    this.averagePrice = Math.floor(Math.random() * 10000) + 3000;
    next();
});

module.exports = mongoose.model("Category", CategorySchema);