const express = require("express");
const dotenv = require("dotenv");
const path = require('path')

const morgan = require('morgan');
const rfs = require('rotating-file-stream') 

//include MIDDLEWARE
const logger = require("./middleware/logger");
const connectDB = require("./config/db");
const colors = require('colors');
const errorHandler = require('./middleware/error');
//include ROUTER
const categoriesRoutes = require("./routes/categories");
const booksRoutes = require("./routes/books");

//аппын тохиргоог process.env рүү ачаалах
//node js ajilah bolgond process object uusej baidag
dotenv.config({path: "./config/config.env"});

const app = express();
connectDB();
// flags: 'a'  append hiij hoinosn zalgaj bga log ruu 
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' })

// create a rotating write stream
const accessLogStream = rfs.createStream('access.log', {
    interval: '1d', // rotate daily
    path: path.join(__dirname, 'log')
})


// body parser to req.body
app.use(express.json());

app.use(logger);
app.use(morgan('combined', { stream: accessLogStream }));
//route is middleware too because using app.use func
app.use("/api/v1/categories", categoriesRoutes);
app.use("/api/v1/books", booksRoutes);
app.use(errorHandler);

const server = app.listen(
    process.env.PORT,
    console.log(`Express server started ${process.env.PORT} port`)
);

process.on('unhandledRejection', (err, promise) => {
    console.log(`Error-> ${ err.message }`.underline.red.bold);
    server.close(() => {
        process.exit(1);
    });
});