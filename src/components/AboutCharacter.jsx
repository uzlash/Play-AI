"use client";

const StakingTierComponent = () => {
  return (
    <section className="h-screen bg-[#A86A4B]">
      <div className="h-screen pt-20 relative mx-auto max-w-screen-sm bg-[url('/bg-main.jpeg')] bg-no-repeat bg-cover bg-center bg-gray-500 bg-blend-multiply">
        <div className="pl-8">
          <img src="/back.png" height={50} width={50} />
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
            Upgrade level and bot
          </button>
        </div>
        <div className="flex justify-center">
          <img src="/robot.svg" height={210} width={150} />
        </div>
        <div className="flex flex-col items-center">
          <div className="mt-6 w-4/5 flex justify-between">
            <button
              type="button"
              className="
              text-white 
              bg-[#A86A4B]
              stroke-[#FAB135]
              hover:bg-[#F7BE38]/90 
              focus:ring-4 
              focus:outline-none 
              focus:ring-[#F7BE38]/50 
              font-medium rounded-lg
              px-6
              py-2
              text-center 
              dark:focus:ring-[#F7BE38]/50
              drop-shadow-xl 
              text-base
              bordered-text-font
              border-2
              border-b-[6px] border-gray-800
              "
            >
              <div className="flex justify-center items-center">
                <img src="/gem.png" height={25} width={25} />
                <div className="ml-2 flex flex-col text-white">
                  <span className="text-sm text-left">10,000</span>
                  <span className="text-sm text-left text-[#F7BE38]">
                    Coin Prize
                  </span>
                </div>
              </div>
            </button>
            <button
              type="button"
              className="
              text-white 
              bg-[#A86A4B]
              stroke-[#FAB135]
              hover:bg-[#F7BE38]/90 
              focus:ring-4 
              focus:outline-none 
              focus:ring-[#F7BE38]/50 
              font-medium rounded-lg
              px-6
              py-2
              text-center 
              dark:focus:ring-[#F7BE38]/50
              drop-shadow-xl 
              text-base
              bordered-text-font
              border-2
              border-b-[6px] border-gray-800
              "
            >
              <div className="flex justify-center items-center">
                <img src="/heart.png" height={25} width={25} />
                <div className="ml-2 flex flex-col text-white">
                  <span className="text-sm text-left">5,000</span>
                  <span className="text-sm text-left text-[#F7BE38]">
                    LVL 1 Health
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="flex justify-center">
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
              feeding valuable text data to the AI. The AI, named &quot;Aria,&quot; is a
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
              {/* Rewards: By successfully completing challenges and feeding Aria
              with quality text data, you will earn points, unlock rewards, and
              contribute to Aria's growth and development. */}
            </p>
          </button>
        </div>
        <img src="bg-land.png" className="w-full absolute left-0 bottom-0" />
      </div>
    </section>
  );
};

export default StakingTierComponent;
