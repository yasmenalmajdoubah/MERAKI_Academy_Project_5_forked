import React from "react";
const helpImage = require("../../assest/Chat bot-amico.png");

const HelpCenter = () => {
  return (
    <div className="h-screen bg-white overflow-hidden space-y-8">
      <p className=" text-2xl pt-2 ps-4 font-bold">Help Center</p>

      <div className="flex justify-evenly space-x-8">
        <div className="">
          <img src={helpImage} alt="pic" className="h-96 w-96 object-cover" />
        </div>
        {/* ************* Right ***************************************** */}
        <div className="flex justify-center items-center pt-3 w-96">
          <form className="w-full max-w-sm">
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="name"
              >
                Your Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="ENTER YOUR NAME PLEASE"
              />
            </div>
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="email"
              >
                Title of Problem
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="email"
                type="email"
                placeholder="Tell us about it"
              />
            </div>
            <div className="mb-6">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                for="issue"
              >
                Description of Your Problem
              </label>
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="issue"
                rows="5"
                placeholder="Enter a description of the problem"
              ></textarea>
            </div>
            <div className="flex items-center justify-center">
              <button
                className="bg-black text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-96"
                type="submit"
              >
                SEND
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelpCenter;
