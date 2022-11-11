const Joi = require("joi");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const jobSchema = new mongoose.Schema({
  title:{
    type:String,
    required:true,
    minlength:5,
    maxlength:50
  },
  userId:{
    type:String,
    required:true,
    minlength:5,
    maxlength:60,
  },
  description:{
    type:String,
    required:true,
    minlength:10,
    maxlength:10245
  },
  applicants:[{
    type:Schema.Types.ObjectId,
    ref:"Application"
  }]
});

const Job = mongoose.model('Job',jobSchema);

function validateJob(job){
  const schema = Joi.object({
    title:Joi.string().min(5).max(50).required(),
    userId:Joi.string().min(5).max(60).required(),
    description:Joi.string().min(5).max(10245).required(),
  });
  return schema.validate(job);
}

module.exports = {Job, validateJob};