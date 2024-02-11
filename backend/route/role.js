const express = require("express");
const rolesRouter = express.Router();

const {
  createNewRole,
  createNewPermissions,
  createNewField,
} = require("../controllers/role");

//  http://localhost:5000/roles/create
rolesRouter.post("/create", createNewRole);

//  http://localhost:5000/roles/permissions
rolesRouter.post("/permissions", createNewPermissions);

//  http://localhost:5000/roles/field
rolesRouter.post("/field", createNewField);

module.exports = rolesRouter;
