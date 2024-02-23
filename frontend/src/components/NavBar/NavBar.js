import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../service/redux/reducers/log/logSlice";
import { IoMdArrowDropup } from "react-icons/io";
import { AiOutlinePoweroff } from "react-icons/ai";
import { IoSettingsOutline } from "react-icons/io5";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showTab, setShowTab] = useState(false);

  const state = useSelector((state) => {
    return {
      userId: state.log.userId,
      userInfo: state.profile.userInfo,
    };
  });

  // ===========================================
  return (
    <div>
      <div className="flex justify-around md:flex-auto bg-black text-white shadow-lg h-16 items-center">
        <h1 className="flex-none text-xl ">WorkedIn</h1>
        <div className="flex-none space-x-2">
          <input
            className="rounded-lg ps-1 h-7"
            type="text"
            placeholder="Search"
          />
          <button>Search</button>
        </div>
        <div
          className="flex-none w-48 space-x-3 "
          onClick={() => {
            setShowTab(false);
          }}
        >
          <NavLink to="/">Home</NavLink>
          <NavLink to="/jobs">Jobs</NavLink>
          <NavLink to="/profile">Profile</NavLink>
          <NavLink to="/global">Global</NavLink>
          {/* <NavLink to="/discover">Discover</NavLink>  */}
        </div>
        <div className="flex-none relative">
          <img
            src={state.userInfo.profileimage}
            className="rounded-full w-12 h-12 cursor-pointer object-cover border-white border-2"
            onClick={() => {
              {
                showTab ? setShowTab(false) : setShowTab(true);
              }
            }}
          />
          {showTab && (
            <div>
              <IoMdArrowDropup
                size={25}
                color="white"
                className="absolute top-11 right-3"
              />

              <div className="absolute bg-white w-44 h-32 top-14 right-3 rounded-md shadow-2xl">
                <p
                  className="text-black font-mono ps-2 pt-2 h-10 border-b cursor-pointer"
                  onClick={() => {
                    navigate("/profile");
                    setShowTab(false);
                  }}
                >
                  Hi {state.userInfo.lastname}
                </p>
                <div className="flex ps-2 pt-1 mt-2 cursor-pointer">
                  {" "}
                  <IoSettingsOutline className="text-gray-700 mt-1 me-2" />{" "}
                  <p className="text-gray-800 font-mono">Settings</p>
                </div>
                <div
                  className="flex ps-2 pt-1 mt-1 cursor-pointer"
                  onClick={() => {
                    dispatch(setLogout());
                    navigate("/");
                  }}
                >
                  <AiOutlinePoweroff className="text-gray-700 mt-1 me-2" />{" "}
                  <p className="text-gray-800 font-mono">Logout</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
