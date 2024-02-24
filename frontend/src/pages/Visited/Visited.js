import React from "react";
import { VisitedHeader } from "./VisitedHeader";
import { VisitedPosts } from "./VisitedPosts";
import { VisitedBody } from "./VisitedBody";
import DiscoverFreind from "../../components/DiscoverFreind/DiscoverFreind";

const Visited = () => {
  return <div className=" flex flex-col ">
<div className=" ">
  <VisitedHeader/>
</div>
<div className="  flex flex-col justify-between mt-6 ">
<div className=" ml-12 w-8/12">

<div ><VisitedBody/> </div></div>

<div className=" flex flex-row   ">

<div className=" ml-12 mb-3"><VisitedPosts/>  </div> 
<div className=" mt-5 rounded-3xl ml-48"> <DiscoverFreind/></div>



  
</div>
      </div>
    </div>
};

export default Visited;
