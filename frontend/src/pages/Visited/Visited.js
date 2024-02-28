import React from "react";
import { VisitedHeader } from "./VisitedHeader";
import { VisitedPosts } from "./VisitedPosts";
import { VisitedBody } from "./VisitedBody";
import DiscoverFreind from "../../components/DiscoverFreind/DiscoverFreind";
import VisitedJobs from "./VisitedJobs";
import { useSelector } from "react-redux";

const Visited = () => {
  const { visitUserInfo } = useSelector((state) => {
    return {
      visitUserInfo: state.profile.visitUserInfo,
    };
  });
  return (
    <div className=" flex flex-col bg-zinc-200">
      <div className=" ">
        <VisitedHeader />
      </div>
      <div className="  flex flex-col justify-between mt-6 ">
        <div className=" ml-12 w-10/12">
          <div className=" pr-24">
            <VisitedBody />{" "}
          </div>
         
        </div>
        {visitUserInfo.role_id === 2 && (
            <div className=" ml-12  w-10/12 pr-24">
              {" "}
              <VisitedJobs />
            </div>
          )}
        <div className=" flex flex-row   ">
          <div className=" ml-12 mb-3">
            <VisitedPosts />{" "}
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

export default Visited;
