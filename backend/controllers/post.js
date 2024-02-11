const { pool } = require("../models/db");

const createNewPost = (req, res) => {
  const { title, body, image, field_id } = req.body;
  const user_id = req.token.user_id;
  const placeholders = [title, body, image, field_id, user_id];
  const query = `INSERT INTO posts (title, body, image,field_id,user_id) VALUES ($1, $2,$3,$4,$5) RETURNING *`;
  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "post created successfully",
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

module.exports={
    createNewPost
}