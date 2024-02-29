const { pool } = require("../models/db");
const { all } = require("../route/chat");

const createChat = (req, res) => {
  const { message, to_id } = req.body;
  const from_id = req.token.user_id;
  const placeholder1 = [from_id, to_id];

  const placeholder2 = [message, from_id, to_id];

  const query1 = `select from chat where chat.from_id=$1 and chat.to_id=$2`;
  const query2 = `INSERT INTO chat (message, from_id,to_id ) VALUES ($1, $2, $3) RETURNING *`;
  pool
    .query(query1, placeholder1)
    .then((result1) => {
      if (result1.rows.length) {
        pool
          .query(query2, placeholder2)
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
        res.status(200).json("already exsist");
      }
    })
    .catch((err) => {
      res.send(err.message);
    });
};

/* ============================================ */
const getMyChats = (req, res) => {
  const from = req.token.user_id;

  const placeholder = [from];
  const query = `SELECT * FROM chat JOIN users ON chat.to_id=users.user_id WHERE chat.from_id=$1 ORDER BY chat.created_at DESC`;
const allChats=[]
  pool
    .query(query, placeholder)
    .then((result) => {
      result.rows.map((e,i)=>{
      if(!allChats.includes(e.user_id)){
        console.log(!allChats.includes(e.user_id));
        allChats.push(e.user_id)
        console.log("after===========>",!allChats.includes(e.user_id));

      }
      })
      res.status(201).json({
        success: true,
        message: "your chats",
        message: allChats,
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
const getChatsByUser = (req, res) => {
  const from = req.token.user_id;
  const { to } = req.params;

  const placeholder = [from, to];
  const query = `SELECT * FROM chat JOIN users ON chat.to_id=users.user_id WHERE chat.from_id=$1 AND chat.to_id=$2 ORDER BY chat.created_at DESC`;

  pool
    .query(query, placeholder)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: `${from} chats with ${to}`,
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
module.exports = { createChat, getMyChats, getChatsByUser };
