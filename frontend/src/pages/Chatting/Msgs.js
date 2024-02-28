import React from 'react'
import { useState, UseEffect, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
 addChat,allChat

} from "../../service/redux/reducers/chat/chatSlice"
import axios from "axios";
const Msgs = ({socket}) => {


    const dispatch=useDispatch()
    const { token, userId, chat } = useSelector((state) => {
        return {
          token: state.log.token,
          userId: state.log.userId,
          chat: state.chat.chat,
        };
      });
      const getAllMsgs =()=>{axios.get("http://localhost:5000/chat/messages/all",{
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    ).then((result)=>  {

      console.log(result);
      }
). catch ((error)=> {
      console.log(error);}
    )

      }


      useEffect(() => {
      getAllMsgs()
  
        socket?.on("message",(data)=>{

          dispatch(allChat(data))
        });
    
    
      return()=>{
        socket?.off("messag",()=>{
            socket?.on("message",(data)=>{
                dispatch(addChat(data))
              });  
        })
      
      }
    
      }, [chat]);
      const sendMsg=axios.post("")
      
    
  return (
   <>
   <input type="text"/>
   <input type="text"/>
   <button>send</button>
   
   </>
  )
}

export default Msgs