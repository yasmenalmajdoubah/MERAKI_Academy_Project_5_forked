import React from "react";
import Main from "./Main";
import Login from "../pages/Login/Login";

const Navigator = () => {
  return <div>{false ? <Main /> : <Login />}</div>;
};

export default Navigator;
