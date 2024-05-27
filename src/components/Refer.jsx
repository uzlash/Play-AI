"use client";
import { Button } from "flowbite-react";
import { BiCopy } from "react-icons/bi";
import ButtomNav from "./Navbar/ButtomNav";
import task from "../assets/task.svg";

const ReferComponent = () => {
  const boosts = [
    { name: "Thank you", price: "+500 Ton", image: task },
    { name: "Thank you", price: "+500 Ton", image: task },
    { name: "Thank you", price: "+500 Ton", image: task },
    { name: "Thank you", price: "+500 Ton", image: task },
    { name: "Thank you", price: "+500 Ton", image: task },
    { name: "Thank you", price: "+500 Ton", image: task },
  ];

  return (
    <section className="h-screen bg-[#A86A4B]">
      <div className="h-screen pt-20 relative mx-auto max-w-screen-sm bg-[url('/bg-main.jpeg')] bg-no-repeat bg-cover bg-center bg-[#0B080880] bg-blend-multiply">
        <div
          className="
              font-medium 
              rounded-lg
              text-2xl
              bordered-text-font
              my-4
              flex justify-center items-center"
        >
          <div className="ml-2 text-white text-4xl text-center">
            Refer friends <br />
            and claim gift
          </div>
        </div>
        <div className="px-4 flex justify-center mb-4 mt-8">
          <ol className="relative border-s border-gray-200 dark:border-gray-700 w-1/2">
            <li className="mb-5 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <h3 className="text-sm font-semibold text-gray-100">
                Share your invitation link
              </h3>
              <time className="mb-1 text-sm font-normal leading-none text-[#DFAF56]">
                On various platforms
              </time>
            </li>
            <li className="mb-5 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <h3 className="text-sm font-semibold text-gray-100">
                Your friends join PlayAI
              </h3>
            </li>
            <li className="ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <h3 className="text-sm font-semibold text-gray-100">
                Get tons for each friend
              </h3>
            </li>
          </ol>
        </div>
        <div className="flex flex-col items-center my-4">
          <div className="mt-2 w-4/5 flex justify-between">
            <div
              className="
              w-full
              text-white 
              bg-gray-950
              font-medium 
              rounded-lg
              px-6
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
              <div className="flex justify-center items-center mt-2">
                <img src="/share.png" height={35} width={35} />
                <div className="ml-2 flex flex-col text-white">
                  <span className="text-lg text-left">Invite Link</span>
                  <span className="text-xs font-[300] font-[Montserrat] text-left">
                    Invite your friends & get bonuses
                  </span>
                </div>
              </div>
              <Button
                size="xs"
                className="bg-[#A86A4B] border-[#FAB135] border-[1px] my-2"
              >
                https://t.me/john_doe?ref=123456
                <BiCopy className="ml-2" />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex justify-center mt-4 mb-20">
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
                  px-10
              "
          >
            Invite Friends
          </button>
        </div>
        <ButtomNav />
      </div>
    </section>
  );
};

export default ReferComponent;
