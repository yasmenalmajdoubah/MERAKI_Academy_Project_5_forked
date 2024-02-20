import React from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserInfo,
  setFollow,AddFollow
} from "../../service/redux/reducers/profile/profileSlice";
import axios from "axios";
import Button from "react-bootstrap/Button";

export const VisitedHeader = () => {
  const dispatch = useDispatch();

  const { id } = useParams();
  const { userInfo, token, follow, posts } = useSelector((state) => {
    return {
      userInfo: state.profile.userInfo,
      token: state.log.token,
      follow: state.profile.follow,
      posts: state.posts.posts,
    };
  });
  const followOrUnFollow=(innerText)=>{
    if (innerText==="follow") {
        document.getElementById("buttonFollow").innerHTML="unfollow"
        Follow()
    }else{
        document.getElementById("buttonFollow").innerHTML="follow"
        unFollow()
    }
  }
  const unFollow=()=>{
    axios.delete(`http://localhost:5000/users/follows/${id}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((result)=>{
      console.log(result.data.massag);
    }).catch((err)=>{
        console.log(err);
    })
  }
  const Follow=()=>{
    axios.post(`http://localhost:5000/users/follows`,{followed_user_id:id},{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then((result)=>{
        dispatch(AddFollow(result.data.result))
      }).catch((err)=>{console.log(err)})
  }
  const getUser = () => {
    axios
      .get(`http://localhost:5000/users/search_1/${id}`, {
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
  useEffect(() => {
    getUser();
    getfollows();
  }, []);
  return (
    <div className=" ">
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
                        /* Follow() */            
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
    </div>
  );
};
