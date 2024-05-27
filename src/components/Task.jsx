"use client";

import ButtomNav from "./Navbar/ButtomNav";
import task from "../assets/task.svg";

const TaskComponent = () => {
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
              mt-4
              flex justify-center items-center"
        >
          <span className="ml-2 text-white text-4xl">Task Available</span>
        </div>
        <div className="mt-2 mb-4 flex justify-center">
          <p className="text-xs text-center text-gray-300 w-40">
            We’ll reward you with tons upon task completion
          </p>
        </div>
        <div className="flex justify-center">
          <div
            className="w-5/6 border-[1px] border-[#a86a4b] mt-4 mb-2 rounded-md h-[400px] bg-gray-950 overflow-y-auto"
            style={{ zIndex: 1 }}
          >
            {boosts.map((e, i) => (
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
                      {e.price}
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <button
                    type="button"
                    className="
                  text-white 
                  bg-[#A86A4B]
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
    </section>
  );
};

export default TaskComponent;
