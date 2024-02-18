import React from "react";
import Post from "./Post";

const HomeMain = () => {
  return (
    <div className="flex-row">
      <div>
        <textarea placeholder="Puplish here" />
        <button></button>
      </div>
      <div>
        <Post />
      </div>
      <Post/>
    </div>
  );
};

export default HomeMain;
