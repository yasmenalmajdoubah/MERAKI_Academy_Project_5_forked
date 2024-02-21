import React from "react";
import HomeSide from "./HomeSide";
import HomeMain from "./HomeMain";
import DiscoverFreind from "../../components/DiscoverFreind/DiscoverFreind";

function Home() {
  return (
    <div className="flex justify-around mt-3 bg-zinc-100">
      <div className="flex-none">
        <HomeSide />
      </div>
      <div className="flex-none">
        <HomeMain />
      </div>{" "}
      <div className="flex-none">
        <DiscoverFreind />
      </div>
    </div>
  );
}

export default Home;
