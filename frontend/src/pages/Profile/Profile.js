import React from "react";
import { ProfileBody } from "./ProfileBody";
import { ProfileHeader } from "./ProfileHeader";
import { ProfleSugg } from "./ProfleSugg";

const Profile = () => {
  return (
    <div className=" flex flex-col    ">
       
      <div className="   ">
        <ProfileHeader />
      </div>
      <div className="  flex flex-row justify-around mt-6">
        <div> <ProfileBody />  </div>
        <div> <ProfleSugg />  </div>
        
        
      </div>
    </div>
  );
};

export default Profile;
