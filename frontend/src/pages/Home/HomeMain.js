import React from "react";
import Post from "./Post";
import PuplishPost from "./PuplishPost";

const HomeMain = () => {
  return (
    <div className="flex-col">
      <div>
        <PuplishPost />
      </div>
      <div>
        <Post />
      </div>
    </div>
  );
};

export default HomeMain;
