require('dotenv').config()
const express = require('express');
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const FatchUser = require('../middleware/fatchuser');

const jwt_s = "Thisisasecretforauthentication";

//!Route-1
router.post("/createuser", [body('Username').isLength({ min: 3 }), body('Password').isLength({ min: 3 }),body('email').isEmail()], async(req,res)=>{
  // Handle validation error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
       res.status(400).json({ errors: errors.array() });
    }

    let success = false;
    try{
    // check email alrady exist or not if exist throw bad request.
    let user = await User.findOne({email: req.body.email});
    if(user){ return res.status(400).json({success,Error: "User email already exist"})};
    // hashing and salting

    const salt = bcrypt.genSaltSync(10);
    const HashPass = await bcrypt.hash(req.body.Password, salt);

    // Save a new user
    user = await User.create({
        Username: req.body.Username,
        Password: HashPass,
        email: req.body.email,
        department: req.body.department
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

//!Route-2
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
    if(await User.findOne({email}) === null){return res.json({success, error: "place enter valid email or password"})};
    const user = await User.findOne({email});
    
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

//!Route-3
router.get("/getuser",FatchUser, async(req,res)=>{
  try {
    // get user data (req.user) by varifying JWD token using FatchUser middleware.
    const userId = req.user.id;
    const user = await User.findById(userId).select("-Password");
    res.send(user);
  } catch (error) {
    console.log("Problem occured on auth routes" + error.massage);
    return res.sendStatus(500).send("Problem occured.")
  }
});

router.get("/users", async (req, res) => {
  // console.log("ID:   "+req.user.id);
  try {
      // fatch all notes from database
      const users = await User.find({});
      res.send(users);
  } catch (error) {
      console.log("Problem occured on note routes(/users)" + error.massage);
      return res.sendStatus(404).send("Internel server error.");
  }

});




module.exports = router;