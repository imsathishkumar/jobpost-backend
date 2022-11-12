const Joi = require("joi");
const { Job, validateJob } = require("../../model/job");
const { Application } = require("../../model/application")

const schema = Joi.object({
  title: Joi.string().min(5).max(50).required(),
  description: Joi.string().min(5).max(10245).required(),
});

async function createJob(req, res) {
  try {
    const user = req.user;
    if (user.type != "company")
      return res
        .status(401)
        .send({ message: "You does not have access to create Job" });
    let { error } = schema.validate(req.body);
    if (error)
      return res.status(400).send({
        message: "please fill required details",
      });
    let job = {
      userId: user._id,
      title: req.body.title,
      description: req.body.description,
    };
    const validate = validateJob(job);
    if (validate.error)
      return res
        .status(400)
        .send({
          message: "Something went wrong please check the detail and try again",
        });

    job = new Job(job);
    await job.save();
    res.status(200).send({
      message: "Job created successfully",
      job,
    });
  } catch (err) {
    res.status(400).send(err);
  }
}

async function listMyJob(req, res) {
  try {
    const user = req.user;
    const job = await Job.find({userId : user._id});
    res.status(200).send({
      message: "Job list",
      job,
    });
  } catch (err) {
    res.status(400).send(err);
  }
}

async function listMyApplicant(req, res) {
  try {
    const user = req.user;
    if (user.type != "company")
      return res
        .status(401)
        .send({ message: "You does not have access to get Applican" });
    // const job = await Job.find({userId : user._id});
    const job = await Job.find({userId : user._id}).populate('applicants');

    const applicant = [];
    job.forEach( e =>{
      applicant.push(...e.applicants);
    })
    res.status(200).send({
      message: "applicant list",
      applicant
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

module.exports = { createJob ,listMyJob,listMyApplicant };
