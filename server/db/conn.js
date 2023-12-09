const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config({path: "../.env"})
const DB = process.env.DB;

mongoose.connect(DB,{
    useUnifiedTopology: true,
    useNewUrlParser: true
}).then(()=>{console.log("Database Connected")}).catch((error)=>{console.log(error)})

