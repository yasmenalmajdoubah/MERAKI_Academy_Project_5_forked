import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setExperience,
  setWorkNow,
} from "../../service/redux/reducers/profile/profileSlice";
import { IoAddCircle } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
export const ProfileBody = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo, userId, experience, token, institution } = useSelector(
    (state) => {
      return {
        userInfo: state.profile.userInfo,
        userId: state.log.userId,
        experience: state.profile.experience,
        token: state.log.token,
        institution: state.profile.institution,
      };
    }
  );
  const getexperience = () => {
    axios
      .get(`http://localhost:5000/users/experience/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((result) => {
        dispatch(setExperience(result.data.result));
        dispatch(setWorkNow(result.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getexperience();
  }, []);

  return (
    <>
      {userInfo.role_id === 2 ? (
        <div>
          <div className="p-6 ml-3 w-full mb-8 mt-3 mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
            <div>
              <div className="text-xl font-medium text-black" id="AboutProfile">
                About
              </div>
              <p className="text-slate-500">{userInfo.about}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="">
          {console.log(userInfo)}
          <div className="p-6 ml-3 w-full mb-8 mt-3 mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
            <div>
              <div className="text-xl font-medium text-black" id="Education">
                Education
              </div>
              <p className="text-slate-500">{userInfo.education}</p>
            </div>
          </div>
          <div className="p-6 ml-3 w-full mb-8 mt-8 mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
            <div>
              <div className="text-xl font-medium text-black" id="Skills">
                Skills
              </div>
              <p className="text-slate-500">{userInfo.skills}</p>
            </div>
          </div>
          <div className="p-6 ml-3 w-full mb-8 mt-8 mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
            <div>
              <div class="text-xl font-medium text-black" id="interests">
                interests
              </div>
              {institution &&
                institution.map((elem, i) => {
                  return (
                    <div className=" flex flex-row mb-3 mt-2">
                      <img
                        src={elem.profileimage}
                        alt="Profile Picture"
                        className="w-12 h-12 rounded-full mr-3 "
                      />{" "}
                      <p class="text-slate-500 mt-3">
                        {elem.firstname} {elem.lastname}
                      </p>
                    </div>
                  );
                })}
            </div>
          </div>
          <div className="p-6 ml-3 w-full mb-8 mt-8 mx-auto bg-white rounded-xl shadow-lg space-x-4 flex justify-between">
            <div>
              <div className="text-xl font-medium text-black" id="Experience">
                Experience
              </div>
              {experience &&
                experience.map((elem) => {
                  return (
                    <div>
                      <p>
                        {elem.workdiscription} in {elem.institutionname} from{" "}
                        {elem.startdate} to {elem.enddate}
                      </p>
                    </div>
                  );
                })}
            </div>
            <div
              className=" flex flex-col items-center  "
              onClick={() => {
                navigate("/settings");
              }}
            >
              <IoAddCircle size={50} />
              <p className="">Add Experience</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
