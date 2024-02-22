import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../service/redux/reducers/profile/profileSlice";
import DiscoverFreind from "../../components/DiscoverFreind/DiscoverFreind";

const HomeSide = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      userId: state.log.userId,
      userInfo: state.profile.userInfo,
    };
  });
  //   console.log(state.userInfo);
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

  return (
    <div /* className="bg-white w-72" */>
      <div className="text-center">
        <div>
          <img
            className="rounded-full w-32 h-32 object-cover"
            src={state.userInfo.profileimage}
          />
        </div>
        <h1 className="mt-3 text-2xl font-medium me-4">
          {state.userInfo.firstname} {state.userInfo.lastname}
        </h1>
        <p>{state.userInfo.jobname}</p>
      </div>
      <div>
        <DiscoverFreind />
      </div>
    </div>
  );
};

export default HomeSide;
