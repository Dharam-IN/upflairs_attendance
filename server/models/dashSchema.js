const mongoose = require('mongoose')

const dashSchemas = new mongoose.Schema({
    sn: Number,
    name: String,
    day: String,
    times: String,
    absent: String,
    present: String
})

const dashDB = new mongoose.model("dashboard_data", dashSchemas)

module.exports = dashDB;
