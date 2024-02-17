import React from "react";
import HomeSide from "./HomeSide";
import HomeMain from "./HomeMain";

function Home() {
  return (
    <div className="flex w-4/5">
      <div className="flex-non w-64">
        <HomeSide/>
      </div>
      <div className="flex-1"> 
        <HomeMain/>
      </div>
    </div>
  );
}

export default Home;
