import React from "react";
import HomeSide from "./HomeSide";
import HomeMain from "./HomeMain";
import DiscoverFreind from "../../components/DiscoverFreind/DiscoverFreind";

function Home() {
  return (
    <div className="flex justify-evenly mt-3 bg-zinc-200">
      <div className="flex-none w-40">
        <HomeSide />
      </div>
      <div className="flex-none justify-center">
        <HomeMain />
      </div>{" "}
      <div className="flex-none w-44">
        <DiscoverFreind />
      </div>
    </div>
  );
}

export default Home;
