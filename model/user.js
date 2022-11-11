require("dotenv").config();
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username:{
    type:String,
    required:true,
    minlength:5,
    maxlength:50
  },
  email:{
    type:String,
    required:true,
    minlength:5,
    maxlength:60,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength:10,
    maxlength:1024
  },
  type:{
    type:String,
    required:true
  }
});

userSchema.methods.generateAuthToken = function(){
  const token = jwt.sign({
    _id:this._id,
    username:this.username,
    email:this.email,
    type:this.type
  },process.env.JWTKEY)
  return token;
}

userSchema.methods.decodeAuthToken = function(token){
  const decode = jwt.verify(token,process.env.JWTKEY);
  return decode;
}

const User = mongoose.model('User',userSchema);

function validateUser(user){
  const schema = Joi.object({
    username:Joi.string().min(5).max(50).required(),
    email:Joi.string().min(5).max(60).required().email(),
    password:Joi.string().min(5).max(255).required(),
    type:Joi.string().min(5).max(50).required(),
  });

  return schema.validate(user);
}

module.exports = {User, validateUser};