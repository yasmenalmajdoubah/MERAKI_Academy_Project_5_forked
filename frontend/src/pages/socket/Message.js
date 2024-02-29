import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import "./style.css";

import { useSelector } from "react-redux";

const Message = ({socket,toId}) => {
    const [messages, setMessages] = useState("");
    const [allMessage, setAllMessage] = useState([]);
    const { userId } = useSelector((state) => {
        return {
         
          userId: state.log.userId,
          
    
        };
      });



    useEffect(() => {
        // add a an event listener on message events
        socket.on("message", reciveData);
        // remove all listeners on clean up
        return () => socket.off("message",reciveData);
      }, [allMessage]);


      const sendMessage = () => {
        // emit a `message` event with the value of the message
        socket.emit("message", {to:toId,from:userId,messages});
      };
      const reciveData =(data) => {
        console.log(data)
      setAllMessage((prev)=>([...prev, data]) );
      console.log(allMessage)
    }
  return (
    
  <>
        <div>
    <h1>Message</h1>
    <input type = "text" placeholder="message" onChange={(e)=>{
        setMessages(e.target.value)
    }}/>
   
    <button onClick={()=>{
sendMessage()
    }}>send</button>
    {allMessage.length>0 && allMessage.map(message=>{
return <p><small> from {message.from} {message.messages
}</small></p>
    })}


    
</div>      
  </>
  )
}

export default Message



/*
<div>
    <h1>Message</h1>
    <input type = "text" placeholder="message" onChange={(e)=>{
        setMessages(e.target.value)
    }}/>
    <input type = "text" placeholder="to" onChange={(e)=>{
        setTo(e.target.value)
    }}/>
    <button onClick={()=>{
sendMessage()
    }}>send</button>
    {allMessage.length>0 && allMessage.map(message=>{
return <p><small> from {message.from} {message.messages
}</small></p>
    })}


    
</div>
*/