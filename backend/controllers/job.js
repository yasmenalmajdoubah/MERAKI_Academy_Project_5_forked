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

module.exports = { createNewJob };
