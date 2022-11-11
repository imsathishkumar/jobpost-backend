require("dotenv").config();
const jwt = require('jsonwebtoken');
// const { User } = require("../model/user");

function auth(req,res,next){
  const token = req.header('x-auth-token');
  if(!token) return res.status(401).send({
    message:"Access denited. No token provide"
  })

  try {
    const decode = jwt.verify(token,process.env.JWTKEY);
    // console.log(decode);
    req.user = decode;
    next();
  }
  catch (error) {
    res.status(400).send(error)
  }
}

module.exports = auth;