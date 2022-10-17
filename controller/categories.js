const Category = require('../models/Category');
const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");

exports.getCategories = asyncHandler( async (req, res, next) => {
    const categories = await Category.find();
    console.log(categories);
    res.status(200).json({
        success: true,
        data: categories,
        // userID: req.userID
    });
});

exports.getCategory = asyncHandler( async (req, res, next) => {
    const category = await Category.findById(req.params.id);
    if (!category) {
        throw new MyError(req.params.id + " data not found", 400);
    }
    
    res.status(200).json({
        success: true,
        id: `get category id -> ${req.params.id}`,
        data: category
    });
})

exports.createCategory = asyncHandler( async (req, res, next) => {
    const category = await Category.create(req.body);
    res.status(200).json({
        success: true,
        data: category
    });
});

exports.updateCategory = asyncHandler( async (req, res, next) => {
    const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        // it accepts model validator too when update
        runValidators: true
    });
    res.status(200).json({
        success: true,
        id: `update category -> ${ req.params.id }`,
        data: category
    });
});

exports.deleteCategory = asyncHandler( async (req, res, next) => {
    const category = await Category.findByIdAndDelete(req.params.id );
    res.status(200).json({
        success: true,
        id: `delete category id-> ${ req.params.id }`,
        data: category
    });
});