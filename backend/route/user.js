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
  updateUserInfo,
  userSearch,
} = require("../controllers/user");

const authentication = require("../middlewares/authentication");

// https://workedin.onrender.com/users/search
usersRouter.put("/search", userSearch);

// https://workedin.onrender.com/users/update/user
usersRouter.put("/update/user", authentication, updateUserInfo);

// https://workedin.onrender.com/users/register
usersRouter.post("/register", register);

// https://workedin.onrender.com/users/login
usersRouter.post("/login", login);

// https://workedin.onrender.com/users/follows
usersRouter.post("/follows", authentication, createNewFollow);

// https://workedin.onrender.com/users/search_2/field
usersRouter.get("/search_2/field", authentication, getAllUsersByField);

// https://workedin.onrender.com/users/search_1/5
usersRouter.get("/search_1/:id", getUserById);

// https://workedin.onrender.com/users/follows/1
usersRouter.get("/follows/:id", getAllFollowersByUserId);

// https://workedin.onrender.com/users/follows/1
usersRouter.delete("/follows/:followed_user_id", authentication, unFollow);

// https://workedin.onrender.com/users/institustion/1
usersRouter.get("/institustion/:id", getUsersByInstitustion);

// https://workedin.onrender.com/users/institution_user
usersRouter.post("/institution_user", authentication, createNewInstitutionUser);

// https://workedin.onrender.com/users/experience/:user_id
usersRouter.get("/experience/:user_id", authentication, getUserExperiences);

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
