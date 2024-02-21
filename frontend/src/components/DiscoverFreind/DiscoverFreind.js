import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/* =================================================== */
const DiscoverFreind = () => {
  const navigate = useNavigate();
  const [discoverFriend, setDiscoverFriend] = useState([]);
  const state = useSelector((state) => {
    return {
      userId: state.log.userId,
      token: state.log.token,
    };
  });
  console.log("users by field >>", discoverFriend);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/users/search_2/field`, {
        headers: {
          Authorization: `Bearer ${state.token}`,
        },
      })
      .then((result) => {
        setDiscoverFriend(result.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  /* =========================================== */
  return (
    <div>
      <div>Suggestions People</div><br/>
      {discoverFriend.map((user, i) => {
        return (
          <div className="" key={user.user_id}>
            <div className="flex items-center">
              <img
                src={user.profileimage}
                alt="Profile Picture"
                className="w-12 h-12 rounded-full cursor-pointer"
                onClick={() => {
                  navigate(`/friend/${user.user_id}`);
                }}
              />
              <div className="ml-2">
                <p
                  className="font-semibold cursor-pointer"
                  onClick={() => {
                    navigate(`/friend/${user.user_id}`);
                  }}
                >
                  {user.firstname} {user.lastname}
                </p>
                <p className="text-gray-500 text-xs">{user.jobname}</p>
              </div>
            </div>
          </div>
        );
      })}
      
    </div>
  );
};

export default DiscoverFreind;
