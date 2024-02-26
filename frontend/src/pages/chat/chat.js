import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
    addChat,allChat
} from "../../service/redux/reducers/chat/chatSlice";
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");





export const chat= ()=>{

    const dispatch = useDispatch();

    const state = useSelector((state) => {
        return {
          token: state.log.token,
         
          chat: state.chat.chat,
        };
      });

      











return(
    <></>
)
}
export default chat;