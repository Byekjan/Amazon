const Category = require('../models/Category');
const MyError = require("../utils/myError");
const asyncHandler = require("../middleware/asyncHandler");

exports.getCategories = asyncHandler( async (req, res, next) => {
    // {{url}}/api/v1/categories?select=name slug averagePrice&sort=averagePrice
    // {{url}}/api/v1/categories?averagePrice[$lte]=11000
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 100;
    const sort = req.query.sort;
    const query = req.query.select;
    
    ['select', 'sort', 'limit', 'page'].forEach( el => delete req.query[el]);

    const total = await Category.countDocuments();
    const pageCount = Math.ceil(total / limit);
    const start = (page - 1) * limit + 1;
    let end = start + limit - 1;
    if (end > total) end = total;

    const pagination = {total, pageCount, start, end, limit}

    if (page < pageCount) pagination.nextPage = page + 1;
    if (page > 1) pagination.prevPage = page - 1;


    const categories = await Category.find(req.query, query)
        .sort(sort)
        .skip(start - 1)
        .limit(limit);


    //{{url}}/api/v1/categories?name=biznes&price=100000  example query parameter
    res.status(200).json({
        success: true,
        data: categories,
        pagination: pagination
        // userID: req.userID
    });
});

exports.getCategory = asyncHandler( async (req, res, next) => {
    const category = await Category.findById(req.params.id).populate('books');
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
    const category = await Category.findById(req.params.id );
    
    if (!category) {
        throw new MyError(req.params.id + " data not found", 400);
    }
    category.remove();

    res.status(200).json({
        success: true,
        id: `delete category id-> ${ req.params.id }`,
        data: category
    });
});