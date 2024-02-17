import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setUserId, setLogout } from "../redux/reducers/log";
const Login = () => {

  const dispatch = useDispatch();

  const state = useSelector ((state)=>{
    return {
      token : state.log.token,
      userId:state.log.userId,
      
    }
   })







  return (
    <div  className='font-black' >Login</div>
  )
}

export default Login