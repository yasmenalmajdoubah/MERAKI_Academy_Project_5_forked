import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  /*
   firstName,
    lastName,
    jobName,
    country,
    email,
    password,
    about,
    CV,
    phoneNumber,
    skills,
    education,
    field_id,
    role_id,
  */

  //const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobName, setJobName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [about, setAbout] = useState("");
  const [CV, setCV] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [field_id, setField_id] = useState(1);
  const [role_id, setRole_id] = useState("");

  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  /* ====================================================== */
  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/register", {
        firstName,
        lastName,
        jobName,
        country,
        email,
        password,
        about,
        CV,
        phoneNumber,
        skills,
        education,
        field_id,
        role_id,
      });
      if (result.data.success) {
        setStatus(true);
        setMessage(result.data.message);
        console.log(result.data);
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };
  /* ===================================================================== */
  return (
    <>
      {nextPage ? (
        <div>
          <p className="font-bold text-3xl text-center">Register</p>
          <br />
          <label>Type of account: </label>
          <select
            className="mb-2 w-30 h-9 border-2 border-slate-700 rounded-md pl-2.5"
            onChange={(e) => {
              if (e.target.value === "User") {
                setRole_id(1);
              }
              if (e.target.value === "Institution") {
                setRole_id(2);
              }
            }}
          >
            <option className="text-gray-500">Choose</option>
            <option value="User">User</option>
            <option value="Institution">Institution</option>
          </select>
          <br />
          <input
            className="mb-2 w-64 h-10 border-2 border-slate-700 rounded-md pl-2.5"
            type="text"
            placeholder="PhoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <br />{" "}
          <input
            className="mb-2 w-64 h-10 border-2 border-slate-700 rounded-md pl-2.5"
            type="text"
            placeholder="Country"
            onChange={(e) => setCountry(e.target.value)}
          />
          <br />{" "}
          <input
            className="mb-2 w-64 h-10 border-2 border-slate-700 rounded-md pl-2.5"
            type="text"
            placeholder="CV"
            onChange={(e) => setCV(e.target.value)}
          />
          <br />
          <input
            className="mb-2 w-64 h-10 border-2 border-slate-700 rounded-md pl-2.5"
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <input
            className="mb-2 w-64 h-10 border-2 border-slate-700 rounded-md pl-2.5"
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <br />{" "}
          <button
            onClick={addNewUser}
            className=" mt-3 bg-black text-white w-64 h-10 border-2 rounded-md shadow-lg"
          >
            Register
          </button>
          <button
            onClick={() => {
              setNextPage(false);
            }}
            className=" mt-3 bg-black text-white w-64 h-10 border-2 rounded-md shadow-lg"
          >
            Back
          </button>
          <button
            className=" mt-3 bg-black text-white w-64 h-10 border-2 rounded-md shadow-lg"
            onClick={() => {
              navigate("/");
            }}
          >
            Login Page
          </button>
        </div>
      ) : (
        <div>
          <p className="font-bold text-3xl text-center">Register</p>
          <br />
          <input
            className="mb-2 w-64 h-10 border-2 border-slate-700 rounded-md pl-2.5"
            type="text"
            placeholder="First Name"
            onChange={(e) => setFirstName(e.target.value)}
          />
          <br />
          <input
            className="mb-2 w-64 h-10 border-2 border-slate-700 rounded-md pl-2.5"
            type="text"
            placeholder="Last Name"
            onChange={(e) => setLastName(e.target.value)}
          />
          <br />
          <input
            className="mb-2 w-64 h-10 border-2 border-slate-700 rounded-md pl-2.5"
            type="text"
            placeholder="About"
            onChange={(e) => setAbout(e.target.value)}
          />
          <br />
          <input
            className="mb-2 w-64 h-10 border-2 border-slate-700 rounded-md pl-2.5"
            type="text"
            placeholder="Job Name"
            onChange={(e) => setJobName(e.target.value)}
          />
          <br />
          <input
            className="mb-2 w-64 h-10 border-2 border-slate-700 rounded-md pl-2.5"
            type="text"
            placeholder="Education"
            onChange={(e) => setEducation(e.target.value)}
          />
          <br />{" "}
          <input
            className="mb-2 w-64 h-10 border-2 border-slate-700 rounded-md pl-2.5"
            type="text"
            placeholder="Skills"
            onChange={(e) => setSkills(e.target.value)}
          />
          <br />
          <button
            onClick={() => {
              setNextPage(true);
            }}
            className=" mt-3 bg-black text-white w-64 h-10 border-2 rounded-md shadow-lg"
          >
            next
          </button>
          <button
            className=" mt-3 bg-black text-white w-64 h-10 border-2 rounded-md shadow-lg"
            onClick={() => {
              navigate("/");
            }}
          >
            Login Page
          </button>
          <br />
        </div>
      )}
    </>
  );
};

export default Register;
