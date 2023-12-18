const mongoose = require('mongoose');
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config({path: "../.env"})

const keysecret = process.env.SECRETKEY;

// Register Schema
const userSchema = new mongoose.Schema({
    fname:{
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        unique: true,
        validator(value){
            if(!validator.isEmail(value)){
                throw new error("not valid error")
            }
        }
    },
    password:{
        type: String,
        required: true,
        minLength: 6
    },
    cpassword:{
        type: String,
        required: true,
        minLength: 6
    },
    tokens:[
        {
            token:{
                type: String,
                required: true
            }
        }
    ]
})


// Password hashing
userSchema.pre("save", async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    
    next();
});


// token
userSchema.methods.generateAuthtoken = async function(){
    try {
        let token23 = jwt.sign({_id:this._id}, keysecret,{
            expiresIn: "1d"
        });

        this.tokens = this.tokens.concat({token: token23});
        await this.save();
        return token23;
    } catch (error) {
        res.status(422).json(error)
    }
}


const userdb = new mongoose.model("employee", userSchema)

module.exports = userdb;
