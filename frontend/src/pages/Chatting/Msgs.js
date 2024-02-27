import React from 'react'
import { useState, UseEffect, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
 addChat,allChat

} from "../../service/redux/reducers/chat/chatSlice"
import axios from "axios";
const Msgs = ({socket}) => {

  const [message, setMessage] = useState(""); //
  const [to_id, setTo_id] = useState(""); //


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
///result.
dispatch(addChat(result))
      console.log(result);
      }
). catch ((error)=> {
      console.log(error);}
    )

      }
      //===================================
      const sendMsg = async () => {
        try {
          const result = await axios.post(
        `http://localhost:5000/chat/create`,
        {
          message, to_id ,
          ///to_do from state when i press on converstion
        },
        {
          headers: {
            Authorization: `Bearer ${state.token}`,
          },
        }
      );
      if (result.data.success) {
       // setTo_id(to_id)
        const newChat = result.data.results;
        dispatch(addChat({ newChat, to_id }));
        
       
      }
      }
      catch (error) {
        console.log(error);
      }
  };
    
    //=======================================

const allMsgById=  async (to_id) => {
  try {
    const result = await axios.get(
      `http://localhost:5000/chat/messages/user/${to_id}`
    );
    if (result.data.success) {
      const chat = result.data.chats;
      dispatch(allChat({ chat, to_id }));
    } else throw Error;
  } catch (error) {
    if (!error.response.data) {
      return setMessage(error.response.data.message);
    }
    setMessage("Error happened while Get Data, please try again");
  }
};




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
    
    
///===============
useEffect(() => {
  // add a an event listener on message events
  socket.on("message", reciveData);
  // remove all listeners on clean up
  return () => socket.off("message",reciveData);
}, [chat]);
const sendMessage = () => {
  // emit a `message` event with the value of the message
  socket.emit("message", {to,from:user_id,messages});
};
const reciveData =(data) => {
  console.log(data)
dispatch(allChat(data))
}












  return (
   <>
     <h1>Message</h1>
        <input type = "text" placeholder="message" onChange={(e)=>{
           setMessage(e.target.value)
        }}/>
        <input type = "text" placeholder="to" onChange={(e)=>{
            setTo_id(e.target.value)
        }}/>
        <button onClick={()=>{
sendMessage()
        }}>send</button>
        {chat.length>0 && chat.map(message=>{
return <p><small> from {message.from_id} {message.message
}</small></p>
        })}

   
   </>
  )
}

export default Msgs