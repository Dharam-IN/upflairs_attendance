const express = require("express");
const userdb = require("../models/userSchema");
const router = new express.Router();
const bcrypt = require("bcryptjs");
const authenticate = require("../middleware/authenticate")

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
                // console.log(token);

                // cookie generate
                res.cookie("usercookie", token,{
                    expires: new Date(Date.now()+9000000),
                    httpOnly: true
                });

                const result = {
                    userValid,
                    token
                }

                res.status(201).json({status:201, result})
           }
        }
    } catch (error) {
        res.status(401).json(error);
        console.log("Catch Block")
    }

});


// user valid

router.get("/validuser", authenticate, async (req, res) => {
    try {
        const ValidUserOne = await userdb.findOne({_id: req.userId});
        res.status(201).json({status: 201, ValidUserOne})
        
    } catch (error) {
        console.error('Error in /validuser route:', error);
        res.status(401).json({status: 401, error})
    }
});

// User Logout
router.get("/logout", authenticate, async(req,res)=>{
    try {
        req.rootuser.tokens = req.rootuser.tokens.filter((curelem)=>{
            return curelem.token !== req.token
        });

        res.clearCookie("usercookie", {path: "/"})

        req.rootuser.save();

        res.status(201).json({status: 201})
    } catch (error) {
        res.status(201).json({status: 401, error})
    }
})

module.exports = router;
