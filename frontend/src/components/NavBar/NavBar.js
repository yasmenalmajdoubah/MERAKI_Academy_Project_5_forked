import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../service/redux/reducers/log/logSlice";
import { IoMdArrowDropup } from "react-icons/io";
import { AiOutlinePoweroff } from "react-icons/ai";
import { TbHelpHexagon } from "react-icons/tb";
import { IoSettingsOutline } from "react-icons/io5";

import axios from "axios";
import "./NavBar.css";

const NavBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showTab, setShowTab] = useState(false);
  const [showSrearch, setShowSrearch] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  const state = useSelector((state) => {
    return {
      userId: state.log.userId,
      userInfo: state.profile.userInfo,
    };
  });

  // ======== search function ===================
  const userSearch = () => {
    axios
      .put("https://workedin.onrender.com/users/search", {
        searchInput,
      })
      .then((result) => {
        setShowLoader(false);
        setSearchResult(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // ===========================================
  return (
    <div>
      <div className="flex justify-around md:flex-auto bg-black shadow-lg h-16 items-center relative">
        <h1 className="flex-none text-xl text-white">WorkedIn</h1>

        {/* ************* search ****************************************** */}
        <div className="flex-none space-x-2 search">
          <input
            id="search"
            className="rounded ps-1 h-7 w-56 outline-none"
            type="text"
            placeholder="Search"
            onChange={(e) => {
              setSearchInput(e.target.value);
            }}
          />
          <button
            className="text-white"
            onClick={() => {
              setShowSrearch(true);
              userSearch();
              document.getElementById("search").value = "";
            }}
          >
            Search
          </button>
          {/* -- search result window -- */}
          {showSrearch && (
            <div className="modal-Search z-10">
              <div className="pb-1 border-b-2 border-gray-400">
                <span
                  className="close  cursor-pointer"
                  onClick={() => {
                    setShowSrearch(false);
                  }}
                >
                  &times;
                </span>
                <p>Results</p>
              </div>
              {showLoader ? (
                <div className="flex justify-center p-3">
                  <div className="loaderSrearch"></div>
                </div>
              ) : searchResult.length !== 0 ? (
                <div>
                  {searchResult.map((elem, i) => {
                    return (
                      <div key={elem.user_id}>
                        <div
                          className="flex mt-2 items-center cursor-pointer"
                          onClick={() => {
                            navigate(`/friend/${elem.user_id}`);
                            setShowSrearch(false);
                          }}
                        >
                          <img
                            className="rounded-full w-12 h-12"
                            src={elem.profileimage}
                          />
                          <p className="ms-2">
                            {elem.firstname} {elem.lastname}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="mt-2">No Match Result</p>
              )}
            </div>
          )}
          {/* ------------------------- */}
        </div>

        {/* ************************************************************ */}
        <div
          className="flex-none w-48 space-x-3 "
          onClick={() => {
            setShowTab(false);
            setShowSrearch(false);
          }}
        >
          <NavLink className="text-white" to="/">
            Home
          </NavLink>
          <NavLink className="text-white" to="/profile">
            Profile
          </NavLink>

          <NavLink className="text-white" to="/jobs">
            Jobs
          </NavLink>

          <NavLink className="text-white" to="/global">
            Community
          </NavLink>
        </div>

        <div className="flex-none relative">
          <img
            src={state.userInfo.profileimage}
            className="rounded-full w-12 h-12 cursor-pointer object-cover border-white border-2"
            onClick={() => {
              {
                showTab ? setShowTab(false) : setShowTab(true);
              }
              setShowSrearch(false);
            }}
          />
          {showTab && (
            <div>
              <IoMdArrowDropup
                size={25}
                color="white"
                className="absolute top-11 right-3"
              />

              <div className="absolute z-10 bg-white w-44 h-40 top-14 right-3 rounded-md shadow-2xl">
                <p
                  className="text-black font-mono ps-2 pt-2 h-10 border-b cursor-pointer"
                  onClick={() => {
                    navigate("/profile");
                    setShowTab(false);
                  }}
                >
                  Mr {state.userInfo.lastname}
                </p>
                <div
                  className="flex ps-2 pt-1 mt-2 cursor-pointer"
                  onClick={() => {
                    navigate("/settings");
                    setShowTab(false);
                  }}
                >
                  {" "}
                  <IoSettingsOutline className="text-gray-700 mt-1 me-2" />{" "}
                  <p className="text-gray-800 font-mono">Settings</p>
                </div>
                <div
                  className="flex ps-2 pt-1 mt-2 cursor-pointer"
                  onClick={() => {
                    navigate("/help");
                    setShowTab(false);
                  }}
                >
                  {" "}
                  <TbHelpHexagon className="text-gray-700 mt-1 me-2" />{" "}
                  <p className="text-gray-800 font-mono">Help center</p>
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
