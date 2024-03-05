const express = require("express");
const jobsRouter = express.Router();

const {
  createNewJob,
  getJobsByInstitustionId,
  createNewJobUser,
  getAllUsersOfJobId,
  getAllJobsbyField
} = require("../controllers/job");

const authentication = require("../middlewares/authentication");

// https://workedin.onrender.com/jobs/create
jobsRouter.post("/create", authentication, createNewJob);

// https://workedin.onrender.com/jobs/:institution_user_id
jobsRouter.get("/:institution_user_id", getJobsByInstitustionId);

// https://workedin.onrender.com/jobs/
jobsRouter.get("/", authentication, getAllJobsbyField);

// https://workedin.onrender.com/jobs/job_user
jobsRouter.post("/job_user", authentication, createNewJobUser);

// https://workedin.onrender.com/jobs/allUsers/:job_id
jobsRouter.get("/allUsers/:job_id", getAllUsersOfJobId);

module.exports = jobsRouter;

/*
create job
{ "title": "full stack web developer",
 "discription":"node,css,html,js" 
 }
*/