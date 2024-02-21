import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../service/redux/reducers/log/logSlice";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const state = useSelector((state) => {
    return {
      userId: state.log.userId,
    };
  });

  // ===========================================
  return (
    <div>
      <div className="flex justify-around md:flex-auto bg-black text-white shadow-lg h-12 items-center">
        <h1 className="flex-none text-xl ">WorkedIn</h1>
        <div className="flex-none space-x-2">
          <input className="rounded-lg ps-1 h-7" type="text" placeholder="Search" />
          <button>Search</button>
        </div>
        <div className="flex-none w-64 space-x-3 ">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/jobs">
            Jobs
          </NavLink>
          <NavLink to="/profile">
            Profile
          </NavLink>
          <NavLink to="/global" >
            Global
          </NavLink>
          {/* <NavLink to="/discover">Discover</NavLink> */}
        </div>
        <div className="flex-none cursor-pointer">
          <p
            onClick={() => {
              dispatch(setLogout());
              navigate("/");
            }}
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
