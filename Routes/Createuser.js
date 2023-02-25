const express = require('express')
const User = require('../models/User')
const router = express.Router()
// const user = require('../models/User')
const { body, validationResult } = require('express-validator');
const jwt = require("jsonwebtoken")
const bcrypt = require('bcryptjs')
const  jwtsecret = "mynameisgoushithcmohan"


router.post("/createuser",[

body('email' , "Inncorrect Email" ).isEmail(),
body('name').isLength({ min: 5 }),
// password must be at least 5 chars long
body('password' , 'incorrect Password').isLength({ min: 5 })],
async(req,res)=>{

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }



const salt = await bcrypt.genSalt(10);
let secPassword = await bcrypt.hash(req.body.password,salt)


try{
 await   User.create({
        name:req.body.name,
        password:secPassword,
        email:req.body.email,
        location:req.body.location

    }).then(res.json({success:true}))
    
}
catch(error){
console.log(error);
res.json({success:false})
}
})





 

router.post("/loginuser",
[body('email' , "Inncorrect Email" ).isEmail(),
body('password' , 'incorrect Password').isLength({ min: 5 })],
async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
// let email=req.body.email;
try{
  let email=req.body.email
let userData = await   User.findOne( {email})
if(!userData){
  return res.status(400).json({ errors: "Try logging in with correct credentials " });
}

    const pwdcompare = await bcrypt.compare(req.body.password,userData.password)



    if(!pwdcompare){
      return res.status(400).json({ errors: "Try logging in with correct credentials " });
    } 
      const data = {
        user:{
          id:userData.id
        }
      }
      const authToken=jwt.sign(data,jwtsecret)
      return res.json({success:true,authToken:authToken });
    
}
catch(error){
console.log(error);
res.json({success:false})
}
})







module.exports= router