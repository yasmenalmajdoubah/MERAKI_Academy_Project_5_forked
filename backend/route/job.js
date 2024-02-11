const express = require("express");
const jobsRouter = express.Router();

const { createNewJob, getJobsByInstitustionId } = require("../controllers/job");

const authentication = require("../middlewares/authentication");

// http://localhost:5000/jobs/create
jobsRouter.post("/create", authentication, createNewJob);

// http://localhost:5000/jobs/:institution_user_id
jobsRouter.get("/:institution_user_id", getJobsByInstitustionId);

module.exports = jobsRouter;
