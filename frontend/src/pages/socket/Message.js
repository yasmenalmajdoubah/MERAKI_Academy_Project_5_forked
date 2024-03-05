import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import axios from "axios";

import "./style.css";

import { useSelector } from "react-redux";

const Message = ({ socket, toId }) => {
  const [messages, setMessages] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const [to, setTo] = useState({});
  const [from, setFrom] = useState({});

  const { userId, token } = useSelector((state) => {
    return {
      userId: state.log.userId,
      token: state.log.token,
    };
  });

  console.log("token", token);
  const getUser = () => {
    axios
      .get(`https://workedin.onrender.com/users/search_1/${toId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("result", result.data.result);
        setTo(result.data.result);
        console.log("to", to);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getfrom = () => {
    axios
      .get(`https://workedin.onrender.com/users/search_1/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        console.log("result", result.data.result);
        setFrom(result.data.result);
        console.log("from", from);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getfrom();
    getUser();
    // add a an event listener on message events
    socket.on("message", reciveData);
    // remove all listeners on clean up
    return () => socket.off("message", reciveData);
  }, [allMessage]);

  const sendMessage = () => {
    // emit a `message` event with the value of the message
    socket.emit("message", { to: toId, from: userId, messages });
  };
  const reciveData = (data) => {
    console.log(data);
    setAllMessage((prev) => [...prev, data]);
    console.log(allMessage);
  };
  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto p-4">
          <div className="bg-white rounded-lg shadow-md">
            <div className="px-6 py-4">
              <h2 className="text-xl font-semibold">Start Converstion</h2>
            </div>

            {allMessage?.map((message, i) => {
              console.log(message);
              return (
                <>
                  <div className="p-4">
                    <div className="flex flex-col space-y-4">
                      {message.from === userId ? (
                        <div className="flex items-end">
                          <div className="flex-shrink-0">
                            <img
                              className="h-8 w-8 rounded-full object-cover"
                              src={from.profileimage}
                              alt="pic"
                            />
                          </div>
                          <div className="ml-3 bg-blue-100 text-blue-800 py-2 px-4 rounded-md">
                            <p className="text-sm">{message.messages}</p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex items-start justify-end">
                          <div className="mr-3 bg-gray-100 text-gray-800 py-2 px-4 rounded-md">
                            <p className="text-sm">{message.messages}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <img
                              className="h-8 w-8 rounded-full object-cover"
                              src={to.profileimage}
                              alt="pic"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </>
              );
            })}

            <div className="p-4 bg-gray-200">
              <div className="flex">
                <input
                  id="send"
                  type="text"
                  placeholder="write here ...."
                  className="flex-1 appearance-none border border-gray-300 rounded-md py-2 px-4 bg-white text-gray-700 placeholder-gray-400 focus:outline-none focus:border-blue-500"
                  onChange={(e) => {
                    setMessages(e.target.value);
                  }}
                />
                <button
                  className="ml-2 px-4 py-2 bg-blue-500 text-white font-semibold rounded-md"
                  onClick={() => {
                    sendMessage();
                    document.getElementById("send").value = "";
                  }}
                >
                  SEND
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Message;

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
