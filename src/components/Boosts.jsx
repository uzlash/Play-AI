"use client";

const BoostsComponent = () => {
  return (
    <section className="h-screen bg-[#A86A4B]">
      <div className="h-screen pt-20 relative mx-auto max-w-screen-sm bg-[url('/bg-main.jpeg')] bg-no-repeat bg-cover bg-center bg-gray-600 bg-blend-multiply">
        <div className="pl-8">
          <img src="/back.png" height={50} width={50} />
        </div>
        <div className="mt-4">
          <p className="text-xs text-center text-gray-400">
            Your Coins Balance
          </p>
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
          <img src="/gem.png" height={50} width={50} />
          <span className="ml-2 text-white text-4xl">240</span>
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
        <div className="pl-10 text-xl text-white font-medium pt-4">
          Free Boosts
        </div>
        <div className="flex flex-col items-center">
          <div className="mt-2 w-4/5 flex justify-between">
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
                  <span className="text-base text-left">TURBO</span>
                  <span className="text-base text-left text-[#F7BE38]">
                    3/3 Boosts
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
                  <span className="text-base text-left">RECHARGES</span>
                  <span className="text-base text-left text-[#F7BE38]">
                    3/3 Boosts
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="pl-10 text-xl text-white font-medium pt-4">
          Upgrades
        </div>
        <div className="flex justify-center">
          <div
            className="w-5/6 border-[1px] border-[#a86a4b] mt-4 rounded-md h-80 bg-gray-900 overflow-y-auto"
            style={{ zIndex: 1 }}
          >
            {[...Array(10)].map((e, i) => (
              <div
                key={i}
                className="p-4 flex justify-between border-b-[2px] border-b-[#a86a4b]"
              >
                <div className="flex justify-center items-center">
                  <img src="/hammer.png" height={50} width={50} />
                  <div className="ml-2 flex flex-col text-white">
                    <span className="text-lg text-left font-semibold">
                      Damage
                    </span>
                    <span className="text-xs font-[300] font-[Montserrat] text-left">
                      2,000 - Level 2
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <img src="/padlock.png" height={15} width={20} />
                </div>
              </div>
            ))}
          </div>
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

export default BoostsComponent;
