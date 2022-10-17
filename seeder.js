const fs = require("fs");
const mongoose = require("mongoose");
const colors = require("colors");
const dotenv = require("dotenv");
const Category = require("./models/Category");

dotenv.config({path: "./config/config.env"});

mongoose.connect(process.env.MONGODB_URI);
// __dirname nodejs iin special hubtsagch
const categories = JSON.parse(
    fs.readFileSync(__dirname + '/data/categories.json', 'utf-8')
);

const importData = async () => {
    try {
        await Category.create(categories);
        console.log("success".green.underline);
    } catch (err) {
        console.log(err.red.inverse);
    }
}

const deleteData = async () => {
    try {
        await Category.deleteMany();
    console.log("deleted".red.underline);

    } catch (err) {
        console.log(err.red.inverse);
    }
}

//process.argv ueses parameter => > node[0] seeder.js[1]
if (process.argv[2] == '-i') {
    importData();
} else if(process.argv[2] == '-d') {
    deleteData();
}