const express = require("express");
const bcrypt = require('bcrypt');
const cors = require("cors");
const router = express.Router();
const jwt = require("jsonwebtoken");
const User = require("../model/user.js");

router.use(cors()); // Enable CORS for all routes in this router


router.post("/register", async (req, res) => {
      try{
            const {name, password, cPassword} = req.body;
            if(!name || !password || !cPassword) {
                  res.status(202).send(`All fields are mandatory`);
            }
            
            const existence = await(User.findOne({name : name}));
            if(existence){
                  return res.status(202).send({
                        "error message" : "User already registered please login"
                  })
            }

            const passwordEncryption = await bcrypt.hash(password, 12);
            if(passwordEncryption){
                  const createNewUser =  new User ({
                        name : name,
                        password : passwordEncryption,
                        cPassword : passwordEncryption
                  })
                  const saveData = createNewUser.save();
                  return res.status(200).json({ message :`user registered successfully`});
            }
      }catch(err){
            return res.status(403).json({"error" : "Internal error"});
      }
})


router.post("/login", async (req, res) => {
      try{
            const {name, password} = req.body;
            if(!name || !password){
                  return res.status(403).json({"message" : "All fields are mandatory"});
            }     
            const checkUser = await (User.findOne({name : name}));
            if(!checkUser){
                  return res.status(200).json({"message" : "Unregistered user! please signup"});
            }

            const decrypt = await bcrypt.compare(password, checkUser.password);
            if(decrypt){
                  const token = jwt.sign({id : checkUser._id}, process.env.JWT_SECRET_KEY, {expiresIn : "1d"});
                  if(token){
                        res.status(200).json({"message" : "login successfull", token : token, id: checkUser._id })
                  }
            }else{
                  return res.status(403).json({"message" : "Invalid credentials"});

            }

      }catch(err){
            return res.status(403).json({"err" : "Invalid credentials in catch block"});
      }
})

module.exports = router;