"use client";
import useGame from "../states/useGame";
import ButtomNav from "./Navbar/ButtomNav";

const LeagueComponent = () => {
  const { levelData } = useGame();
  return (
    <section className="min-h-screen bg-[#A86A4B]">
      <div className="min-h-screen h-fit pt-10 relative mx-auto max-w-screen-sm bg-[url('/bg-main.jpeg')] bg-no-repeat bg-cover bg-center bg-gray-600 bg-blend-multiply">
        <div className="w-full flex justify-center mt-20">
          <div className="mb-4 w-3/5">
            <div className="flex justify-center items-center">
              <img src="/crown.svg" height={25} width={25} />
              <span className="text-base ml-2 font-semibold font-[Montserrat] text-left text-[#DFAF56]">
                {levelData.name}
              </span>
            </div>
            <p className="text-center text-xs font-thin text-[#FFFFFF] mt-2">
              Your number of shares determines the leagues you enter
            </p>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="flex justify-center my-4 bg-[url('/block.svg')] bg-no-repeat bg-cover bg-center w-60 h-60">
            <img src="/medal.svg" height={"auto"} width={100} />
          </div>
        </div>
        <div className="flex justify-center items-center mt-6">
          <img src="/coin.svg" height={25} width={25} />
          <span className="ml-2 text-lg text-white font-[Montserrat]">{levelData.points}/{levelData.maxPoints}</span>
        </div>
        <div className="flex justify-center">
          <div
            className="
              w-5/6 
              bg-gray-950 
              font-medium 
              rounded-lg
              px-4
              py-1
              text-center 
              drop-shadow-xl
              text-2xl
              bordered-text-font
              border-2
              border-b-4 
              border-[#a86a4b]
              mb-6
              mt-4
              flex items-center
              "
          >
            <div className="w-full h-4 bg-gray-600 rounded-md dark:bg-gray-700">
              <div
                className="h-4 bg-[#2fff69] rounded-md"
                style={{ width: `${(levelData.points / levelData.maxPoints) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        <ButtomNav />
      </div>
    </section>
  );
};

export default LeagueComponent;
