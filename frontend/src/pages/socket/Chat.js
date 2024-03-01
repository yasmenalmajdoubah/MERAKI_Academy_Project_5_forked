import React, { useState, useEffect } from "react";
import socketInt from "./socketInt";
import Message from "./Message";
import { useParams } from "react-router";

import { useSelector } from "react-redux";
import "./style.css";
const Chat = () => {
  //const [user_id, setUser_id] = useState("")
  //const [token, setToken] = useState("")
  const [socket, setSocket] = useState(null);
  const [isConnected, setIsConnected] = useState(false);
  const { userId } = useSelector((state) => {
    return {
      userId: state.log.userId,
    };
  });

  const { id } = useParams();
  console.log("id------", id);
  //socket connection
  ///connect
  useEffect(() => {
    //socketInt({userId})

    // add a an event listener on message events
    socket?.on("connect", () => {
      console.log(true);
      setIsConnected(!isConnected);
    });
    socket?.on("connect_error", (error) => {
      console.log(error.message);
    });
    return () => {
      socket?.close();
      socket?.removeAllListeners();
      setIsConnected(!isConnected);
    };
  }, [socket]);

  return (
    <div className="c">
    {isConnected ? (
      <Message socket={socket} toId={id} />
    ) : (
      <>
      <div className="flex items-center justify-center h-screen"><p className="text-2xl font-semibold">Press Here To Start Conversation   </p><br/>
        <img
          src="https://media.tenor.com/9DDAH7lIg0sAAAAM/typing-message.gif"
          onClick={() => {
            setSocket(socketInt({ userId }));
          }}
        />{" "}</div>
        
      </>
    )}
  </div>
  );
};

export default Chat;
