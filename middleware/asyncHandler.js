//Try catch iig hongobchilj orolj bgn
const asyncHandler = (fn) => (req, res, next) =>
Promise.resolve(fn(req, res, next)).catch(next);

module.exports = asyncHandler;