"use client";

const StakingTierComponent = () => {
  return (
    <section className="h-screen bg-[#A86A4B]">
      <div className="max-h-screen h-screen items-center flex justify-center relative mx-auto max-w-screen-sm bg-[#feedcd] bg-blend-multiply">
        <div className="">
          <div className="flex justify-center">
            <img src="/miner.gif" height={300} width={300} />
          </div>
          <h1 className="text-center bordered-text-font text-5xl">Loading...</h1>
          <img src="bg-land.png" className="w-full absolute left-0 bottom-0" />
        </div>
      </div>
    </section>
  );
};

export default StakingTierComponent;
