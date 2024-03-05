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
import { FiUpload } from "react-icons/fi";

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
  console.log("prfile", follow);
  /* ================== For upload on cloudenary ================================ */
  const [modal, setModal] = useState(false);
  const [isUpload, setIsUpload] = useState(false);
  const [isLoader, setIsLoader] = useState(true);

  const [profileImage, setProfileImage] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [isProfileUpdate, setIsProfileUpdate] = useState(true);

  const [image, setImage] = useState("");
  const uploadImage = () => {
    const data = new FormData();
    data.append("file", image);
    data.append("upload_preset", "szb3g9r3");
    data.append("cloud_name", "drkox9efz");
    fetch("https://api.cloudinary.com/v1_1/drkox9efz/image/upload", {
      method: "post",
      body: data,
    })
      .then((resp) => resp.json())
      .then((data) => {
        {
          isProfileUpdate ? setProfileImage(data.url) : setCoverImage(data.url);
        }
        console.log(data.url);
      })
      .catch((err) => console.log(err));
  };

  /* ==================================================== */
 /*  const getUser = () => {
    axios
      .get(`https://workedin.onrender.com/users/search_1/${userId}`, {
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
  }; */
  const getfollows = () => {
    axios
      .get(`https://workedin.onrender.com/users/follows/${userId}`, {
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
/*     getUser();
 */    getfollows();
  }, []);
  /* =================================================== */
  const updateImages = (req, res) => {
    axios
      .put(
        "https://workedin.onrender.com/users/update/user",
        {
          profileImage,
          coverImage,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log(result.data.result);
        dispatch(setUserInfo(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  /* ================================================= */

  return (
    <div className="">
      
      <img
        class=" w-48 w- h-48 bg-slate-200 rounded-full sm:mx-0 sm:shrink-0 profile object-cover"
        src={userInfo.profileimage}
        alt="Profile image"
        onClick={() => {
          setShowPostImage(true);
        }}
      />
      <div className="flex flex-row">
        <div className=" flex flex-row w-full   ">
          {/* <div className="  w-11/12  "> */}{" "}
          <div className="flex flex-col mt-10 ml-16  w-11/12  shadow-xl rounded ">
            <div className=" ">
              <img
                src={userInfo.coverimage}
                className=" w-full h-52 rounded object-cover rounded-b-none"
                onClick={() => {
                  setShowCoverImage(true);
                }}
              />
            </div>
            <div className="bg-white">
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
            {userInfo.role_id === 1 && (
              <div className=" flex flex-row justify-around h-12 pl-6 rounded-b bg-black">

 <button className="text-white text-lg">
                <a href="#postProfile"> {posts.length} Posts</a>
              </button>
              <button
                className="text-white text-lg"
                onClick={() => setMyFollow(true)}
              >
                {" "}
                {follow.length} Follow
              </button>
              {console.log('follow', follow)}
              {myFollow&&(
                <div id="myModal" className="modal2">
                <div className="modal-content2 ml-10 w-">
                  <span
                    className="close2"
                    onClick={() => {
                      setMyFollow(false);
                    }}
                  >
                    &times;
                  </span>
                  <p className=" text-2xl border-b-2">
                    Follow
                  </p>

                  <div className="">
                    {follow.map((fol,i) => {
                      return(
                        <div className=" my-2 border-b-2 flex">
                          <img src={fol.profileimage} className="rounded-full w-12 h-12 cursor-pointer object-cover border-white border-2 mr-2" />
                          <p className="mt-2">{fol.firstname} {fol.lastname}</p>
                        </div>
                      )
                    })}
                  </div>

                  
                </div>
              </div>
              )}
              <button className=" text-white text-lg">25 Folowers</button>
</div>

               

            )}

            {/* </div> */}
          </div>
        </div>
        {userInfo.role_id === 2 ? (
          <div className=" flex flex-col ml-3  mt-10 w-48 rounded-lg shadow-2xl mr-16	">
            <div className=" pt-8 pb-9 h-1/4 pl-8 rounded-lg shadow-md ">
              <button>
                <a href="#jobsProfile">Jobs</a>
              </button>
            </div>
            <div className=" pt-8  h-1/4 pb-9 pl-8 rounded-lg shadow-md  ">
              <button>
                {" "}
                <a href="#postProfile">Posts </a>
              </button>
            </div>
            <div className=" pt-8 h-1/4 pb-9 pl-8 rounded-lg shadow-md  ">
              <button>Interested</button>
            </div>
            <div className=" pt-9 h-1/4 pb-9 pl-8 rounded-lg shadow-md ">
              <button>
                <a href="#AboutProfile">About</a>
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
      {/* ====================== to show profile image =========================== */}
      {showPostImage && (
        <>
          {" "}
          <div id="myModal" class="modal">
            <div className="modal-content">
              <span
                className="close cursor-pointer"
                onClick={() => {
                  setShowPostImage(false);
                }}
              >
                &times;
              </span>
              <div
                className="flex justify-center items-center cursor-pointer rounded shadow-md w-24 h-8 bg-black"
                onClick={() => {
                  setModal(true);
                  setIsProfileUpdate(true);
                }}
              >
                <FiUpload className="me-1" size={25} color="white" />
                <p className="text-white">Update</p>
              </div>
              <div>
                <img className="relative" src={userInfo.profileimage} />
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
              <div
                className="flex justify-center items-center cursor-pointer rounded shadow-md w-24 h-8 bg-black"
                onClick={() => {
                  setModal(true);
                  setIsProfileUpdate(false);
                }}
              >
                <FiUpload className="me-1" size={25} color="white" />
                <p className="text-white">Update</p>
              </div>
              <p></p>
              <div>
                <img
                  className="h-96 w-full object-cover"
                  src={userInfo.coverimage}
                />
              </div>
            </div>
          </div>
        </>
      )}
      {/* =================== function update image ======================= */}
      {modal && (
        <>
          {" "}
          <div id="myModal" class="modalUploadImage">
            <div className="modal-UploadImage">
              <span
                className="close  cursor-pointer"
                onClick={() => {
                  setModal(false);
                  setIsLoader(true);
                  setIsUpload(false);
                }}
              >
                &times;
              </span>
              <p className="text-xl font-medium ms-2">Upload Image</p>

              <div className="mt-5 pt-3 border-t-2 ">
                <input
                  type="file"
                  className="borde"
                  onChange={(e) => {
                    setImage(e.target.files[0]);
                    setIsUpload(true);
                  }}
                ></input>

                {isUpload && (
                  <div className="mt-4">
                    <button
                      className="bg-black text-white rounded-md shadow-lg w-24 h-10 mt-2"
                      onClick={() => {
                        uploadImage();
                        setIsLoader(false);
                      }}
                    >
                      Upload
                    </button>
                  </div>
                )}

                <div className="flex justify-end">
                  {isLoader ? (
                    <></>
                  ) : profileImage || coverImage ? (
                    <button
                      className="bg-blue-700 text-white rounded-md shadow-lg w-28 h-10 mt-8"
                      onClick={() => {
                        updateImages();
                        setIsUpload(false);
                        setIsLoader(true);
                        setModal(false);
                      }}
                    >
                      Done
                    </button>
                  ) : (
                    <div className="flex justify-center items-center bg-blue-300 cursor-not-allowed text-white rounded-md shadow-lg w-28 h-10 mt-8">
                      <div className="loaderHome"></div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
