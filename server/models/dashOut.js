const mongoose = require('mongoose')

const dashOutSchemas = new mongoose.Schema({
    sn: Number,
    name: String,
    day: String,
    times: String,
    absent: String,
    present: String
})

const dashOutDB = new mongoose.model("dashboard_Out_data", dashOutSchemas)

module.exports = dashOutDB;
