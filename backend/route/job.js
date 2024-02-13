const express = require("express");
const jobsRouter = express.Router();

const {
  createNewJob,
  getJobsByInstitustionId,
  createNewJobUser,
  getAllUsersOfJobId,
} = require("../controllers/job");

const authentication = require("../middlewares/authentication");

// http://localhost:5000/jobs/create
jobsRouter.post("/create", authentication, createNewJob);

// http://localhost:5000/jobs/:institution_user_id
jobsRouter.get("/:institution_user_id", getJobsByInstitustionId);

// http://localhost:5000/jobs/job_user
jobsRouter.post("/job_user", authentication, createNewJobUser);

// http://localhost:5000/jobs/allUsers/:job_id
jobsRouter.get("/allUsers/:job_id", getAllUsersOfJobId);

module.exports = jobsRouter;

/*
create job
{ "title": "full stack web developer",
 "discription":"node,css,html,js" 
 }
*/