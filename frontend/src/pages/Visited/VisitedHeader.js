import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserInfo,
  setFollow,
  AddFollow,
  setVisitUserInfo,
} from "../../service/redux/reducers/profile/profileSlice";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
/* ================================================================ */
export const VisitedHeader = () => {
  const navigate = useNavigate();
  const [myFollow, setMyFollow] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  /* ================================= */
  const { token, follow, posts, workNow, visitUserInfo } = useSelector(
    (state) => {
      return {
        token: state.log.token,
        follow: state.profile.follow,
        posts: state.posts.posts,
        workNow: state.profile.workNow,
        visitUserInfo: state.profile.visitUserInfo,
      };
    }
  );

  /* ==================================== */
  const followOrUnFollow = (innerText) => {
    if (innerText === "Follow") {
      document.getElementById("buttonFollow").innerHTML = "Unfollow";
      Follow();
    } else {
      document.getElementById("buttonFollow").innerHTML = "Follow";
      unFollow();
    }
  };

  /* ==================================== */
  const unFollow = () => {
    axios
      .delete(`http://localhost:5000/users/follows/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  /* =============================== */
  const Follow = () => {
    axios
      .post(
        `http://localhost:5000/users/follows`,
        { followed_user_id: id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        dispatch(AddFollow(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* ======================================= */
  const getUser = () => {
    axios
      .get(`http://localhost:5000/users/search_1/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setVisitUserInfo(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* ======================================== */
  const getfollows = () => {
    axios
      .get(`http://localhost:5000/users/follows/${id}`, {
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

  /* ===================================== */
  useEffect(() => {
    getUser();
    getfollows();
  }, []);

  /* ======================================= */
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
        class=" w-48 w- h-48  rounded-full sm:mx-0 sm:shrink-0 profile object-cover"
        src={visitUserInfo.profileimage}
        alt="Profile image"
      />
      <div className=" flex flex-row">
        <div className=" flex flex-row w-full   ">
          {" "}
          <div className="flex flex-col mt-10 ml-16  w-11/12  shadow-2xl rounded-xl  ">
            <div className=" ">
              <img
                src={visitUserInfo.coverimage}
                className=" w-full h-52 rounded-t-xl object-cover"
              />
            </div>
            <div>
              <div className="bg-white  flex flex-row justify-between">
                <div className=" py-10 pl-6 w-96 	 ">
                  <h1 className=" text-5xl">
                    {visitUserInfo.firstname} {visitUserInfo.lastname}
                  </h1>
                  <p>{visitUserInfo.jobname}</p>
                  <p
                    className="flex justify-center rounded-md shadow-md items-center bg-gray-700 w-32 h-10 mt-3 text-white cursor-pointer"
                    onClick={() => {
                      navigate(`/chat/${visitUserInfo.user_id}`);
                    }}
                  >
                    Message
                  </p>
                </div>

                <div>
                  {workNow[0] && (
                    <div className="  max-w-96 	">
                      <p className=" font-light text-3xl mt-12 mr-20 ">
                        {workNow[0].workdiscription} in{" "}
                        {workNow[0].institutionname}{" "}
                      </p>
                    </div>
                  )}
                  <div className="mr-10 mt-11 mb-5">
                    <button
                      className="bg-black rounded-md shadow-md w-40 h-10 text-white"
                      id="buttonFollow"
                      onClick={function (e) {
                        followOrUnFollow(e.target.innerText);
                      }}
                    >
                      {visitUserInfo.role_id === 2 ? "Intrest" : "Follow"}{" "}
                    </button>
                    {/*        
                    <Button
                      variant="primary"
                      id="buttonFollow"
                      className=" font-bold w-40 bg-blue-600 rounded-lg h-10 "
                      onClick={function (e) {
                        followOrUnFollow(e.target.innerText);
                      }}
                    >
                      {visitUserInfo.role_id === 2 ? "intrest" : "follow"}
                    </Button> */}
                  </div>
                </div>
              </div>

              {/*  <div className=" mt-8 ml-4 max-w-96">
                <p>{userInfo.experience} </p>
              </div> */}
            </div>
            {visitUserInfo.role_id === 1 && (
              <div className=" flex flex-row justify-around h-12 pl-6 rounded-b-xl bg-black">
                <button className="text-white text-lg">
                  <a href="#posts"> {posts.length} Posts</a>
                </button>
                {visitUserInfo.role_id === 1 && (
                  <button
                    className="text-white text-lg"
                    onClick={() => setMyFollow(true)}
                  >
                    {" "}
                    {follow.length} Follow
                  </button>
                )}

                <button className=" text-white text-lg">25 Folowers</button>
              </div>
            )}

            {/* </div> */}
          </div>
        </div>
        {visitUserInfo.role_id === 2 ? (
          <div className=" flex flex-col ml-3  mt-10 w-48 rounded-lg shadow-2xl mr-16	">
            <div className=" pt-8 pb-9 h-1/4 pl-8 rounded-lg shadow-md ">
              <button>
                <a href="#jobsVisit">Jobs</a>
              </button>
            </div>
            <div className=" pt-8  h-1/4 pb-9 pl-8 rounded-lg shadow-md  ">
              <button>
                {" "}
                <a href="#postVisit">Posts </a>
              </button>
            </div>
            <div className=" pt-8 h-1/4 pb-9 pl-8 rounded-lg shadow-md  ">
              <button>Interested</button>
            </div>
            <div className=" pt-9 h-1/4 pb-9 pl-8 rounded-lg shadow-md ">
              <button>
                <a href="#AboutVisit">About</a>
              </button>
            </div>
          </div>
        ) : (
          <div className=" flex flex-col ml-3  mt-10 w-48 rounded-lg shadow-2xl mr-16	">
            <div className=" pt-8 pb-9 h-1/4 pl-8 rounded-lg shadow-md ">
              <button>
                <a href="#interests">Interests</a>
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
        )}
      </div>
    </div>
    /*  <div className=" ">
      <img
        class=" w-48 w- h-48 bg-slate-50 rounded-full sm:mx-0 sm:shrink-0 profile"
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
                className=" w-full h-52 rounded-t-xl"
              />
            </div>
            <div>
              <div className="  flex flex-row">
                <div className=" py-10 pl-6 w-96 border-r border-orange-600	 ">
                  <h1 className=" text-5xl">
                    {userInfo.firstname} {userInfo.lastname}
                  </h1>
                  <p>{userInfo.jobname}</p>
                  <br />
                </div>
                <div className="  w-full   flex flex-row justify-between ">
                  <div>
                    {" "}
                    <p>{userInfo.experience} </p>
                  </div>
                  <div className="mr-10 mt-12">
                    <Button
                      variant="primary"
                      id="buttonFollow"
                      className=" font-bold w-40 bg-blue-600 rounded-lg h-10 "
                      onClick={function(e){
                        followOrUnFollow(e.target.innerText)
                      }}

                    >
                      follow
                    </Button>
                  </div>
                </div>
              </div>
              <div className=" flex flex-row justify-around  pl-6">
                <button>25 folowers</button>

                <button> {follow.length} follow</button>
                <button>{posts.length} posts</button>


                <button>About</button>
              </div>
              
            </div>
          </div>
        </div>

        <div className=" flex flex-col ml-3 border-solid border-2 border-black mt-10 w-48 rounded-lg shadow-2xl mr-16	">
          <div className=" pt-8 pb-9 pl-8 rounded-lg shadow-md ">
            <button>
              <a href="#hh">interests</a>
            </button>
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
    </div> */
  );
};
