const jwt = require('jsonwebtoken')
require('dotenv').config()
const User = require('../model/user.js');

const authenticate = async (req, res, next) => {
      try {
          const token = req.query.token
          if (!token) {
              return res.status(400).json({ error: "User not verified" })
          }
          const verifyToken = jwt.verify(token,process.env.JWT_SECRET_KEY )
          const check = await User.findOne({_id:verifyToken.id})
          if(check){
              req.id = check._id
              next()
          }
      } catch (err) {
          return res.status(400).json({ error: "User not verified" })
      }
  }
  
  module.exports = authenticate;