import React from "react";
import { VisitedHeader } from "./VisitedHeader";
import { VisitedPosts } from "./VisitedPosts";
import { VisitedSugg } from "./VisitedSugg";

const Visited = () => {
  return <div className=" flex flex-col    ">
<div>
  <VisitedHeader/>
</div>
<div className="  flex flex-row justify-around mt-6">
<div><VisitedPosts/>  </div>
<div><VisitedSugg/></div>
</div>
  </div>;
};

export default Visited;
