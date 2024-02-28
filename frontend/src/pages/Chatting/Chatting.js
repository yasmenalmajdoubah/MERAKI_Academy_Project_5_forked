import React from 'react'
import { useState, UseEffect, useEffect } from "react";
import { UseSelector, useDispatch, useSelector } from "react-redux";
import SocketServer from './SocketServer';
import axios from "axios";
 import Msgs from './Msgs';
import Button from 'react-bootstrap/esm/Button';
const Chatting = () => {
    const [socket, setSocket] = useState(null);

    const { token, userId, chat } = useSelector((state) => {
      return {
        token: state.log.token,
        userId: state.log.userId,
        chat: state.chat.chat,
      };
    });

    useEffect(() => {
      
  
      socket?.on("connect",()=>{
          console.log("connected")
      });
  
    socket?.on("connect_error",(error)=>{
      console.log(error.message)
    });
    return()=>{
      socket?.close()
      socket?.removeAllListeners()
      console.log("closed");
    }
  
    }, [socket]);
  return (
    <>
    <button onClick={()=>{
        setSocket(SocketServer( userId ));
    }}>Chatting</button>
    <Msgs sokcet={socket}/>
    </>
  )
}

export default Chatting