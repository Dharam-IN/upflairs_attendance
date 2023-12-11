const express = require("express");
const userdb = require("../models/userSchema");
const router = new express.Router();
const bcrypt = require("bcrypt")

// Register 
router.post('/register', async(req, res)=>{
    // console.log(req.body)
    const {fname, email, password, cpassword} = req.body;

    if(!fname || !email || !password || !cpassword){
        res.status(422).json({error: "Please Fill all the fields"})
    }

    try {
        const preuser = await userdb.findOne({email: email});

        if(preuser){
            res.status(422).json({error: "Email already exist"})
        }else if(password !== cpassword){
            res.status(422).json({error: "Password and cpassword not match"})
        }else{
            const fineluser = new userdb({
                fname, email, password, cpassword
            })

            // hash password

            const storedata = await fineluser.save();
            // console.log(storedata)
            res.status(201).json({status: 201, storedata})

        }
    } catch (error) {
        res.status(422).json(error)
        console.log("Catch Block Error")
    }
})

// Login 

router.post("/login", async(req, res)=>{
    // console.log(req.body)
    const{email, password} = req.body;

    if(!email || !password){
        res.status(422).json({error: "Please Fill all fields"})
    }

    try {
        const userValid = await userdb.findOne({email: email});
        if(userValid){
           const isMatch = await bcrypt.compare(password, userValid.password)

           if(!isMatch){
                res.status(422).json({error: "Invalid Details"})
           }else{
                // token generated
                const token = await userValid.generateAuthtoken();
                console.log(token);
           }
        }
    } catch (error) {
        
    }

})

module.exports = router;
