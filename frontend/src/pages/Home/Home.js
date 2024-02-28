import React, { useEffect } from "react";
import HomeSide from "./HomeSide";
import HomeMain from "./HomeMain";
import HomeRight from "./HomeRight";
import axios from "axios";

function Home() {
  return (
    <div className="flex flex-row justify-around mt-5 bg-zinc-200">
      <div className="">
        <HomeSide />
      </div>
      <div className="">
        <HomeMain />
      </div>{" "}
      <div className="">
        <HomeRight />
      </div>
    </div>
  );
}

export default Home;
