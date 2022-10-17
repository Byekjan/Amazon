//Js iin Error dotor bga buh ogogdoliig udamjuulj huleej abna
class MyError extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = MyError;