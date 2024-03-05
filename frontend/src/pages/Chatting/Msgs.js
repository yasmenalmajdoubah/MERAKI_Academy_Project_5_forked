import React from "react";
import { useState, UseEffect, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addChat,
  allChat,
  setUserChat,
  addUserChat,
} from "../../service/redux/reducers/chat/chatSlice";
import axios from "axios";
import { IoLogoBitcoin } from "react-icons/io";
import io from "socket.io-client";

/* ========================================================================== */
const Msgs = ({ socket }) => {
  const [openConver, setOpenConver] = useState(false); //* to open conversation right side
  const [convUserId, setConvUserId] = useState(""); //* with above to check which conversation open

  const [message, setMessage] = useState(""); //
  const [to_id, setTo_id] = useState(""); //

  const dispatch = useDispatch();
  const { token, userId, chat,userChat } = useSelector((state) => {
    return {
      token: state.log.token,
      userId: state.log.userId,
      chat: state.chat.chat,
      userChat: state.chat.userChat,

    };
  });
  // const socket=io("https://workedin.onrender.com/",{extraHeaders:{
  //   user_id:userId
  // }})
  // console.log(socket, "11111111111");
  /* ========================================================================== */
  const getAllMsgs = () => {
    axios
      .get("https://workedin.onrender.com/chat/messages/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        ///result.
        dispatch(allChat(result.data.message));
        // console.log(result.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* ========================================================================== */
  const sendMsg = async () => {
    try {
      const result = await axios.post(
        `https://workedin.onrender.com/chat/create`,
        {
          message,
          to_id,
          ///to_do from state when i press on converstion
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (result.data.success) {
        // setTo_id(to_id)
        const messages = result.data.message;
        dispatch(addUserChat({ messages, to_id }));
      }
    } catch (error) {
      console.log(error);
    }
  };

  /* ========================================================================== */
  const allMsgById = async (to_id) => {
    try {
      const result = await axios.get(
        `https://workedin.onrender.com/chat/messages/user/${to_id}`
      );
      if (result.data.success) {
        const chat = result.data.message;
        dispatch(setUserChat(chat));
      } else throw Error;
    } catch (error) {
      if (!error.response.data) {
        return setMessage(error.response.data.message);
      }
      setMessage("Error happened while Get Data, please try again");
    }
  };

  /* ========================================================================== */
  useEffect(() => {
    //   const socket=io("https://workedin.onrender.com/",{extraHeaders:{
    //   user_id:userId
    // }})
    getAllMsgs();

    socket?.on("message", (data) => {
      console.log("message=============>", data);
      dispatch(allChat([...chat, data]));
    });

    return () => {
      socket?.off("message", (data) => {
        dispatch(allChat([...chat, data]));
      });
    };
  }, [chat]);

  /* ========================================================================== */
  // useEffect(
  //   () => {
  //     // add a an event listener on message events
  //     socket?.on("message", reciveData);
  //     // remove all listeners on clean up
  //     /////////////////////////////=====================
  //     //dipatch(addChat(reciveData))
  //     return () => socket?.off("message", reciveData);
  //   },
  //   [
  //     /* chat */
  //   ]
  // );
  const sendMessage = () => {
    // const socket=io("https://workedin.onrender.com/",{extraHeaders:{
    //   user_id:userId
    // }})
    // emit a `message` event with the value of the message

    const newMSG = { to_id, from_id: userId, message };

    socket?.emit("message", newMSG);
  };
  const chats=[]
  // const reciveData = (data) => {
  //   // console.log(data);
  //   dispatch(allChat(data));
  // };
  // console.log(chat);
  /* ============================================================================== */
  return (
    <>
      <div className="flex mt-4 ms-2 space-x-10 bg-zinc-200 overflow-hidden relative">
        {/* ========= Left Side =================== */}
        <div className="w-1/5">
          <p className="flex items-center justify-center mb-3 text-xl bg-white h-12 font-medium text-gray-900 dark:text-gray-300 text-center">
            Last Chats
          </p>

          {chat.length !== 0 ? (
            chat.map((elem, i) => {
            
                  return(
                    <div key={elem.user_id}>
                    <div
                      className="flex p-3 items-center cursor-pointer"
                      onClick={() => {
                        setOpenConver(true);
                        setConvUserId(elem.user_id);
                        setTo_id(elem.user_id);
                      }}
                    >
                      <img
                        className="rounded-full w-14 h-14 object-cover"
                        src={elem.profileimage}
                      />
                      <p className="ms-2">
                        {elem.firstname} {elem.lastname}
                      </p>
                    </div>
                  </div>
                  )
             
             
            { /*chats.map((elem,i)=>{
              return(
                <div key={elem.user_id}>
                <div
                  className="flex p-3 items-center cursor-pointer"
                  onClick={() => {
                    setOpenConver(true);
                    setConvUserId(elem.user_id);
                    setTo_id(elem.user_id);
                  }}
                >
                  <img
                    className="rounded-full w-14 h-14 object-cover"
                    src={elem.profileimage}
                  />
                  <p className="ms-2">
                    {elem.firstname} {elem.lastname}
                  </p>
                </div>
              </div>
              )
             })*/}
            
            })
          ) : (
            <p>Start Chat</p>
          )}
        </div>
        {/* ========= الفاصل=================== */}
        <div></div>
        {/* ========= Right Side =================== */}
        {/* // ! here just a test form array above to test how it will appear >> we should use second function to get array with only one user */}
        <div className="w-3/6">
          {userChat?.map((elem, i) => {
            console.log("from userChat Map=======>",elem);
            return (
              <>
                {openConver && convUserId === elem.to_id && (
                  <div>
                    <div key={elem.to_id}>
                      <div className="flex items-center  bg-white h-12 ps-2 cursor-pointer">
                        <img
                          className="rounded-full w-10 h-10 object-cover"
                          src={elem.profileimage}
                        />
                        <p className="ms-2">
                          {elem.firstname} {elem.lastname}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-end pt-3">
                      <p className=" bg-gray-800 text-white w-fit rounded p-2 ">
                        {elem.message}
                      </p>
                    </div>
                  </div>
                )}
              </>
            );
          })}
        </div>

        {/* =============== send message ========================= */}
        <div className="fixed bottom-1 right-72">
          <input
            placeholder="write a message"
            className="rounded rounded-r-none p-2 w-96 h-10 border-2 border-gray-400 outline-none"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
          />
          <button
            className="bg-black text-white w-28 h-10 rounded rounded-l-none"
            onClick={() => {
              sendMsg();
              sendMessage();
            }}
          >
            send
          </button>
        </div>
      </div>

      {/* ======= // ! ======= ============ ??  */}
      {/* <h1>Message</h1>
      <input
        type="text"
        placeholder="message"
        onChange={(e) => {
          setMessage(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="to"
        onChange={(e) => {
          setTo_id(e.target.value);
        }}
      />
      <button
        onClick={() => {
          sendMessage();
        }}
      >
        send
      </button>
      {chat.length > 0 &&
        chat.map((message) => {
          return (
            <p>
              <small>
                {" "}
                from {message.from_id} {message.message}
              </small>
            </p>
          );
        })} */}
      {/* == //!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! */}
    </>
  );
};

export default Msgs;
