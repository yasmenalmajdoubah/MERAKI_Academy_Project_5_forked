const { pool } = require("../models/db");

const createNewJob = (req, res) => {
  const institution_user_id = req.token.userId;
  const { title, discription } = req.body;
  const placeholder = [institution_user_id, title, discription];
  const query = `INSERT INTO jobs (institution_user_id, title, discription) VALUES ($1,$2 ,$3) RETURNING *`;

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

      return res.status(200).json({
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
  const user_user_id = req.token.userId;
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

module.exports = { createNewJob, getJobsByInstitustionId, createNewJobUser };
