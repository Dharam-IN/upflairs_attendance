const express = require("express");
const dotenv = require("dotenv");
const app = express();
require("./db/conn")

dotenv.config({path: "../.env"})
const PORT = process.env.PORT;

app.get("/", async(req, res)=>{
    res.send("IND")
})

app.listen(PORT, async(req, res)=>{
    console.log(`Server Running on Port ${PORT}`);
})

