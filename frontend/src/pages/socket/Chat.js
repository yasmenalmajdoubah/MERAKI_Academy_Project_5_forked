import React, { useState, useEffect } from "react";
import socketInt from "./socketInt";
import Message from "./Message";
import { useSelector } from "react-redux";
import "./style.css";
const Chat = () => {
    //const [user_id, setUser_id] = useState("")
    //const [token, setToken] = useState("")
    const [socket, setSocket] = useState(null)
    const [isConnected, setIsConnected] = useState(false)
    const { userId } = useSelector((state) => {
        return {
         
          userId: state.log.userId,
          
    
        };
      });
    //socket connection
    ///connect
    useEffect(() => {
      // socketInt({user_id,token})
        
      // add a an event listener on message events
      socket?.on("connect", () => {
        console.log(true);
        setIsConnected(!isConnected)
      });
      socket?.on("connect_error", (error) => {
        console.log(error.message);
      });
      return ()=>{
        socket?.close()
        socket?.removeAllListeners()   
        setIsConnected(!isConnected)
  
       }
     
    }, [socket]);
  
    return (

     
    <div className="c">
      <h1> Hello, World!</h1>
      
     
      <button onClick={()=>{
setSocket(socketInt({userId}))
      }}>connect</button>
 {isConnected&& <Message socket={socket} />}
    </div>
     
    );
  }


export default Chat