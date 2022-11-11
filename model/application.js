const Joi = require("joi");
const mongoose = require("mongoose");

const applicationSchema = new mongoose.Schema({
  jobId:{
    type:String,
    required:true,
    minlength:5,
    maxlength:60
  },
  userId:{
    type:String,
    required:true,
    minlength:5,
    maxlength:60,
  },
  applicantName:{
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
  },
  job:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Job"
  }
});

const Application = mongoose.model('Application',applicationSchema);

function validateApplication(application){
  const schema = Joi.object({
    jobId:Joi.string().min(5).max(60).required(),
    userId:Joi.string().min(5).max(60).required(),
    applicantName:Joi.string().min(5).max(50).required(),
    email:Joi.string().min(5).max(60).required().email(),
  });
  return schema.validate(application);
}

module.exports = {Application, validateApplication};