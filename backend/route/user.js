const express = require("express");

const {
  register,
  login,
  createNewFollow,
  getAllUsersByField,
  getAllFollowersByUserId,
  getUserById,
  unFollow,
  getUsersByInstitustion,
  createNewInstitutionUser,
} = require("../controllers/user");

const authentication = require("../middlewares/authentication");

const usersRouter = express.Router();
//http://localhost:5000/users/register
usersRouter.post("/register", register);
//http://localhost:5000/users/login
usersRouter.post("/login", login);

//http://localhost:5000/users/follows
usersRouter.post("/follows",authentication, createNewFollow);

http://localhost:5000/users/search_2/2
usersRouter.get("/search_2/:id",authentication, getAllUsersByField);

http://localhost:5000/users/search_1/5
usersRouter.get("/search_1/:id", getUserById);

usersRouter.get("/follows/:id", getAllFollowersByUserId);

usersRouter.delete("/follows/:follow_id", unFollow);

usersRouter.get("/institustion/:id", getUsersByInstitustion);

usersRouter.post("/institution_user", authentication, createNewInstitutionUser);

module.exports = usersRouter;


/* 
REJESTIR
{
    "firstName":"hamza",
  "lastName":"aqel",
  "email":"Hamza22@gmail.com",
  "password":"123456",
  "country":"amman",
  "jobName":"teacher",
  "about":"full stack dev.",
  "phoneNumber":"0788128991",
  "role_id":1,
  "field_id":1

} */

/* 
login
{
    "email":"Hamza22@gmail.com",
    "password":"123456"
}
 */