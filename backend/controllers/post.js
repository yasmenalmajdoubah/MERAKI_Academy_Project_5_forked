const { pool } = require("../models/db");

const createNewPost = (req, res) => {
  const { title, body, image, field_id } = req.body;
  const user_id = req.token.userId;
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
  const query = `SELECT * FROM posts where user_id=$1 AND is_deleted=0`;
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

const getPostsByField = (req, res) => {
  const field_id = req.token.field_id;
  const query = `SELECT * FROM posts WHERE field_id=1 AND is_deleted=0`;
  const placeholders = field_id;
  pool
    .query(query, placeholders)
    .then((result) => {
      result.rows.length
        ? res.status(200).json({
            success: true,
            message: `All posts for the field: ${field_id}`,
            posts: result.rows,
          })
        : res.status(404).json({
            success: false,
            message: `The field: ${field_id} has no posts`,
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

const updatePostById = (req, res) => {
  const { title, body, image, field_id } = req.body;
  const { post_id } = req.params;
  const placeholders = [title, body, image, field_id, post_id];
  const query = `UPDATE posts
    SET title = COALESCE($1,title), body=COALESCE($2,body), image=COALESCE($3,image), field_id=COALESCE($4,field_id)
    WHERE post_id=$5 RETURNING *;`;
  pool
    .query(query, placeholders)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `Post with post_id: ${post_id} updated successfully`,
          post: result.rows[0],
        });
      } else {
        throw new Error("Error happened while updating post");
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

const deletePostById = (req, res) => {
  const { post_id } = req.params;
  const placeholders = [post_id];
  const query = `UPDATE posts SET is_deleted=1 WHERE post_id=$1 RETURNING *;`;
  pool
    .query(query, placeholders)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `posts with post_id: ${post_id} deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting post");
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

const addLike = (req, res) => {
  const { post_id } = req.params;
  const user_id = req.token.userId;
  const placeholders = [user_id, post_id];
  const query = `INSERT INTO likes(user_id,post_id) VALUES ($1, $2) RETURNING *;`;
  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "like created successfully",
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

const getLikesByPost = (req, res) => {
  const { post_id } = req.params;
  const placeholders = [post_id];
  const query = `SELECT likes.like_id, likes.post_id, users.firstName, users.lastName, users.user_id 
    FROM users
   LEFT JOIN likes
   ON likes.user_id=users.user_id where likes.post_id=$1`;
  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All likes for post: ${post_id}`,
        likes: result.rows,
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

const deleteLike = (req, res) => {
  const { like_id } = req.params;
  const placeholders = [like_id];
  const query = `DELETE FROM likes WHERE like_id=$1 RETURNING* ;
    `;
  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(200).json({
        success: true,
        massage: `like with like_id: ${like_id} deleted successfully`,
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
  getPostsByUser,
  getPostsByField,
  updatePostById,
  deletePostById,
  addLike,
  getLikesByPost,
  deleteLike
};
