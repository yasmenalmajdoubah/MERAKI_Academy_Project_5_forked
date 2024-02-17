import React ,{  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
//import { setLogin, setUserId, setLogout } from "../../service/redux/reducers/log/logSlice";
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
  
  const dispatch = useDispatch();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [jobName, setJobName] = useState("");
  const [country, setCountry] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(0);
  const [about, setAbout] = useState("");
  return (
    <div>Register</div>
  )
}

export default Register