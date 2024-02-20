import React from "react";
import { ProfileBody } from "./ProfileBody";
import { ProfileHeader } from "./ProfileHeader";
import { ProfleSugg } from "./ProfleSugg";
import PorfilePosts from "./PorfilePosts";

const Profile = () => {
  return (
    <div className=" flex flex-col bg-zinc-100   ">
      <div className="   ">
        <ProfileHeader />
      </div>
      <div className="  flex flex-row justify-around mt-6">
        <div>
          {" "}
          <ProfileBody />
          <PorfilePosts />
        </div>

        <div>
          {" "}
          <ProfleSugg />{" "}
        </div>
      </div>
    </div>
  );
};

export default Profile;
