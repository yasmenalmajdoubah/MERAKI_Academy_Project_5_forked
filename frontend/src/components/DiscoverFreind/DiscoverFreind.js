import axios from "axios";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

/* =================================================== */
const DiscoverFreind = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => {
    return {
      userId: state.log.userId,
      token: state.log.token,
    };
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/search_2/field`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        console.log("all users field >>", result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /* =========================================== */
  return <div>DiscoverFreind</div>;
};

export default DiscoverFreind;
