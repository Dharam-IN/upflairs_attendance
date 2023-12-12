const jwt = require("jsonwebtoken");
const userdb = require("../models/userSchema");
const dotenv = require("dotenv");

dotenv.config({path: "../.env"})

const keysecret = process.env.SECRETKEY;

const authenticate = async(req,res,next)=>{
        try {
            const token = req.headers.authorization;
            // console.log(token)
            const verifytoken = jwt.verify(token, keysecret)
            // console.log(verifytoken)
            const rootuser = await userdb.findOne({_id: verifytoken._id})
            // console.log(rootuser)

            if(!rootuser){throw new error("User Not Found")}

            req.token = token
            req.rootuser = rootuser
            req.userId = rootuser._id

            next();
        } catch (error) {
            res.status(401).json({status:401, message:"Unauthorized no token provide"})
        }
}

module.exports = authenticate;
