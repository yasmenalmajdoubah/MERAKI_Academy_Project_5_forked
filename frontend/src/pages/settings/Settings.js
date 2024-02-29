import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CiSquarePlus } from "react-icons/ci";

const Settings = () => {
  const navigate = useNavigate();

  const [showSetting, setShowSetting] = useState("jobInfo");
  const [modal, setModal] = useState(false);

  return (
    <>
      <div className="bg-white h-screen space-y-8">
        <p className="text-2xl pt-2 ps-4 font-bold">Settings</p>

        <div>
          <div className="flex items-center justify-center">
            {/* *** left Side *** */}
            <div className=" flex-col text-center justify-center w-1/5 space-y-5">
              <p
                className={
                  showSetting === "jobInfo"
                    ? "cursor-pointer bg-black text-white w-28 flex justify-center items-center h-10 font-bold"
                    : " font-bold cursor-pointer bg-white text-black w-28 flex justify-center items-center h-10"
                }
                onClick={() => {
                  setShowSetting("jobInfo");
                }}
              >
                Job Info
              </p>
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
                  navigate("/help");
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
            {showSetting === "jobInfo" ? (
              /* ----------------------- Job Info settings -------------------------------------- */
              <div className="flex justify-center items-center w-2/4">
                <div>
                  <p className=" flex items-center me-4 mb-2 h-10">Job Name:</p>
                  <p className=" flex items-center me-4 mb-2 h-10">
                    Update CV:
                  </p>
                  <p className=" flex items-center me-4 mb-2 h-10">
                    Add Experiences:
                  </p>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Job Name"
                    className="mb-2 w-64 h-10 border-2 border-slate-500 rounded-md pl-2.5"
                  />

                  <div className="flex mb-2 ">
                    <p className="flex justify-center items-center rounded-md rounded-e-none w-20 p-1 h-10  text-sm font-medium text-white dark:text-white bg-black">
                      Upload CV
                    </p>
                    <p className="flex justify-start ps-3 items-center rounded-md rounded-s-none w-44 p-1 h-10  text-xs font-medium text-gray-400 bg-gray-200">
                      PDF , WORD (MAX. 2MG).
                    </p>
                  </div>

                  <div
                    className="flex items-center w-64 h-10 pl-2.5  cursor-pointer"
                    onClick={() => {
                      setModal(true);
                    }}
                  >
                    <CiSquarePlus size={40} />
                    <p className="text-gray-500 ms-1">Add New Experience</p>
                  </div>
                </div>
              </div>
            ) : showSetting === "personal" ? (
              /* ----------------------- personal settings -------------------------------------- */
              <div className="flex justify-center items-center w-2/4">
                <div>
                  <p className=" flex items-center me-4 mb-2 h-10">
                    Education:
                  </p>
                  <p className=" flex items-center me-4 mb-2 h-10">Skills:</p>
                  <p className=" flex items-center me-4 mb-2 h-10">About:</p>
                  <p className=" flex items-center me-4 mb-2 h-10">Country:</p>
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
                    placeholder="Skills"
                    className="mb-2 w-64 h-10 border-2 border-slate-500 rounded-md pl-2.5"
                  />
                  <br />
                  <textarea
                    type="text"
                    placeholder="About"
                    className="mb-2 w-64 h-10 border-2 border-slate-500 rounded-md pl-2.5 pt-1"
                  ></textarea>
                  <br />
                  <input
                    type="text"
                    placeholder="Country"
                    className="mb-2 w-64 h-10 border-2 border-slate-500 rounded-md pl-2.5"
                  />
                  <br />
                </div>
              </div>
            ) : (
              /* ----------------------- Account settings -------------------------------------- */
              <div className="flex justify-center items-center w-2/4">
                <div>
                  <p className=" flex items-center me-4 mb-2 h-10">
                    New Email:
                  </p>
                  <p className=" flex items-center me-4 mb-2 h-10">
                    Current Passowrd:
                  </p>
                  <p className=" flex items-center me-4 mb-2 h-10">
                    New Passowrd:
                  </p>
                  <p className=" flex items-center me-4 mb-2 h-10">
                    Confirm Passowrd:
                  </p>
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="New Email"
                    className="mb-2 w-64 h-10 border-2 border-slate-500 rounded-md pl-2.5"
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Current Passowrd"
                    className="mb-2 w-64 h-10 border-2 border-slate-500 rounded-md pl-2.5"
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="New Passowrd"
                    className="mb-2 w-64 h-10 border-2 border-slate-500 rounded-md pl-2.5"
                  />
                  <br />
                  <input
                    type="text"
                    placeholder="Confirm Passowrd"
                    className="mb-2 w-64 h-10 border-2 border-slate-500 rounded-md pl-2.5"
                  />
                  <br />
                </div>
              </div>
            )}
          </div>
        </div>
        {/* ----------------------- buttom settings -------------------------------------- */}
        <div className="flex justify-around space-x-20">
          <p></p>
          <p className="bg-gray-700 text-white w-36 h-10 flex justify-center items-center shadow-lg rounded-md">
            Update Changes
          </p>
        </div>
        {/* --------------------- add experience modal ---------------------------------------- */}
        {modal && (
          <>
            {" "}
            <div id="myModal" className="modalReg">
              <div className="modal-contentReg">
                <span
                  className="close cursor-pointer"
                  onClick={() => {
                    setModal(false);
                  }}
                >
                  &times;
                </span>
                <p className="font-medium border-b-2 pb-2">
                  Add New Experience
                </p>
                <input
                  type="text"
                  placeholder="Company Name"
                  className="p-2 w-full border-2 mt-3 outline-none"
                />
                <textarea
                  placeholder="Position Title"
                  className="p-2 w-full border-2 mt-3"
                  rows={2}
                  style={{ outline: "none", resize: "none" }}
                  onChange={(e) => {}}
                ></textarea>
                <label>From:</label>
                <input
                  type="text"
                  placeholder="mm/yy"
                  className="ms-2 p-2 w-36 border-2 mt-3 outline-none"
                />
                <label className="ms-5">To:</label>
                <input
                  type="text"
                  placeholder="mm/yy"
                  className="ms-2 p-2 w-36 border-2 mt-3 outline-none"
                />

                <div className="flex justify-end mt-3 border-t-4 pt-3">
                  <button
                    className=" bg-black rounded shadow-lg w-28 h-10 text-white"
                    onClick={() => {
                      setModal(false);
                    }}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Settings;
