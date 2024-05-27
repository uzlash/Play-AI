"use client";
import ButtomNav from "./Navbar/ButtomNav";

const StakingTierComponent = () => {
  return (
    <section className="h-screen bg-[#A86A4B]">
      <div className="h-screen pt-10 relative mx-auto max-w-screen-sm bg-[url('/bg-main.jpeg')] bg-no-repeat bg-cover bg-center bg-gray-600 bg-blend-multiply">
        <div className="flex flex-col items-center">
          <button
            type="button"
            className="
              w-4/5
              bg-gray-950 
              stroke-[#a86a4b]
              hover:bg-[#F7BE38]/90 
              focus:ring-4 
              focus:outline-none 
              focus:ring-[#F7BE38]/50 
              font-medium rounded-lg
              px-10
              py-4
              text-center 
              dark:focus:ring-[#F7BE38]/50
              drop-shadow-xl
              text-3xl
              bordered-text-font
              border-2
              border-b-4 
              border-[#a86a4b]
              mb-5
              flex justify-center items-center
              "
          >
            <span className="ml-2 text-white">$ 240,203.01</span>
          </button>
        </div>
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-3 mb-4 w-4/5 center gap-2">
            <button
              type="button"
              className="
              col-span-2
              bg-gray-950 
              stroke-[#a86a4b]
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
              border-2
              border-b-4 
              border-[#a86a4b]
              flex justify-around items-center
              "
            >
              <div className="flex justify-center items-center">
                <img src="/crown.svg" height={16} width={16} />
                <span className="text-xs ml-2 font-[300] font-[Montserrat] text-left text-[#DFAF56]">
                  Normies {" >"}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <img src="/coin.svg" height={16} width={16} />
                <span className="text-xs ml-2 font-[Montserrat] text-left text-[#DFAF56]">
                  <span className="font-[600] mr-1">2,431</span>
                  <span className="font-[300]">Tons</span>
                </span>
              </div>
            </button>
            <button
              type="button"
              className="
              col-span-1
              bg-[#a86a4b] 
              stroke-[#DFAF56]
              focus:ring-4 
              focus:outline-none 
              focus:ring-[#DFAF56]
              font-medium rounded-lg
              px-0
              py-4
              text-center 
              drop-shadow-xl
              text-2xl
              bordered-text-font
              border-2
              border-b-4 
              border-[#DFAF56]
              flex justify-around items-center
              "
            >
              {/* <div className="flex justify-center items-center">
              <img src="/cash.svg" height={16} width={16} />
              <span className="text-sm text-left">Earn Tons</span>
            </div> */}
              <div className="flex justify-center items-center">
                <img src="/cash.svg" height={16} width={16} />
                <span className="text-xs ml-2 font-[Montserrat] text-left text-white">
                  <span className="font-[600] mr-1">Earn Tons</span>
                </span>
              </div>
            </button>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <img src="/robot.png" height="auto" width={'auto'} />
        </div>
        <div className="flex justify-center">
          <button
            type="button"
            className="
              w-5/6 
              bg-gray-950 
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
            <img src="/energy.svg" height={25} width={25} />
            <span className="ml-2 text-xs text-white">3250/5000</span>
            <div className="ml-4 w-full h-4 bg-gray-600 rounded-md dark:bg-gray-700">
              <div
                className="h-4 bg-[#FAB135] rounded-md"
                style={{ width: "70%" }}
              ></div>
            </div>
          </button>
        </div>
        <ButtomNav />
      </div>
    </section>
  );
};

export default StakingTierComponent;
