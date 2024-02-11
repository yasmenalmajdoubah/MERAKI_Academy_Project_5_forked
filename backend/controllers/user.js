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
              userId: result.rows[0].user_id,
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
                userId: result.rows[0].user_id,
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

module.exports = {
  register,
  login,
};
