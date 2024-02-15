import React from "react";
import Main from "./Main";
import Login from "../pages/Login/Login";

const Navigator = () => {
  return <div>{true ? <Main /> : <Login />}</div>;
};

export default Navigator;
