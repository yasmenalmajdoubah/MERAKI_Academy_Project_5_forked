const express = require("express");
const roleRouter = express.Router();

const {createNewRole} = require('../controllers/role')

//  http://localhost:5000/roles/create
roleRouter.post('/create', createNewRole)


module.exports = roleRouter
