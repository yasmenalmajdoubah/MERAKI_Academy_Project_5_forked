import React, { useState } from "react";
import "./profile.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserInfo,
  setFollow,
} from "../../service/redux/reducers/profile/profileSlice";

export const ProfileHeader = () => {
  const [myFollow, setMyFollow] = useState(false);
  const dispatch = useDispatch();
  const { userId, userInfo, token, follow, posts } = useSelector((state) => {
    return {
      userId: state.log.userId,
      userInfo: state.profile.userInfo,
      token: state.log.token,
      follow: state.profile.follow,
      posts: state.posts.posts,
    };
  });
  const getUser = () => {
    axios
      .get(`http://localhost:5000/users/search_1/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setUserInfo(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getfollows = () => {
    axios
      .get(`http://localhost:5000/users/follows/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setFollow(result.data.result));
      })
      .catch((err) => {
        console.log("err from use effect function getfollows", err);
      });
  };
  useEffect(() => {
    getUser();
    getfollows();
  }, []);

  return (
    <div className=" ">
      {myFollow}
      <img
        class=" w-48 w- h-48 bg-slate-50 rounded-full sm:mx-0 sm:shrink-0 profile object-cover"
        src={userInfo.profileimage}
        alt="Profile image"
      />
      <div className=" flex flex-row w-full   ">
        <div className="  w-11/12  ">
          {" "}
          <div className="flex flex-col mt-10 ml-16  w-11/12 shadow-2xl rounded-xl  ">
            <div className=" ">
              <img
                src={userInfo.coverimage}
                className=" w-full h-52 rounded-t-xl object-cover"
              />
            </div>
            <div>
              <div className=" bg-slate-600 flex flex-row">
                <div className=" py-10 pl-6 w-96 border-r border-orange-600	 ">
                  <h1 className=" text-5xl">
                    {userInfo.firstname} {userInfo.lastname}
                  </h1>
                  <p>{userInfo.jobname}</p>
                </div>
                <div className=" mt-8 ml-4 max-w-96">
                  <p>{userInfo.experience} </p>
                </div>
              </div>

              <div className=" mt-8 ml-4 max-w-96">
                
                <p>{userInfo.experience} </p>
                
                
                </div></div>
              <div className=" flex flex-row justify-around  pl-6 mt-3 mb-3">
                <button >25 folowers</button>

                <button> {follow.length} follow</button>
                <button>{posts.length} posts</button>

                <button>About you</button>
              </div>
            </div>
          </div>
        </div>

        <div className=" flex flex-col ml-3  mt-10 w-48 rounded-lg shadow-2xl mr-16	">
          <div className=" pt-8 pb-9 h-1/4 pl-8 rounded-lg shadow-md ">
            <button><a href='#hh'>interests</a></button>

          </div>
          <div className=" pt-8  h-1/4 pb-9 pl-8 rounded-lg shadow-md  ">
            <button>Experience</button>
          </div>
          <div className=" pt-8 h-1/4 pb-9 pl-8 rounded-lg shadow-md  ">
            <button>Education</button>
          </div>
          <div className=" pt-9 h-1/4 pb-9 pl-8 rounded-lg shadow-md ">
            <button id="hh">Skills</button>
          </div>
        </div>

      </div>
    </div>
  );
};
