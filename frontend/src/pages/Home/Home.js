import React from "react";
import HomeSide from "./HomeSide";
import HomeMain from "./HomeMain";

function Home() {
  return (
    <div className="flex bg-zinc-100">
      <div className="flex-none">
        <HomeSide/>
      </div>
      <div className="flex-none"> 
        <HomeMain/>
      </div>
    </div>
  );
}

export default Home;
