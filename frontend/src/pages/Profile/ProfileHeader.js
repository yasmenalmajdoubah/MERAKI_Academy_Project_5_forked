import React from "react";
import "./profile.css";
export const ProfileHeader = () => {
  return (<div className=" ">  
     <img  class=" w-48 w- h-48 bg-slate-50 rounded-full sm:mx-0 sm:shrink-0 profile"
        src="https://i.pinimg.com/236x/ca/9e/37/ca9e372399145d1d751679ea6570a843.jpg "
        alt="Woman's Face"
      />



    <div className=" flex flex-row w-full   ">
      <div className="  w-11/12  ">
      {" "}
     
      <div className="flex flex-col mt-10 ml-16  w-11/12 shadow-2xl rounded-xl  ">
        <div className=" ">
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
          <div className=" flex flex-row justify-around  pl-6">
            <p>25 folowers</p>
            <p>30 follow</p>
            <p>6 posts</p>
            <button>About you</button>
          </div>
        </div>
      </div>
      </div>


      <div className=" flex flex-col ml-3 border-solid border-2 border-black mt-10 w-48 rounded-lg shadow-2xl mr-16	">
       <div className=" pt-8 pb-9 pl-8 rounded-lg shadow-md ">interest</div>
       <div className=" pt-8 pb-9 pl-8 rounded-lg shadow-md  border-t-2 border-black">Experince</div>
       <div className=" pt-8 pb-9 pl-8 rounded-lg shadow-md border-t-2 border-black">Education</div>
       <div className=" pt-9 pb-9 pl-8 rounded-lg shadow-md border-t-2 border-black">Skills</div>

      </div>

      
    </div></div>
  );
};
