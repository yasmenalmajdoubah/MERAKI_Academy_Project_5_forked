import React, { useEffect, useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { setLogin, setUserId } from "../../service/redux/reducers/log/logSlice";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../service/redux/reducers/profile/profileSlice";

const LoginGoogle = () => {
  const navigate = useNavigate();
  const [uploadModal, setUploadModal] = useState(false);
  const [uploadDone, setUploadDone] = useState(false);
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
  const [field_id, setField_id] = useState();
  const [role_id, setRole_id] = useState(1);
  const [allFields, setAllFields] = useState([]);
  const [profileImage, setProfileImage] = useState("");
  const [registerLoader, setRegisterLoader] = useState(false);
  const [info, setInfo] = useState(false);
  const [message, setMessage] = useState("");
  const [isUpload, setIsUpload] = useState(false);

  const dispatch = useDispatch();
  const {token,userId} = useSelector((state) => {
    return {
      token: state.log.token,
      userId: state.log.userId,
      
    };
  });
  const updateUser = (req, res) => {
    axios
      .put(
        "http://localhost:5000/users/update/user",
        {
          phoneNumber,
          country,
          education,
          jobName,
          skills,
          field_id
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data.result);
        dispatch(setUserInfo(result.data.result));
        setInfo(false)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllFields = async (e) => {
    try {
      const result = await axios.get("http://localhost:5000/roles/fields");
      if (result.data.success) {
        setAllFields(result.data.Fields);
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
    }
  };

  useEffect(() => {
    getAllFields();
  }, []);
  const login = async () => {
   
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      if (result.data) {
          console.log("login sucsses");
        {
          dispatch(setLogin(result.data.token));
          dispatch(setUserId(result.data.user_id));
        }
      } else throw Error;
    } catch (error) {
        console.log("login faild");
      if (error.response && error.response.data) {
        console.log(error.response.data.message);
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };

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
        console.log("rejestir sucsses");
        setInfo(true);

      } else throw Error;
    } catch (error) {
        setInfo(false)
        console.log(" rej faild");
      if (error.response && error.response.data) {
        setRegisterLoader(false);
        console.log(error.response.data.message);
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while register, please try again");
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
          console.log('credentialResponsedecode.email',credentialResponsedecode.email )
          setPassword(credentialResponsedecode.azp);
          setFirstName(credentialResponsedecode.given_name);
          console.log('credentialResponsedecode.given_name', credentialResponsedecode.given_name)
          setLastName(credentialResponsedecode.family_name);
          console.log('credentialResponsedecode.family_name', credentialResponsedecode.family_name)
          setProfileImage(credentialResponsedecode.picture);
          addNewUserGoogle();
         {!info&&login()} 
        }}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      {info && (
        <div id="myModal" class="modal2">
          <div className="modal-content2 ">
            <span className="close2">&times;</span>
            <input
              className="mb-2 w-64 h-10 border-2 border-slate-300 rounded-md pl-2.5 shadow-lg outline-none"
              type="text"
              placeholder="PhoneNumber"
              onChange={(e) => setPhoneNumber(e.target.value)}
            />{" "}
            <br />
            <input
              className="mb-2 w-64 h-10 border-2 border-slate-300 rounded-md pl-2.5 shadow-lg outline-none"
              type="text"
              placeholder="Country"
              onChange={(e) => setCountry(e.target.value)}
            />{" "}
            <br />
            <input
              className="mb-2 w-64 h-10 border-2 border-slate-300 rounded-md pl-2.5 shadow-lg outline-none"
              type="text"
              placeholder="Education"
              onChange={(e) => setEducation(e.target.value)}
            />
            <br />{" "}
            <input
              className="mb-2 w-64 h-10 border-2 border-slate-300 rounded-md pl-2.5 shadow-lg outline-none"
              type="text"
              placeholder="Recent Job Name"
              onChange={(e) => setJobName(e.target.value)}
            />
            <br />
            <input
              className="mb-2 w-64 h-10 border-2 border-slate-300 rounded-md pl-2.5 shadow-lg outline-none"
              type="text"
              placeholder="Skills"
              onChange={(e) => setSkills(e.target.value)}
            />
            <br />
            <div className="flex">
              <p className="flex items-center w-40 h-10 bg-white border-2 border-slate-300 rounded-md pl-2.5 shadow-lg outline-none">
                Your Field{" "}
              </p>
              <select
                className="mb-2 w-24 h-10 border-2 border-slate-300 rounded-md pl-2.5 shadow-lg"
                onChange={(e) => {
                  setField_id(e.target.value);
                }}
              >
                <option className=" text-slate-300">Choose</option>
                {allFields.map((field, i) => {
                  return (
                    <option value={field.field_id} key={field.field_id}>
                      {field.field}
                    </option>
                  );
                })}
              </select>
            </div>
           <button className=" bg-black text-white w-28" onClick={()=>{ updateUser()}}>Submit</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginGoogle;
