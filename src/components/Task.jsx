"use client";

import ButtomNav from "./Navbar/ButtomNav";
import task from "../assets/task.svg";
import useGame from "../states/useGame";
import { config } from "../states/useGame";
import { useEffect, useState } from "react";
import { parsePoints } from "../utils";

const TaskComponent = () => {
  const { lastDailyRewardsClaim, dailyRewardsDaysClaimed, dailyRewardsClaim, claimSpecialReward } = useGame()
  const [dailyRewardValue, setDailyRewardValue] = useState(0);

  useEffect(() => {
    const currentStreak = dailyRewardsDaysClaimed < config.dailyRewards.length
      ? dailyRewardsDaysClaimed
      : 0;
    const rewardValue = config.dailyRewards[currentStreak] || 0;

    setDailyRewardValue(rewardValue);
  }, [dailyRewardsDaysClaimed]);

  const claimActions = {
    'daily': dailyRewardsClaim,
    'special': claimSpecialReward
  }

  const Task = [
    { name: "Daily Reward", valueInt: 1000, rewardValue: `+${parsePoints(dailyRewardValue).value}${parsePoints(dailyRewardValue).units ? ' ' + parsePoints(dailyRewardValue).units : ''}`, image: task, action: "Follow", claimAction: 'daily' },
  ];

  const isToday = (timestamp) => {
    const lastClaimDate = new Date(timestamp);
    const today = new Date();
    return lastClaimDate.getDate() === today.getDate() &&
      lastClaimDate.getMonth() === today.getMonth() &&
      lastClaimDate.getFullYear() === today.getFullYear();
  };

  return (
    <section className="h-screen bg-[#A86A4B]">
      <div className="h-screen flex justify-center pt-20 relative mx-auto max-w-screen-sm bg-[url('/bg-main.jpeg')] bg-no-repeat bg-cover bg-center bg-[#0B080880] bg-blend-multiply">
        <div className="fixed top-8 w-[90%] max-w-md mx-auto z-50 flex flex-col items-center">
          <div
            className="
              font-medium 
              rounded-lg
              text-2xl
              bordered-text-font
              flex justify-center items-center"
          >
            <span className="ml-2 text-white text-4xl">Task Available</span>
          </div>
          <div className="mt-2 mb-4 flex justify-center">
            <p className="text-xs text-center text-gray-300 w-40">
              We’ll reward you with tons upon task completion
            </p>
          </div></div>
        <div className="pt-16 flex w-full justify-center">
          <div
            className="w-[90%] max-w-md border-[1px] border-[#a86a4b] mt-4 mb-2 rounded-md h-[400px] bg-gray-950 overflow-y-auto"
            style={{ zIndex: 1 }}
          >
            {Task.map((e, i) => (
              <div
                key={i}
                className="p-4 flex justify-between border-b-[2px] border-b-[#a86a4b]"
              >
                <div className="flex justify-center items-center">
                  <img src={e.image} height={35} width={35} />
                  <div className="ml-2 flex flex-col text-white">
                    <span className="text-lg text-left font-semibold">
                      {e.name}
                    </span>
                    <span className="text-xs font-[300] font-[Montserrat] text-left">
                      {e.rewardValue}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    disabled={e.claimAction === 'daily' && isToday(lastDailyRewardsClaim)}
                    onClick={() => {
                      if (e.claimAction) {
                        claimActions[e.claimAction](e.valueInt);
                      }
                    }}
                    className="
                  text-white disabled:text-gray-600
                  bg-[#A86A4B] disabled:bg-transparent
                  font-medium rounded-lg
                  px-2
                  py-1
                  text-center
                  drop-shadow-xl
                  text-base
                  bordered-text-font
                  border-2
                  border-b-[6px] border-gray-950
                  "
                  >
                    Claim
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <ButtomNav />
      </div>
    </section >
  );
};

export default TaskComponent;
