import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { setLogin, setUserId } from "../../service/redux/reducers/log/logSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

const LoginGoogle = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobName, setJobName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [CV, setCV] = useState("");
  const [skills, setSkills] = useState("");
  const [education, setEducation] = useState("");
  const [field_id, setField_id] = useState("");
  const [role_id, setRole_id] = useState(1);
  const [allFields, setAllFields] = useState([]);
const [profileImage, setProfileImage] = useState("")
  const [registerLoader, setRegisterLoader] = useState(false);

  const [message, setMessage] = useState("");
  const dispatch = useDispatch();

  const addNewUserGoogle = async () => {
    try {
      const result = await axios.post("http://localhost:5000/users/register", {
        firstName,
        lastName,
        jobName,
        country,
        email,
        password,
        CV,
        phoneNumber,
        skills,
        education,
        field_id,
        role_id,
      });
      if (result.data.success) {
        setRegisterLoader(false);
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        setRegisterLoader(false);
        console.log(error.response.data.message);
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };
  const login = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      if (result.data) {
        {
          dispatch(setLogin(result.data.token));
          dispatch(setUserId(result.data.user_id));
        }
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };
  return (
    <div>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const credentialResponsedecode = jwtDecode(
            credentialResponse.credential
          );
          console.log("dataaa", credentialResponsedecode);
          setEmail(credentialResponsedecode.email);
          setPassword(credentialResponsedecode.azp);
          setFirstName(credentialResponsedecode.given_name);
          setLastName(credentialResponsedecode.family_name);
          setProfileImage(credentialResponsedecode.picture)
          
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
    </div>
  );
};

export default LoginGoogle;
