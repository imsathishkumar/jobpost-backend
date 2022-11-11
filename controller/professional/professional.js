const { Job } = require("../../model/job");
const { Application , validateApplication } = require("../../model/application");

async function showJob(req, res) {
  try {
    const job = await Job.find({});
    res.status(200).send({
      message: "Job list",
      job,
    });
  } catch (err) {
    res.status(400).send(err);
  }
}

async function applyJob(req, res) {
  try {
    const user = req.user;
    if(user.type != "professional")
    return res.status(401).send({ message:"your does not have access to apply job" });
    
    if(!req.body.jobId)
      return res.status(400).send({ message:"JobId is required" });
    const job = await Job.findOne({_id:req.body.jobId});
    if(!job)
      return res.status(400).send({ message:"Job is closed" });

    let application = await Application.find({jobId:req.body.jobId,userId:user._id});
    console.log("hit",application);
    if(application.length != 0)
      return res.status(200).send({ message:"your already applied for this job" });
    application = {
      jobId:req.body.jobId,
      userId:user._id,
      email:user.email,
      applicantName:user.username
    }
    const {error} = validateApplication(application)
    if(error) return res.status(400).send({ message:"Something went wrong" });
    application = new Application(application);
    job.applicants.push(await application.save());
    await job.save();
    // await application.save();
    res.status(200).send({
      message: "Job list",
      application
    });
  } catch (err) {
    res.status(400).send(err);
  }
}

module.exports = { showJob , applyJob };