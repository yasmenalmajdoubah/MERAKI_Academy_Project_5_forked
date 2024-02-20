import React from "react";
import Post from "./Post";

const HomeMain = () => {
  return (
    <div className="flex-col">
      <div>
        <textarea placeholder="Puplish here" />
        <button></button>
      </div>
      <div>
        <Post />
      </div>
    </div>
  );
};

export default HomeMain;
