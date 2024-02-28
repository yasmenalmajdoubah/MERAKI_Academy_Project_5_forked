import React, { useState } from "react";

const Settings = () => {
  const [showSetting, setShowSetting] = useState("personal");
  return (
    <div className="bg-white h-screen flex flex-col space-y-16">
      <p className="text-2xl pt-2 ps-4 font-bold">Settings</p>

      <div>
        <div className="flex items-center justify-center">
          {/* *** left Side *** */}
          <div className=" flex-col text-center justify-center w-1/5 space-y-5">
            <p
              className={
                showSetting === "personal"
                  ? "cursor-pointer bg-black text-white w-28 flex justify-center items-center h-10 font-bold"
                  : " font-bold cursor-pointer bg-white text-black w-28 flex justify-center items-center h-10"
              }
              onClick={() => {
                setShowSetting("personal");
              }}
            >
              Personal
            </p>
            <p
              className={
                showSetting === "account"
                  ? "cursor-pointer bg-black text-white w-28 flex justify-center items-center h-10 font-bold"
                  : " font-bold cursor-pointer bg-white text-black w-28 flex justify-center items-center h-10"
              }
              onClick={() => {
                setShowSetting("account");
              }}
            >
              Account
            </p>
            <p
              className={
                showSetting === "help"
                  ? "cursor-pointer bg-black text-white w-28 flex justify-center items-center h-10 font-bold"
                  : " font-bold cursor-pointer bg-white text-black w-28 flex justify-center items-center h-10"
              }
              onClick={() => {
                setShowSetting("help");
              }}
            >
              Help
            </p>
            <p
              className={
                showSetting === "FQA"
                  ? "cursor-pointer bg-black text-white w-28 flex justify-center items-center h-10 font-bold"
                  : " font-bold cursor-pointer bg-white text-black w-28 flex justify-center items-center h-10"
              }
            >
              FAQ
            </p>
          </div>
          <div className="h-80 border-e-4"></div>
          {/* *** right side *** */}
          {showSetting === "personal" ? (
            <div className="flex justify-center items-center w-2/4">
              <div>
                <p className=" flex items-center me-4 mb-2 h-10">Education:</p>
                <p className=" flex items-center me-4 mb-2 h-10">Job Name:</p>
                <p className=" flex items-center me-4 mb-2 h-10">Skills:</p>
                <p className=" flex items-center me-4 mb-2 h-10">About:</p>
                <p className=" flex items-center me-4 mb-2 h-10">Country:</p>
                <p className=" flex items-center me-4 mb-2 h-10">Update CV:</p>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Education"
                  className="mb-2 w-64 h-10 border-2 border-slate-500 rounded-md pl-2.5"
                />
                <br />
                <input
                  type="text"
                  placeholder="Job Name"
                  className="mb-2 w-64 h-10 border-2 border-slate-500 rounded-md pl-2.5"
                />
                <br />
                <input
                  type="text"
                  placeholder="Skills"
                  className="mb-2 w-64 h-10 border-2 border-slate-500 rounded-md pl-2.5"
                />
                <br />
                <input
                  type="text"
                  placeholder="About"
                  className="mb-2 w-64 h-10 border-2 border-slate-500 rounded-md pl-2.5"
                />
                <br />
                <input
                  type="text"
                  placeholder="Country"
                  className="mb-2 w-64 h-10 border-2 border-slate-500 rounded-md pl-2.5"
                />
                <br />
                <input
                  type="text"
                  placeholder="CV"
                  className="mb-2 w-64 h-10 border-2 border-slate-500 rounded-md pl-2.5"
                />
                <br />
              </div>
            </div>
          ) : showSetting === "account" ? (
            <></>
          ) : (
            <></>
          )}
        </div>
      </div>
      <div className="flex justify-around space-x-20">
        <p></p>
        <p className="bg-gray-700 text-white w-36 h-10 flex justify-center items-center shadow-lg rounded-md">
          Update Changes
        </p>
      </div>
    </div>
  );
};

export default Settings;
