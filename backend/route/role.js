const express = require("express");
const rolesRouter = express.Router();

const {
  createNewRole,
  createNewPermissions,
  createNewRolePermissions,
  createNewField,
  getAllFields,
} = require("../controllers/role");

//  https://workedin.onrender.com/roles/create
rolesRouter.post("/create", createNewRole);

//  https://workedin.onrender.com/roles/permissions
rolesRouter.post("/permissions", createNewPermissions);

//  https://workedin.onrender.com/roles/role_permissions
rolesRouter.post("/role_permissions", createNewRolePermissions);

//  https://workedin.onrender.com/roles/field
rolesRouter.post("/field", createNewField);

//  https://workedin.onrender.com/roles/fields
rolesRouter.get("/fields", getAllFields);

module.exports = rolesRouter;
