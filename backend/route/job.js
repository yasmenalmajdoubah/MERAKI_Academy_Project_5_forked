const express = require("express");
const jobsRouter = express.Router();

const { createNewJob } = require("../controllers/job");

const authentication = require("../middlewares/authentication");

// http://localhost:5000/jobs/create
jobsRouter.post("/create", authentication, createNewJob);

module.exports = jobsRouter;
