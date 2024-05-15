"use client";

import Button from "./common/btn";

const StakingTierComponent = () => {
  return (
    <section className="h-screen bg-[#A86A4B]">
      <div className="h-screen pt-20 relative mx-auto max-w-screen-sm bg-[url('/bg-main.jpeg')] bg-no-repeat bg-cover bg-center bg-gray-500 bg-blend-multiply">
        <div className="flex justify-center">
          <img src="/robot.svg" height={210} width={150} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="mt-14 font-normal text-6xl leading-[45px] bordered-text bordered-text-font">
            WELCOME <br />
            TO PLAYAI
          </h1>
          <p className="my-7 w-60 text-white text-xs text-center font-[Montserrat]">
            Are you ready to make a difference while having fun? Start tapping
            and training our AI bot today!
          </p>
          <Button text={"Start Game"} />
          <div className="mt-6 w-4/5 flex justify-between">
            <Button text={"Telegram"} />
            <Button text={"Website"} />
            <Button text={"Discord"} />
          </div>
        </div>
        <img src="bg-land.png" className="w-full absolute left-0 bottom-0" />
      </div>
    </section>
  );
};

export default StakingTierComponent;
