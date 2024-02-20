const express = require("express");
const rolesRouter = express.Router();

const {
  createNewRole,
  createNewPermissions,
  createNewRolePermissions,
  createNewField,
  getAllFields,
} = require("../controllers/role");

//  http://localhost:5000/roles/create
rolesRouter.post("/create", createNewRole);

//  http://localhost:5000/roles/permissions
rolesRouter.post("/permissions", createNewPermissions);

//  http://localhost:5000/roles/role_permissions
rolesRouter.post("/role_permissions", createNewRolePermissions);

//  http://localhost:5000/roles/field
rolesRouter.post("/field", createNewField);

//  http://localhost:5000/roles/fields
rolesRouter.get("/fields", getAllFields);

module.exports = rolesRouter;
