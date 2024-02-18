import React from "react";
import "./profile.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUserInfo } from "../../service/redux/reducers/profile/profileSlice";
export const ProfileHeader = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      userId: state.log.userId,
      userInfo: state.profile.userInfo,
    };
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/search_1/${state.userId}`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        console.log(result);
        dispatch(setUserInfo(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className=" ">
      <img
        class=" w-48 w- h-48 bg-slate-50 rounded-full sm:mx-0 sm:shrink-0 profile"
        src={state.userInfo.profileimage}
        alt="Profile image"
      />
      <div className=" flex flex-row w-full   ">
        <div className="  w-11/12  ">
          {" "}
          <div className="flex flex-col mt-10 ml-16  w-11/12 shadow-2xl rounded-xl  ">
            <div className=" ">
              <img
                src={state.userInfo.coverimage}
                className=" w-full h-52 rounded-t-xl"
              />
            </div>
            <div >
              <div className=" bg-slate-600 flex flex-row">
              <div className=" py-10 pl-6 w-96 border-r border-orange-600	 ">
                <h1 className=" text-5xl">
                  {state.userInfo.firstname} {state.userInfo.lastname}
                </h1>
                <p>{state.userInfo.jobname}</p>
              </div>
              <div className=" mt-8 ml-4 max-w-96">
                
                <p>{state.userInfo.experience} </p>
                
                
                </div></div>
              <div className=" flex flex-row justify-around  pl-6">
                <p>25 folowers</p>
                <p>30 follow</p>
                <p>6 posts</p>
                <button>About you</button>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex flex-col ml-3 border-solid border-2 border-black mt-10 w-48 rounded-lg shadow-2xl mr-16	">
          <div className=" pt-8 pb-9 pl-8 rounded-lg shadow-md ">
            <button><a href='#hh'>interests</a></button>
          </div>
          <div className=" pt-8 pb-9 pl-8 rounded-lg shadow-md  border-t-2 border-black">
            <button>Experience</button>
          </div>
          <div className=" pt-8 pb-9 pl-8 rounded-lg shadow-md border-t-2 border-black">
            <button>Education</button>
          </div>
          <div className=" pt-9 pb-9 pl-8 rounded-lg shadow-md border-t-2 border-black">
            <button id="hh">Skills</button>
          </div>
        </div>
      </div>
    </div>
  );
};
