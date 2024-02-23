import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../service/redux/reducers/profile/profileSlice";
import DiscoverFreind from "../../components/DiscoverFreind/DiscoverFreind";
import { FaHeart } from "react-icons/fa";
import { setAllLikedPosts } from "../../service/redux/reducers/posts/postsSlice";

const HomeSide = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      userId: state.log.userId,
      userInfo: state.profile.userInfo,
      token: state.log.token,
      userLikes: state.posts.userLikes,
    };
  });

  // ======================================
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/search_1/${state.userId}`)
      .then((result) => {
        dispatch(setUserInfo(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // =======================================

  useEffect(() => {
    axios
      .get("http://localhost:5000/posts/allLikedPosts/user", {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        dispatch(setAllLikedPosts(result.data.likes));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  // =========================================
  return (
    <div className="flex flex-col space-y-6 items-center w-72 ">
      <div className="  bg-white w-72 p-3 rounded-lg shadow-lg">
        <div>
          <p className="font-medium text-center text-gray-500">Welcome</p>
        </div>
        <h1 className="mt-1 mb-2 text-2xl text-center font-medium me-4">
          {state.userInfo.firstname} {state.userInfo.lastname}
        </h1>

        {state.userInfo.role_id === 2 ? (
          <div>Post A Job</div>
        ) : (
          <div className="p-3">
            <p className="border-t font-medium pt-2 text-gray-500">
              Last Activity
            </p>
            <div className="flex mt-2">
              <FaHeart size={25} className="text-red-800 me-1 mt-1" />
              <p className=" text-gray-900">Interested Posts</p>
              <div className=" text-gray-700 ms-8">
                '{state.userLikes.length}'
              </div>
            </div>
          </div>
        )}
      </div>
      <div>
        <DiscoverFreind />
      </div>
    </div>
  );
};

export default HomeSide;
