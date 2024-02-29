import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

import "./style.css";

import { useSelector } from "react-redux";

const Message = ({socket,toId}) => {
    const [messages, setMessages] = useState("");
    const [allMessage, setAllMessage] = useState([]);
    const [to, setTo] = useState({});
const [from,setFrom]= useState({});
    const { userId,token } = useSelector((state) => {
        return {
         
          userId: state.log.userId,
          token: state.log.token,
    
        };
      });

console.log('token', token)
      const getUser = () => {
        axios
          .get(`http://localhost:5000/users/search_1/${toId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            console.log('result', result.data.result)
           setTo(result.data.result);
           console.log ("to",to)
          })
          .catch((err) => {
            console.log(err);
          });
      };
      const getfrom = () => {
        axios
          .get(`http://localhost:5000/users/search_1/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          })
          .then((result) => {
            console.log('result', result.data.result)
           setFrom(result.data.result);
           console.log ("from",from)
          })
          .catch((err) => {
            console.log(err);
          });
      };







    useEffect(() => {
        getfrom()
        getUser()
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