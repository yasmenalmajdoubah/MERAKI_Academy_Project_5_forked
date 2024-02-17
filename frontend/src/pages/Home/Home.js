import React from "react";
import HomeSide from "./HomeSide";
import HomeMain from "./HomeMain";

function Home() {
  return (
    <div className="flex justify-center bg-neutral-200">
      <div className="flex-none w-80">
        <HomeSide/>
      </div>
      <div className="flex-none"> 
        <HomeMain/>
      </div>
    </div>
  );
}

export default Home;
