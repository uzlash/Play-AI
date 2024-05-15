"use client";

const StakingTierComponent = () => {
  return (
    <section className="h-screen bg-[#A86A4B]">
      <div className="h-screen pt-10 relative mx-auto max-w-screen-sm bg-[url('/bg-main.jpeg')] bg-no-repeat bg-cover bg-center bg-gray-500 bg-blend-multiply">
        <div className="flex flex-col items-center mb-10">
          <button
            type="button"
            className="
              w-4/5 
              bg-gray-900 
              stroke-[#a86a4b]
              hover:bg-[#F7BE38]/90 
              focus:ring-4 
              focus:outline-none 
              focus:ring-[#F7BE38]/50 
              font-medium rounded-lg
              px-10
              py-2.5
              text-center 
              dark:focus:ring-[#F7BE38]/50
              drop-shadow-xl
              text-2xl
              bordered-text-font
              border-2
              border-b-4 
              border-[#a86a4b]
              mb-5
              flex justify-center items-center
              "
          >
            <img src="/gem.png" height={25} width={25} />
            <span className="ml-2 text-white">240</span>
          </button>
          <button
            type="button"
            className="
              w-4/5 
              bg-gray-900 
              stroke-[#a86a4b]
              hover:bg-[#F7BE38]/90 
              focus:ring-4 
              focus:outline-none 
              focus:ring-[#F7BE38]/50 
              font-medium rounded-lg
              px-10
              py-2.5
              text-center 
              dark:focus:ring-[#F7BE38]/50
              drop-shadow-xl
              text-2xl
              bordered-text-font
              border-2
              border-b-4 
              border-[#a86a4b]
              flex justify-around items-center
              "
          >
            <div className="flex justify-center items-center">
              <img src="/flag.png" height={25} width={25} />
              <div className="ml-2 flex flex-col text-white">
                <span className="text-sm text-left">ARIA</span>
                <span className="text-xs font-[300] font-[Montserrat] text-left">
                  Level 1
                </span>
              </div>
            </div>
            <div className="bg-[#a86a4b] h-8 w-[1px]">&nbsp;</div>
            <div className="flex justify-center items-center">
              <img src="/shield.png" height={25} width={25} />
              <div className="ml-2 flex flex-col text-white">
                <span className="text-sm text-left">CLAN</span>
                <span className="text-xs font-[300] font-[Montserrat] text-left text-[#DFAF56]">
                  Join Clan
                </span>
              </div>
            </div>
          </button>
        </div>
        <div className="flex justify-center">
          <img src="/robot.svg" height="auto" width={250} />
        </div>
        <div className="flex justify-center">
          <button
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
              px-10
              py-1
              text-center 
              dark:focus:ring-[#F7BE38]/50
              drop-shadow-xl
              text-2xl
              bordered-text-font
              border-2
              border-b-4 
              border-[#a86a4b]
              mt-10
              flex items-center
              "
          >
            <img src="/heart.png" height={20} width={20} />
            <span className="ml-2 text-xs text-white">3250/5300</span>
            <div className="ml-4 w-full h-4 bg-gray-600 rounded-full dark:bg-gray-700">
              <div
                className="h-4 bg-[#2fff69] rounded-full"
                style={{ width: "70%" }}
              ></div>
            </div>
          </button>
        </div>
        <div className="flex justify-center">
          <div
            style={{ zIndex: 1 }}
            type="button"
            className="
              w-5/6 
              bg-gray-900 
              stroke-[#a86a4b]
              font-medium rounded-lg
              px-10
              py-2.5
              text-center
              drop-shadow-xl
              text-2xl
              bordered-text-font
              border-2
              border-b-4 
              border-[#a86a4b]
              flex justify-around items-center
              mt-5
              "
          >
            <div className="flex flex-col justify-center items-center">
              <img src="/booster.png" height={48} width='auto' />
              <span className="text-sm text-left text-white my-2">Boosters</span>
            </div>
            <div className="bg-[#a86a4b] h-16 w-[1px]">&nbsp;</div>
            <div className="flex flex-col justify-center items-center">
              <img src="/leaderboard.png" height={48} width='auto' />
              <span className="text-sm text-left text-white my-2">Leaderboard</span>
            </div>
            <div className="bg-[#a86a4b] h-16 w-[1px]">&nbsp;</div>
            <div className="flex flex-col justify-center items-center">
              <img src="/invite.png" height={48} width='auto' />
              <span className="text-sm text-left text-white mt-4 mb-2">Invite</span>
            </div>
          </div>
        </div>
        <img src="bg-land.png" className="w-full absolute left-0 bottom-0" />
      </div>
    </section>
  );
};

export default StakingTierComponent;
