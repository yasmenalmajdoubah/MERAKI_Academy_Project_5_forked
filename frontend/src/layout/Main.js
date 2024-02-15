import React from "react";
import NavBar from "../components/NavBar/NavBar";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <dev>
      <header>
        <NavBar />
      </header>
      <main>
        <Outlet />
      </main>
    </dev>
  );
};

export default Main;
