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

const getCommentsByPost = (req, res) => {
  const { post_id } = req.parmas;
  const placeholders = [post_id];
  const query = `SELECT users.FirstName, users.LastName, comments.comment, comments.comment_id  FROM users LEFT JOIN comments ON 
    comments.user_id=users.user_id WHERE comments.post_id=$1 AND comments.is_deleted=0
   `;
  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All comments for post: ${post_id}`,
        comments: result.rows,
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
const updateCommentById = (req, res) => {
  const { comment_id } = req.parmas;
  const { comment } = req.body;
  const placeholders = [comment, comment_id];
  const query = `UPDATE comments SET comment=$1 WHERE comment_id=$2 RETURNING *;
    `;
  pool
    .query(query, placeholders)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `comment with comment_id: ${comment_id} updated successfully`,
          post: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating comment");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err.message,
      });
    });
};
const deleteCommentById = (req, res) => {
  const { comment_id } = req.parmas;
  const placeholders = [comment_id];
  const query = `DELETE FROM comments WHERE comment_id=$1 RETURNING* ;`;
  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: `comment with id: ${comment_id} deleted `,
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
  createNewComment,
  getCommentsByPost,
  updateCommentById,
  deleteCommentById
};
