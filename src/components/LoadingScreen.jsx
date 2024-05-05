"use client";

const StakingTierComponent = () => {
  return (
    <section className="h-screen bg-[#A86A4B]">
      <div className="h-screen relative mx-auto max-w-screen-sm bg-[#feedcd] bg-blend-multiply">
        <div className="h-screen pt-40">
          <div className="flex justify-center">
            <img src="/robot.svg" height={210} width={150} />
          </div>
          <h1 className="mt-20 text-center bordered-text-font text-5xl">Loading...</h1>
          <img src="bg-land.png" className="w-full absolute left-0 bottom-0" />
        </div>
      </div>
    </section>
  );
};

export default StakingTierComponent;
