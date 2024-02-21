import React from "react";
import { useSelector } from "react-redux";
export const ProfileBody = () => {
  const {userInfo} = useSelector((state) => {
    return {
      userInfo: state.profile.userInfo,
    };
  });
  
  return (
    <div className="">
      <div class="p-6 ml-3 w-full mb-8 mt-8 mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <div>
          <div class="text-xl font-medium text-black">Education</div>
          <p class="text-slate-500">{userInfo.education}</p>
        </div>
      </div>
      <div class="p-6 ml-3 w-full mb-8 mt-8 mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <div>
          <div class="text-xl font-medium text-black" >Skills</div>
          <p class="text-slate-500">{userInfo.skills}</p>
        </div>
      </div>
      <div class="p-6 ml-3 w-full mb-8 mt-8 mx-auto bg-white rounded-xl shadow-lg flex items-center space-x-4">
        <div>
          <div class="text-xl font-medium text-black">interests</div>
          <p class="text-slate-500">

          </p>
        </div>
      </div>
    </div>
  );
};
