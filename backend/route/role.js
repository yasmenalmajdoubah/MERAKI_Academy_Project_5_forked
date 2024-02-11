const express = require("express");
const roleRouter = express.Router();

const { createNewRole, createNewPermissions } = require("../controllers/role");

//  http://localhost:5000/roles/create
roleRouter.post("/create", createNewRole);

//  http://localhost:5000/roles/permissions
roleRouter.post("/permissions", createNewPermissions);

module.exports = roleRouter;
