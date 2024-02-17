import React ,{  useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUserId, setLogout } from "../../service/redux/reducers/log";
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





  return (
    <div  className='font-black' >Login</div>
  )
}

export default Login