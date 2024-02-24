import React, { useState } from "react";
import "./profile.css";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserInfo,
  setFollow,
  setInstitutionFollow,
} from "../../service/redux/reducers/profile/profileSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
export const ProfileHeader = () => {
  const [myFollow, setMyFollow] = useState(false);
  const [showPostImage, setShowPostImage] = useState(false);
  const [showCoverImage, setShowCoverImage] = useState(false);

  const dispatch = useDispatch();
  const { userId, userInfo, token, follow, posts, experience, workNow } =
    useSelector((state) => {
      return {
        userId: state.log.userId,
        userInfo: state.profile.userInfo,
        token: state.log.token,
        follow: state.profile.follow,
        posts: state.posts.posts,
        experience: state.profile.experience,
        workNow: state.profile.workNow,
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
        dispatch(setInstitutionFollow(result.data.result));
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
      {myFollow && (
        <div
          className="modal show"
          style={{ display: "block", position: "initial" }}
        >
          <Modal.Dialog>
            <Modal.Header closeButton>
              <Modal.Title>Modal title</Modal.Title>
            </Modal.Header>

            <Modal.Body>
              <p>Modal body text goes here.</p>
            </Modal.Body>

            <Modal.Footer>
              <Button variant="secondary" onClick={() => setMyFollow(false)}>
                Close
              </Button>
              <Button variant="primary">Save changes</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </div>
      )}{" "}
      <img
        class=" w-48 w- h-48 bg-slate-50 rounded-full sm:mx-0 sm:shrink-0 profile object-cover"
        src={userInfo.profileimage}
        alt="Profile image"
        onClick={() => {
          setShowPostImage(true);
        }}
      />
      <div className=" flex flex-row">
        <div className=" flex flex-row w-full   ">
          {/* <div className="  w-11/12  "> */}{" "}
          <div className="flex flex-col mt-10 ml-16  w-11/12  shadow-2xl rounded-xl  ">
            <div className=" ">
              <img
                src={userInfo.coverimage}
                className=" w-full h-52 rounded-t-xl object-cover"
                onClick={() => {
                  setShowCoverImage(true);
                }}
              />
            </div>
            <div>
              <div className="  flex flex-row justify-between">
                <div className=" py-10 pl-6 w-96 	 ">
                  <h1 className=" text-5xl">
                    {userInfo.firstname} {userInfo.lastname}
                  </h1>
                  <p>{userInfo.jobname}</p>
                </div>
                {workNow[0] && (
                  <div className="  max-w-96 	">
                    <p className=" font-light text-3xl mt-12 mr-20 ">
                      {workNow[0].workdiscription} in{" "}
                      {workNow[0].institutionname}{" "}
                    </p>
                  </div>
                )}
              </div>

              {/*  <div className=" mt-8 ml-4 max-w-96">
                <p>{userInfo.experience} </p>
              </div> */}
            </div>
            <div className=" flex flex-row justify-around h-12 pl-6 rounded-b-xl bg-black">
              <button className=" text-white text-lg">25 folowers</button>

              <button
                className="text-white text-lg"
                onClick={() => setMyFollow(true)}
              >
                {" "}
                {follow.length} follow
              </button>

              <button className="text-white text-lg">
                <a href="#postProfile"> {posts.length} posts</a>
              </button>
              {userInfo.role_id === 2 && (
                <button className="text-white text-lg">Jobs </button>
              )}
            </div>
            {/* </div> */}
          </div>
        </div>

        <div className=" flex flex-col ml-3  mt-10 w-48 rounded-lg shadow-2xl mr-16	">
          <div className=" pt-8 pb-9 h-1/4 pl-8 rounded-lg shadow-md ">
            <button>
              <a href="#interests">interests</a>
            </button>
          </div>
          <div className=" pt-8  h-1/4 pb-9 pl-8 rounded-lg shadow-md  ">
            <button>
              {" "}
              <a href="#Experience">Experience </a>
            </button>
          </div>
          <div className=" pt-8 h-1/4 pb-9 pl-8 rounded-lg shadow-md  ">
            <button>Education</button>
          </div>
          <div className=" pt-9 h-1/4 pb-9 pl-8 rounded-lg shadow-md ">
            <button>
              <a href="#Skills">Skills</a>
            </button>
          </div>
        </div>
      </div>
      {/* ====================== to show profile image =========================== */}
      {showPostImage && (
        <>
          {" "}
          <div id="myModal" class="modal">
            <div className="modal-content">
              <span
                className="close"
                onClick={() => {
                  setShowPostImage(false);
                }}
              >
                &times;
              </span>
              <p></p>
              <div>
                <img src={userInfo.profileimage} />
              </div>
            </div>
          </div>
        </>
      )}
      {/* ================  to show cover image ====================================== */}
      {showCoverImage && (
        <>
          {" "}
          <div id="myModal" class="modal">
            <div className="modal-contentCover">
              <span
                className="close"
                onClick={() => {
                  setShowCoverImage(false);
                }}
              >
                &times;
              </span>
              <p></p>
              <div>
                <img className="h-96 w-full" src={userInfo.coverimage} />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
