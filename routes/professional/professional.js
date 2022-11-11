const express = require("express");
const router = express.Router();
const { showJob,applyJob } = require("../../controller/professional/professional");

router.get("/show-job",showJob);
router.post("/apply-job",applyJob);

module.exports = router;