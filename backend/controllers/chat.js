const { pool } = require("../models/db");

const createChat = (req, res) => {
  const { message, to_id } = req.body;
  const from_id = req.token.user_id;

  const placeholder = [message, from_id, to_id];
  const query = `INSERT INTO chat (message, from_id ,to_id) VALUES ($1, $2, $3) RETURNING *`;

  pool
    .query(query, placeholder)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "message sent successfully",
        message: result.rows,
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

/* ============================================ */
const getAllMessages = (req, res) => {
  const from = req.token.user_id;
  const { to } = req.params;

  const placeholder = [from, to];
  const query = `SELECT * FROM chat JOIN users ON chat.to_id=users.user_id WHERE chat.from_id=$1 OR chat.to_id=$2 ORDER BY chat.created_at DESC`;

  pool
    .query(query, placeholder)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "message sent successfully",
        message: result.rows,
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
module.exports = { createChat, getAllMessages };
