const { pool } = require("../models/db");

const createNewRole = (req, res) => {
  const { role } = req.body;
  const placeholders = [role];
  const query = `INSERT INTO roles (role) VALUES ($1) RETURNING *`;

  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Role created successfully",
        role: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};

/* ========================================== */

const createNewPermissions = (req, res) => {
  const { permission } = req.body;
  const placeholders = [permission];
  const query = `INSERT INTO permissions (permission) VALUES ($1) RETURNING *`;

  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Permission created successfully",
        Permission: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};

/* ========================================== */

const createNewRolePermissions = (req, res) => {
  const { role_id, permission_id } = req.body;
  const placeholders = [role_id, permission_id];
  const query = `INSERT INTO role_permissions (role_id, permission_id) VALUES ($1, $2) RETURNING *`;

  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Role_Permission created successfully",
        result: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};

/* ========================================== */

const createNewField = (req, res) => {
  const { field } = req.body;
  const placeholders = [field];
  const query = `INSERT INTO field (field) VALUES ($1) RETURNING *`;

  pool
    .query(query, placeholders)
    .then((result) => {
      res.status(201).json({
        success: true,
        message: "Field created successfully",
        Field: result.rows,
      });
    })
    .catch((err) => {
      res.status(500).json({
        success: false,
        message: "Server error",
        error: err.message,
      });
    });
};

module.exports = {
  createNewRole,
  createNewPermissions,
  createNewRolePermissions,
  createNewField,
};
