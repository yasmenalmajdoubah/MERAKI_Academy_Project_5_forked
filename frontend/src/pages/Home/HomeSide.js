import React, { useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const HomeSide = () => {
  const state = useSelector((state) => {
    return {
      userId: state.log.userId,
    };
  });
  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/search_1/${state.userId}`)
      .then((result) => {
        console.log(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return <div className="">HomeSide</div>;
};

export default HomeSide;
