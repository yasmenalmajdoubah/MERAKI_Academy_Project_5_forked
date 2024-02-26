import React from "react";
import { PiWechatLogoFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const ChatIcon = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => {
        navigate("/chat");
      }}
    >
      <PiWechatLogoFill size={85} className="" />
    </div>
  );
};

export default ChatIcon;
