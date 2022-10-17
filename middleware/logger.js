const logger = (req, res, next) => {
    // req.userID = "r123sdasda";
    console.log(`${req.method} ${req.protocol}://${req.hostname}${req.originalUrl}`);
    next();
}

module.exports = logger;