const { pool } = require("../models/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
  const {
    firstName,
    lastName,
    profileImage,
    coverImage,
    jobName,
    country,
    email,
    password,
    about,
    CV,
    phoneNumber,
    field_id,
    role_id,
  } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 7); //salt = 7
  const query = `INSERT INTO users (firstName,
        lastName,
        profileImage,
        coverImage,
        jobName,
        country,
        email,
        password,
        about,
        CV,
        phoneNumber,
        field_id,
        role_id) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *`;
  const placeholders = [
    firstName,
    lastName,
    profileImage,
    coverImage,
    jobName,
    country,
    email.toLowerCase(),
    encryptedPassword,
    about,
    CV,
    phoneNumber,
    field_id,
    role_id,
  ];
  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(200).json({
        success: true,
        message: "Account created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(409).json({
        success: false,
        message: "The email already exists",
        err: err.message,
      });
    });
};

/* ============================================= */

const login = (req, res) => {
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  const query = `SELECT * FROM users WHERE email=$1`;
  const placeholders = [email];
  pool
    .query(query, placeholders)
    .then((result) => {
      if (result.rows.length) {
        bcrypt.compare(password, result.rows[0].password, (err, response) => {
          if (err) res.json(err);
          if (response) {
            const payload = {
              user_id: result.rows[0].user_id,
              country: result.rows[0].country,
              role: result.rows[0].role_id,
              CV: result.rows[0].CV,
              phoneNumber: result.rows[0].phoneNumber,
              jobName: result.rows[0].jobName,
              field_id: result.rows[0].field_id,
            };
            const options = { expiresIn: "2d" };
            const secret = process.env.SECRET;
            const token = jwt.sign(payload, secret, options);
            if (token) {
              return res.status(200).json({
                token,
                success: true,
                message: `Valid login credentials`,
                user_id: result.rows[0].user_id,
              });
            } else {
              throw Error;
            }
          } else {
            res.status(403).json({
              success: false,
              message: `The email doesn’t exist or the password you’ve entered is incorrect`,
            });
          }
        });
      } else throw Error;
    })
    .catch((err) => {
      res.status(403).json({
        success: false,
        message:
          "The email doesn’t exist or the password you’ve entered is incorrect",
        err,
      });
    });
};

/* ============================================= */

const getAllUsersByField = (req, res) => {
  const id = req.params.id;
  const query = `SELECT user_id,firstName,lastName FROM users  WHERE field_id=$1 ;`;
  const placeholders = [id];

  pool
    .query(query, placeholders)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The users with Field: ${id}`,
          result: result.rows,
        });
      } else {
        throw new Error(`No users on Field: ${id}`);
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

/* ============================================= */

const createNewFollow = (req, res) => {
  const { followed_user_id } = req.body;
  const following_user_id = req.token.user_id;
  const query = `INSERT INTO follows (followed_user_id,following_user_id) VALUES ($1,$2)`;
  const placeholders = [followed_user_id, following_user_id];
  pool
    .query(query, data)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Followed successfully",
        result: result.rows[0],
      });
    })
    .catch((err) => {
      res.status(404).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

/* ============================================= */

const unFollow = (req, res) => {
  const id = req.params.id;
  const query = `UPDATE follows SET is_deleted=1 WHERE followed_user_id=$1;`;
  const placeholders = [id];
  pool
    .query(query, placeholders)
    .then((result) => {
      if (result.rowCount !== 0) {
        res.status(200).json({
          success: true,
          message: `follower with id: ${id} deleted successfully`,
        });
      } else {
        throw new Error("Error happened while deleting article");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

/* ============================================= */

const getAllFollowersByUserId = (req, res) => {
  const id = req.params.id;
  const query = `SELECT users.firstName, users.lastName, users.user_id 
  FROM users
 LEFT JOIN  follows
 ON follows.user_id=users.user_id 
  WHERE followed_user_id=$1 ;`;
  const placeholders = [id];

  pool
    .query(query, placeholders)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The follows for user with id = ${id}`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting follows");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

/* ============================================= */

const getUserById = (req, res) => {
  const id = req.params.id;
  const query = `SELECT firstName,lastName,email,CV FROM users WHERE user.id=$1`;
  const placeholders = [id];

  pool
    .query(query, placeholders)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The article with id: ${id}`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting user");
      }
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        err: err,
      });
    });
};

/* ============================================= */

const getUsersByInstitustion = (req, res) => {
  const id = req.params.id;
  const query = `SELECT users.firstName,users.lastName,users.email FROM users LEFT JOIN institution_user
  ON institution_user.institution_id=users.user_id 
  WHERE institution_user.institution_user_id=$1`;
  const placeholders = [id];

  pool
    .query(query, placeholders)
    .then((result) => {
      if (result.rows.length !== 0) {
        res.status(200).json({
          success: true,
          message: `The user  with institution-id: ${id}`,
          result: result.rows,
        });
      } else {
        throw new Error("Error happened while getting user");
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

const createNewInstitutionUser = (req, res) => {
  const user_id = req.token.user_id;
  const { institution_id, dateOfWork, workDiscription } = req.body;
  const placeholders = [institution_id, user_id, dateOfWork, workDiscription];
  const query = `INSERT INTO institution_user (institution_id, user_id, dateOfWork, workDiscription) VALUES ($1,$2,$3,$4) RETURNING *`;

  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `Created successfully`,
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

module.exports = {
  register,
  login,
  createNewFollow,
  getAllUsersByField,
  getUserById,
  getAllFollowersByUserId,
  unFollow,
  createNewInstitutionUser,
  getUsersByInstitustion,
};
