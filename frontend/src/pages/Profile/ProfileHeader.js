import React from "react";
import "./profile.css";
export const ProfileHeader = () => {
  return (
    <div>
      {" "}
      <img
        class=" w-48 w- h-48 bg-slate-50 rounded-full sm:mx-0 sm:shrink-0 profile"
        src="https://i.pinimg.com/236x/ca/9e/37/ca9e372399145d1d751679ea6570a843.jpg "
        alt="Woman's Face"
      />
      <div className="flex flex-col mt-10 ml-20 max-w-3xl bg-slate-100 shadow-2xl rounded-xl">
        <div className=" w-full">
          <img
            src="https://i.pinimg.com/236x/9a/e8/fc/9ae8fc22197c56c5e5b0c2c22b05186e.jpg"
            className=" w-full h-52 rounded-t-xl"
          />
        </div>
        <div>
          <div className=" py-10 pl-6 ">
            <h1 className=" text-5xl">Hamza Akel</h1>
            <p>Full-stack devoloper</p>
          </div>
          <div className=" flex flex-row justify-between max-w-80 pl-6">
            <p>25 folowers</p>
            <p>30 follow</p>
            <p>6 posts</p>
            <button>About you</button>
          </div>
        </div>
      </div>
    </div>
  );
};
