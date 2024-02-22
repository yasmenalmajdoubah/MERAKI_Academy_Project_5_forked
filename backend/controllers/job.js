const { pool } = require("../models/db");

const createNewJob = (req, res) => {
  const institution_user_id = req.token.user_id;
  const { title, discription, field_id } = req.body;
  const placeholder = [institution_user_id, title, discription, field_id];
  const query = `INSERT INTO jobs (institution_user_id, title, discription) VALUES ($1,$2 ,$3, $4) RETURNING *`;

  pool
    .query(query, placeholder)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Job created successfully",
        job: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

/* ===================================== */

const getJobsByInstitustionId = (req, res) => {
  const { institution_user_id } = req.params;
  const placeholder = [institution_user_id, 0];
  const query = `SELECT * FROM jobs WHERE institution_user_id=$1 AND is_deleted=$2`;

  pool
    .query(query, placeholder)
    .then((result) => {
      if (result.rows.length) {
        return res.status(200).json({
          success: true,
          message: `All Jobs for the Institution: ${institution_user_id}`,
          jobs: result.rows,
        });
      }

      return res.status(404).json({
        success: false,
        message: `The Institution: ${institution_user_id} has no Jobs`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

/* ===================================== */

const createNewJobUser = (req, res) => {
  const user_user_id = req.token.user_id;
  const { job_id } = req.body;
  const placeholder = [user_user_id, job_id];
  const query = `INSERT INTO job_user (user_user_id, job_id) VALUES ($1, $2) RETURNING *`;

  pool
    .query(query, placeholder)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Job_User created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

/* ========================================= */

const getAllUsersOfJobId = (req, res) => {
  const { job_id } = req.params;
  const placeholder = [job_id];
  const query = `SELECT firstname, lastname, profileimage, jobname, cv, phonenumber,  title, jobs.job_id FROM job_user INNER JOIN users ON job_user.user_user_id=users.user_id INNER JOIN jobs ON job_user.job_id=jobs.job_id WHERE job_user.job_id=$1`;

  pool
    .query(query, placeholder)
    .then((result) => {
      if (result.rows.length) {
        return res.status(200).json({
          success: true,
          message: `All Users from the Job: ${job_id}`,
          users: result.rows,
        });
      }

      return res.status(404).json({
        success: false,
        message: `This Job: ${job_id} has no Users`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};

//=====================================================
const getAllJobsbyField = (req, res) => {
  const field_id = req.token.field_id;
  const placeholder = [field_id];
  const query = `SELECT jobs.title, jobs.job_id, jobs.discription, jobs.created_at, users.firstName, users.lastName, users.profileImage, users.email FROM jobs INNER JOIN users ON jobs.institution_user_id=users.user_id WHERE jobs.field_id=$1`; // ! AND users.role_id=2

  pool
    .query(query, placeholder)
    .then((result) => {
      if (result.rows.length) {
        return res.status(200).json({
          success: true,
          message: `All Jobs `,
          jobs: result.rows,
        });
      }

      return res.status(404).json({
        success: false,
        message: ` no Jobs`,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
module.exports = {
  createNewJob,
  getJobsByInstitustionId,
  createNewJobUser,
  getAllUsersOfJobId,
  getAllJobsbyField,
};
