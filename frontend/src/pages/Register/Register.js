import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import axios from "axios";
const Register = () => {
  /*
  firstName,
    lastName,
    profileImage,
    coverImage,
    jobName,
    country,
    email,
    password,
    about,
    CV,
    phoneNumber,
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
  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  ////
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(false);

  const addNewUser = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/register", {
        firstName,
        lastName,
        // profileImage,
        // coverImage,
        jobName,
        country,
        email,
        password,
        about,
        //  CV,
        phoneNumber,
      });
      if (result.data.success) {
        setStatus(true);
        setMessage(result.data.message);
      } else throw Error;
    } catch (error) {
      setStatus(false);
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };

  return (
    <>
      <div className="Form">
        <>
          <p className="Title">Register</p>
          <form onSubmit={addNewUser}>
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
              placeholder="PhoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <br />
            <input
              className="mb-2 w-64 h-10 border-2 border-slate-700 rounded-md pl-2.5"
              type="text"
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
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
            <br />
            <button className=" mt-3 bg-black text-white w-64 h-10 border-2 rounded-md shadow-lg">
              Register
            </button>
            <br />
          </form>
        </>
      </div>
    </>
  );
};

export default Register;
