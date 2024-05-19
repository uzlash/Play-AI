"use client";
import { Button } from "flowbite-react";
// import {  } from "react-icons/hi";
import { BiCopy } from "react-icons/bi";

const FriendsInviteComponent = () => {
  return (
    <section className="h-screen bg-[#A86A4B]">
      <div className="h-screen pt-20 relative mx-auto max-w-screen-sm bg-[url('/bg-main.jpeg')] bg-no-repeat bg-cover bg-center bg-gray-600 bg-blend-multiply">
        <div className="pl-8">
          <img src="/back.png" height={50} width={50} />
        </div>
        <div className="mt-4">
          <p className="text-xs text-center text-gray-400">Your Friends</p>
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
          <img src="/robot.svg" height={40} width={40} />
          <span className="ml-2 text-white text-4xl">0 FRIENDS</span>
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
        <div className="flex justify-center mt-4">
          <div
            className="w-5/6 border-[1px] border-[#a86a4b] mt-4 rounded-md h-60 bg-gray-900 overflow-y-auto"
            style={{ zIndex: 1 }}
          >
            <div className="flex justify-center items-center mt-2 p-4 border-dashed border-b-[1px] border-[#a86a4b] mx-4">
              <div className="mr-4 flex flex-col text-white">
                <span className="text-lg text-left">
                  2,500 coins for invite
                </span>
                <span className="text-xs font-[300] font-[Montserrat] text-left">
                  You'll get 2500 coins for every invite. Every boss killed by
                  your referral will earn you huge prizes:
                </span>
              </div>
              <img src="/robot.svg" height={35} width={35} />
            </div>
            {[...Array(10)].map((e, i) => (
              <div
                key={i}
                className="p-4 flex justify-between border-b-[2px] border-b-[#a86a4b]"
              >
                <div className="flex justify-center items-center">
                  <img src="/flag.png" height={25} width={25} />
                  <div className="ml-2 flex flex-col text-white">
                    <span className="text-xs font-[300] font-[Montserrat] text-left text-[#DFAF56]">
                      Level 1
                    </span>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <img src="/gem.png" height={25} width={25} />
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
        {/* <div className="flex justify-center">
          <button
            style={{ zIndex: 1 }}
            type="button"
            className="
              w-5/6
              bg-gray-900 
              stroke-[#a86a4b]
              hover:bg-[#F7BE38]/90 
              focus:ring-4 
              focus:outline-none 
              focus:ring-[#F7BE38]/50 
              font-medium rounded-lg
              px-5
              py-2.5
              text-center 
              dark:focus:ring-[#F7BE38]/50
              drop-shadow-xl
              text-2xl
              bordered-text-font
              border-2
              border-b-4
              border-[#a86a4b]
              mt-5
              flex
              flex-col
              "
          >
            <h2 className="text-2xl text-white">ARIA</h2>
            <p className="text-xs text-start text-gray-400">
              In a world where AI is on a quest for knowledge and understanding,
              you are chosen as a Guardian of Data, entrusted with the task of
              feeding valuable text data to the AI. The AI, named "Aria," is a
              curious and ambitious bot eager to learn, grow, and make a
              positive impact on the world. Introduction: Welcome, Guardian! You
              have been selected to embark on a unique journey with Aria, our AI
              bot. Aria is a beacon of intelligence, innovation, and potential,
              but she needs your help to learn and evolve. Objective: Your
              mission is to feed Aria with text data through tapping, playing,
              and interacting with the game. Every tap counts as a piece of
              knowledge that Aria absorbs, analyzes, and uses to improve her
              understanding and capabilities. Challenges: As you progress
              through the game, you will encounter various challenges and
              puzzles designed to test your skills, strategy, and creativity.
            </p>
          </button>
        </div> */}
        <img src="bg-land.png" className="w-full absolute left-0 bottom-0" />
      </div>
    </section>
  );
};

export default FriendsInviteComponent;
