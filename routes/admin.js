const express = require('express');
// const User = require("../models/User");
const Admin = require('../models/Admin');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const FatchUser = require('../middleware/fatchuser');


const jwt_s = "Thisisasecretforauthentication";

router.post("/create", [body('Username').isLength({ min: 3 }), body('Password').isLength({ min: 3 }),body('email').isEmail()], async(req,res)=>{
    // Handle validation error.
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
         res.status(400).json({ errors: errors.array() });
      }
  
      let success = false;
      try{
      // check email alrady exist or not if exist throw bad request.
      console.log(req.body.email);
      let user = await Admin.findOne({email: req.body.email});
      if(user){ return res.json({success,Error: "User email already exist"})};
      // hashing and salting
  
      const salt = bcrypt.genSaltSync(10);
      const HashPass = await bcrypt.hash(req.body.Password, salt);
  
      // Save a new user
      user = await Admin.create({
          Username: req.body.Username,
          Password: HashPass,
          email: req.body.email,
        });
        // JWT token
        const data={
          user:{
            id: user.id
          }
        }
        const Token = jwt.sign(data,jwt_s);
        success = true;
        res.json({success,Token});
      }catch(error){
        console.log("Problem occured on auth routes:  " + error.massage);
        // return res.sendStatus(500).send("Problem occured.")
      }
  });

router.post("/login", [body('Password').exists(),body('email').isEmail()], async(req,res)=>{
    // Handle validation error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.sendStatus(404).json({ errors: errors.array() });
    }
    let success = false;
    try {
      const {email,Password} = req.body;
      // find user entered email, if it doesn't exit return bad request.
      if(await Admin.findOne({email}) === null){return res.json({success, error: "place enter valid email or password"})};
      const user = await Admin.findOne({email});
      
      const ComparePasword = await bcrypt.compare(Password,user.Password);
      console.log(ComparePasword);
      
      if(!ComparePasword){return res.json({success, error: "place enter valid email or password"})};
  
      const data={
        user:{
          id: user.id
        } 
      }
      const Token = jwt.sign(data,"Thisisasecretforauthentication");
      success = true;
      res.json({success, Token});
    } catch(error){
      console.log("Problem occured on auth routes " + error.massage);
      return res.json({success});
    }
  
  });

  module.exports = router;