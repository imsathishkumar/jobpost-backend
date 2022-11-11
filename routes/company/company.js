const express = require("express");
const router = express.Router();
const { createJob , listMyJob ,listMyApplicant } = require("../../controller/company/company");

router.post("/create-job",createJob);
router.get("/list-my-job",listMyJob);
router.get("/list-my-applicant",listMyApplicant);


module.exports = router;