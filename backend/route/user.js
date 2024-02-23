const express = require("express");
const usersRouter = express.Router();

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
  getUserExperiences,
} = require("../controllers/user");

const authentication = require("../middlewares/authentication");

// http://localhost:5000/users/register
usersRouter.post("/register", register);

// http://localhost:5000/users/login
usersRouter.post("/login", login);

// http://localhost:5000/users/follows
usersRouter.post("/follows", authentication, createNewFollow);

// http://localhost:5000/users/search_2/field
usersRouter.get("/search_2/field", authentication, getAllUsersByField);

// http://localhost:5000/users/search_1/5
usersRouter.get("/search_1/:id", getUserById);

// http://localhost:5000/users/follows/1
usersRouter.get("/follows/:id", getAllFollowersByUserId);

// http://localhost:5000/users/follows/1
usersRouter.delete("/follows/:followed_user_id", authentication, unFollow);

// http://localhost:5000/users/institustion/1
usersRouter.get("/institustion/:id", getUsersByInstitustion);

// http://localhost:5000/users/institution_user
usersRouter.post("/institution_user", authentication, createNewInstitutionUser);

// http://localhost:5000/users/experience/:user_id
usersRouter.get("/experience/:user_id",authentication, getUserExperiences);

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
NewInstitutionUser
{
    "institution_id":1,
     "dateOfWork": "16/11/2020", 
     "workDiscription":"full stack developer with different lang"
}
 */
