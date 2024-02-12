const { pool } = require("../models/db");
const createNewComment = (req, res) => {
  const { comment } = req.body;
  const { post_id } = req.parmas;
  const { user_id } = req.token;
  const query = `INSERT INTO comments(user_id,post_id,comment) VALUES ($1, $2,$3) RETURNING *;`;
  const placeholders = [user_id, post_id, comment];
  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Comment created successfully",
        results: result.rows[0],
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
    createNewComment
}