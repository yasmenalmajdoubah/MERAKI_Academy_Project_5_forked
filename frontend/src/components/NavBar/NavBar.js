import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div>
      <div className="flex space-x-10 md:flex-auto font-mono Menlo bg-black text-white shadow-lg h-12 items-center">
        <h1 className="flex-1">WorkedIn</h1>
        <div className="flex-1">
          <input type="text" placeholder="Search" />
          <button>search</button>
        </div>
        <div className="flex-1 w-64 space-x-6 ">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/global">Global</NavLink>
          <NavLink to="/discover">Discover</NavLink>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
