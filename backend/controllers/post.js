const { pool } = require("../models/db");

const createNewPost = (req, res) => {
  const { title, body, image, field_id } = req.body;
  const user_id = req.token.user_id;
  const placeholders = [title, body, image, field_id, user_id];
  const query = `INSERT INTO posts (title, body, image, field_id, user_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

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

/*  for search >>
const values = [fname.toLowerCase() + "%"];
  const query = `SELECT * FROM  providers INNER JOIN categories ON providers.category_id = categories.category_id WHERE fname LIKE $1 OR lname LIKE $1 ;`;

  https://www.w3schools.com/sql/sql_wildcards.asp

 */

/* ============================================= */
// SELECT * FROM follows INNER JOIN posts ON user_id=follows.followed_user_id WHERE following_user_id=2
// ! Function to get all posts of users who followd >>>
const getPostsMyFollows = (req, res) => {
  const following_user_id = req.token.user_id;
  const placeholders = [following_user_id];

  const query = `SELECT posts.body, posts.image,posts.post_id, posts.created_at,posts.user_id ,users.firstname , users.lastname, users.profileimage FROM follows INNER JOIN posts ON user_id=follows.followed_user_id INNER JOIN users ON posts.user_id=users.user_id WHERE following_user_id=$1 ORDER BY created_at DESC`;

  /*
UNION
SELECT comments.comm ent_id FROM comments 
INNER JOIN posts ON  post_id=comments.post_id*/
  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "All posts for followed",
        posts: result.rows,
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

/* =========================================== */

const getPostsByUser = (req, res) => {
  const user_id = req.query.user;
  const placeholders = [user_id];
  const query = `SELECT posts.body,posts.post_id, posts.field_id ,posts.image, posts.created_at, users.firstname , users.lastname, users.profileimage FROM posts INNER JOIN users ON posts.user_id=users.user_id WHERE posts.user_id=$1 AND posts.is_deleted=0 ORDER BY created_at DESC;`;
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

/* ============================================= */

const getPostsByField = (req, res) => {
  const field_id = req.token.field_id;
  const query = `SELECT posts.body,posts.post_id, posts.field_id ,posts.image, posts.created_at, users.firstname , users.lastname, users.profileimage FROM posts INNER JOIN users ON posts.user_id=users.user_id WHERE posts.field_id=$1 AND posts.is_deleted=0 ORDER BY created_at DESC;`;
  const placeholders = [field_id];
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

/* ============================================= */

const updatePostById = (req, res) => {
  const { title, body, image, field_id } = req.body;
  const { post_id } = req.params;
  const placeholders = [title || null , body || null , image || null , field_id || null , post_id];
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

/* ============================================= */

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
          message: `Post with post_id: ${post_id} deleted successfully`,
        });
      } else {
        throw new Error(`No post with post_is: ${post_id}`);
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

/* ============================================= */

const addLike = (req, res) => {
  const { post_id } = req.body;
  const user_id = req.token.user_id;
  const placeholders = [user_id, post_id];
  const query = `INSERT INTO likes (user_id,post_id) VALUES ($1, $2) RETURNING *;`;
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

/* ============================================= */

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

/* ============================================= */

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

/* ============================================= */

const getAllLikedPostsByUser = (req, res) => {
  const user_id = req.token.user_id;
  const placeholders = [user_id];
  const query = `SELECT post_id FROM likes WHERE user_id=$1`;

  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: `All liked Posts for User: ${user_id}`,
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

/* =============================================== */

module.exports = {
  createNewPost,
  getPostsMyFollows,
  getPostsByUser,
  getPostsByField,
  updatePostById,
  deletePostById,
  addLike,
  getLikesByPost,
  deleteLike,
  getAllLikedPostsByUser,
};
