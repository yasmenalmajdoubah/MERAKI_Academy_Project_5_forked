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
const getPostsByUser = (req, res) => {
  const user_id = req.query.user;
  const placeholders = [user_id];
  const query = `SELECT * FROM posts where user_id=$1`;
  pool
    .query(query, placeholders)
    .then((result) => {
      result.rows.length
        ? res.status(200).json({
            success: true,
            message: `All posts for the user: ${user_id}`,
            posts: result.rows,
          })
        : res.status(404).json({
            success: false,
            message: `The user: ${user_id} has no posts`,
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
  createNewPost,
  getPostsByUser
};
