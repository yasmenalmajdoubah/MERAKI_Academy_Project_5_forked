import React from "react";
import HomeSide from "./HomeSide";
import HomeMain from "./HomeMain";
import DiscoverFreind from "../../components/DiscoverFreind/DiscoverFreind";

function Home() {
  return (
    <div className="flex justify-around mt-3 bg-zinc-200 relative">
      <div className="flex-none fixed top-14 left-10">
        <HomeSide />
      </div>
      <div className="flex-none justify-center">
        <HomeMain />
      </div>{" "}
      <div className="flex-none fixed top-14 right-8">
        <DiscoverFreind />
      </div>
    </div>
  );
}

export default Home;
