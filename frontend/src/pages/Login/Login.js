import React ,{  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUserId, setLogout } from "../../service/redux/reducers/log/logSlice";
import axios from "axios";

const Login = () => {

  const dispatch = useDispatch();

  const state = useSelector ((state)=>{
    return {
      token : state.log.token,
      userId:state.log.userId,
      
    }
   })

   const [email, setEmail] = useState("");
   const [message, setMessage] = useState("");
   const [password, setPassword] = useState("");

   const login = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("http://localhost:5000/users/login", {
        email,
        password,
      });
      if (result.data) {
       
        dispatch(setLogin(result.data.token))
        
        dispatch(setUserId(result.data.userId))

        
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Login, please try again");
    }
  };




  
    return (
      <>
        <div className="Form">
          <p className="Title">Login:</p>
          <form onSubmit={login}>
            <br />
  
            <input
              type="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <br />
            <input
              type="password"
              placeholder="Password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <br />
            <button
              onClick={(e) => {
                login(e);
              }}
            >
              Login
            </button>
          </form>
  
          
        </div>
      </>
    );
  }

export default Login