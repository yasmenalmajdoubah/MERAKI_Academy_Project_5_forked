import React, { useEffect } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { setUserInfo } from "../../service/redux/reducers/profile/profileSlice";

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
      <div>
        <div>
          <img
            className="rounded-md w-28 h-28 object-cover"
            src={state.userInfo.profileimage}
          />
        </div>
        <span>
          {state.userInfo.firstname} {state.userInfo.lastname}
        </span>
        <p>{state.userInfo.jobname}</p>
      </div>
    </div>
  );
};

export default HomeSide;
