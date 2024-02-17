import React from "react";
import Main from "./Main";
import Login from "../pages/Login/Login";
import { useSelector } from "react-redux";

const Navigator = () => {
  const state = useSelector((state) => {
    return {
      token: state.log.token,
    };
  });

  return <div>{state.token ? <Main /> : <Login />}</div>;
};

export default Navigator;
