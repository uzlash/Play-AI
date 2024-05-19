"use client";
import { Button } from "flowbite-react";
// import {  } from "react-icons/hi";
import { BiCopy } from "react-icons/bi";

const LeagueComponent = () => {
  return (
    <section className="h-screen bg-[#A86A4B]">
      <div className="h-screen pt-20 relative mx-auto max-w-screen-sm bg-[url('/bg-main.jpeg')] bg-no-repeat bg-cover bg-center bg-gray-600 bg-blend-multiply overflow-y-auto">
        <div className="pl-8">
          <img src="/back.png" height={50} width={50} />
        </div>
        <div className="mt-4">
          <p className="text-xs text-center text-gray-400">Your League</p>
        </div>
        <div
          className="
              font-medium 
              rounded-lg
              text-2xl
              bordered-text-font
              mb-4
              mt-2
              flex justify-center items-center"
        >
          <img src="/flag1.svg" height={40} width={40} />
          <span className="ml-2 text-white text-4xl">BRONZE</span>
        </div>
        <div className="flex justify-center my-4">
          <button
            type="button"
            className="
              text-gray-900 
              bg-[#FBC45F]
              stroke-[#FAB135]
              hover:bg-[#F7BE38]/90 
              focus:ring-4 
              focus:outline-none 
              focus:ring-[#F7BE38]/50 
              font-medium rounded-lg 
              text-center 
              dark:focus:ring-[#F7BE38]/50
              drop-shadow-xl
              text-2xl
              bordered-text-font
              border-b-4 border-gray-900
              px-2
              "
          >
            How it works
          </button>
        </div>
        <div className="flex flex-col items-center mt-4">
          <div className="mt-2 w-4/5 flex justify-between">
            <div
              className="
              w-full
              text-white 
              bg-gray-800
              font-medium 
              rounded-lg
              px-2
              py-2
              text-center 
              drop-shadow-xl 
              text-base
              bordered-text-font
              border-2
              border-b-[6px]
              border-[#A86A4B]
              flex
              flex-col
              justify-center
              "
            >
              <div className="flex justify-center items-center mt-2 p-2 mx-2">
                <div className="mr-4 flex flex-col text-white">
                  <span className="text-lg text-left">Enter New League</span>
                  <span className="text-xs font-[300] font-[Montserrat] text-left">
                    Collect a minimum of 1,000,000 coins to advance to the next
                    league
                  </span>
                </div>
                <img src="/chest.png" height={35} width={35} />
              </div>
              <div className="mx-4 w-auto h-4 bg-gray-600 rounded-full dark:bg-gray-700 my-2">
                <div
                  className="h-4 bg-[#2fff69] rounded-full"
                  style={{ width: "70%" }}
                ></div>
              </div>
              <div className="flex justify-between px-4">
                <div className="flex justify-center items-center">
                  <img src="/gem.png" height={20} width={20} />
                  <div className="ml-2 flex flex-col text-white">
                    <span className="text-xs font-[300] font-[Montserrat]">
                      Balance
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="ml-2 flex flex-col text-white">
                    <span className="text-xs font-[400] font-[Montserrat] text-left text-[#DFAF56]">
                      632/1M
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-4">
          <div className="mt-2 w-4/5 flex justify-between">
            <div
              className="
              w-full
              text-white 
              bg-gray-800
              font-medium 
              rounded-lg
              px-2
              py-2
              text-center 
              drop-shadow-xl 
              text-base
              bordered-text-font
              border-2
              border-b-[6px]
              border-[#A86A4B]
              flex
              flex-col
              justify-center
              "
            >
              <div className="flex justify-center items-center mt-2 p-2 mx-2">
                <div className="mr-4 flex flex-col text-white">
                  <span className="text-lg text-left">
                    Get a <span className="text-[#FBC45F]">+30%</span> to Damage
                  </span>
                  <span className="text-xs font-[300] font-[Montserrat] text-left">
                    Top 5 leaderboard players receive a 30% boost to damage
                    while staying at the top
                  </span>
                </div>
                <img src="/sword.png" height={35} width={35} />
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center mt-4">
          <div className="mt-2 w-4/5 flex justify-between">
            <div
              className="
              w-full
              text-white 
              bg-gray-800
              font-medium 
              rounded-lg
              px-2
              py-2
              text-center 
              drop-shadow-xl 
              text-base
              bordered-text-font
              border-2
              border-b-[6px]
              border-[#A86A4B]
              flex
              flex-col
              justify-center
              "
              style={{ zIndex: 1 }}
            >
              <div className="flex flex-col justify-center items-center mt-2 p-2 mx-2">
                <img src="/robot.svg" height={35} width={35} />
                <div className="mr-4 flex flex-col text-white">
                  <span className="text-4xl w-full text-center">5,321,502</span>
                  <p className="text-xs font-[300] font-[Montserrat] text-center">
                    Total Users
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4">
          <div
            className="w-5/6 border-[1px] border-[#a86a4b] mt-4 rounded-md h-60 bg-gray-900 overflow-y-auto"
            style={{ zIndex: 1 }}
          >
            {[...Array(5)].map((e, i) => (
              <div
                key={i}
                className="p-4 flex justify-between border-b-[2px] border-b-[#a86a4b]"
              >
                <div className="flex justify-center items-center">
                  <img src="/avatar.png" height={25} width={25} />
                  <div className="ml-2 flex flex-col text-white">
                    <span className="text-base font-[300] font-[Montserrat] text-left">
                      Mr Swift
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <img src="/flag.png" height={20} width={20} />
                  <div className="ml-2 flex flex-col text-white">
                    <span className="text-xs font-[300] font-[Montserrat] text-left text-[#DFAF56]">
                      Level 1
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <img src="/gem.png" height={20} width={20} />
                  <div className="ml-2 flex flex-col text-white">
                    <span className="text-xs font-[300] font-[Montserrat]">
                      23,000 Gems
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            style={{ zIndex: 1 }}
            className="
            w-5/6
              text-gray-900 
              bg-[#FBC45F]
              stroke-[#FAB135]
              hover:bg-[#F7BE38]/90 
              focus:ring-4 
              focus:outline-none 
              focus:ring-[#F7BE38]/50 
              font-medium rounded-lg 
              text-center 
              dark:focus:ring-[#F7BE38]/50
              drop-shadow-xl
              text-2xl
              bordered-text-font
              border-b-4 border-gray-900
              px-2
              py-2
              "
          >
            Invite Friends
          </button>
        </div>
        <img src="bg-land.png" className="w-full absolute left-0 bottom-0" />
      </div>
    </section>
  );
};

export default LeagueComponent;
