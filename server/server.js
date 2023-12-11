const express = require("express");
const dotenv = require("dotenv");
const app = express();
const router = require("./routes/router");
const cors = require("cors");
const cookieParser = require("cookie-parser")
require("./db/conn");

dotenv.config({path: "../.env"})
const PORT = process.env.PORT;

// app.get("/", async(req, res)=>{
//     res.send("IND")
// })

app.use(express.json());
app.use(cookieParser())
app.use(cors());
app.use(router);

app.listen(PORT, async(req, res)=>{
    console.log(`Server Running on Port ${PORT}`);
})

