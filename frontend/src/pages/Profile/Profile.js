import React from "react";
import { ProfileBody } from "./ProfileBody";
import { ProfileHeader } from "./ProfileHeader";
import PorfilePosts from "./PorfilePosts";
import DiscoverFreind from "../../components/DiscoverFreind/DiscoverFreind";
import ProfileJobs from "./ProfileJobs";

const Profile = () => {
  return (
    <div className=" flex flex-col bg-zinc-200">
      <div className="   ">
        <ProfileHeader />
      </div>
      <div className="  flex flex-col justify-between mt-6 ">
        <div className=" ml-12 w-10/12 pr-24">
          {" "}
          
            <ProfileBody />{" "}
            
          </div>
          <div className=" ml-12  w-10/12 pr-24">
          <ProfileJobs/>
        </div>
         
        <div className=" flex flex-row   ">
          {" "}
          <div className=" ml-12">
            <PorfilePosts />{" "}
          </div>
          <div className=" mt-5 rounded-3xl ml-48">
            {" "}
            <DiscoverFreind />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
