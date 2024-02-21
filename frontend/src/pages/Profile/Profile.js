import React from "react";
import { ProfileBody } from "./ProfileBody";
import { ProfileHeader } from "./ProfileHeader";
import PorfilePosts from "./PorfilePosts";
import DiscoverFreind from "../../components/DiscoverFreind/DiscoverFreind";

const Profile = () => {
  return (
    <div className=" flex flex-col bg-zinc-100   ">
      <div className="   ">
        <ProfileHeader />
      </div>
      <div className="  flex flex-row justify-between mt-6 ">
        <div className=" ml-12 w-8/12">
          {" "}
          <ProfileBody />
          <PorfilePosts />
        </div>

        <div>
          {" "}
          <DiscoverFreind />
        </div>
      </div>
    </div>
  );
};

export default Profile;
