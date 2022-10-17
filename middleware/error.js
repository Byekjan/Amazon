//endees buh error loguuda shiideh bolomjtoi 
const errorHandler = (err, req, res, next) => {
    // console.log(err.stack.red);
    res.status(err.statusCode || 500).json({
        success: false,
        error: err.message,
        status: err.statusCode
    })
};

module.exports = errorHandler;