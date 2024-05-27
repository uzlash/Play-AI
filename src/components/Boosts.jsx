"use client";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";

import ButtomNav from "./Navbar/ButtomNav";
import sword from "../assets/sword.svg";
import energy from "../assets/energy.svg";
import potion from "../assets/potion.svg";
import roboto from "../assets/roboto.svg";

const BoostsComponent = () => {
  const [openModal, setOpenModal] = useState(false);

  const boosts = [
    { name: "Multi Slash", price: "$500", level: "LVL 2", image: sword },
    { name: "Power Threshold", price: "$500", level: "LVL 2", image: potion },
    { name: "Recharge Speed", price: "$500", level: "LVL 2", image: energy },
    { name: "Hire Miner", price: "$500", level: "LVL 2", image: roboto },
  ];

  return (
    <section className="h-screen bg-[#A86A4B]">
      <div className="h-screen pt-20 relative mx-auto max-w-screen-sm bg-[url('/bg-main.jpeg')] bg-no-repeat bg-cover bg-center bg-[#0B080880] bg-blend-multiply">
        <div className="mt-4">
          <p className="text-xs text-center text-gray-400">Your Balance</p>
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
          <span className="ml-2 text-white text-4xl">$ 240,203.01</span>
        </div>
        <div className="pl-10 text-xl text-white font-medium pt-4">
          Free Boosts:
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
              border-b-[6px] border-gray-950
              "
            >
              <div className="flex justify-center items-center">
                <img src="/energy.svg" height={25} width={25} />
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
              border-b-[6px] border-gray-950
              "
            >
              <div className="flex justify-center items-center">
                <img src="/potion.svg" height={25} width={25} />
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
        <div className="pl-10 text-xl text-white font-medium pt-4">Boosts:</div>
        <div className="flex justify-center">
          <div
            className="w-5/6 border-[1px] border-[#a86a4b] mt-4 mb-2 rounded-md h-[314px] bg-gray-950 overflow-y-auto"
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
                      {e.price} - {e.level}
                    </span>
                  </div>
                </div>
                <div
                  onClick={() => setOpenModal(true)}
                  className="flex items-center"
                >
                  <img src="/right.svg" height={15} width={20} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex items-center">
          <Modal
            show={openModal}
            onClose={() => setOpenModal(false)}
            theme={{
              root: {
                base: "fixed top-0 inset-x-0 z-50 h-screen overflow-y-auto overflow-x-hidden md:inset-0 md:h-full",
              },
              // content: {
              //   base: "relative h-full w-full p-4 md:h-auto",
              //   inner:
              //     "relative flex max-h-[90dvh] flex-col rounded-lg bg-white shadow dark:bg-gray-700",
              // },
              body: {
                base: "flex-1 overflow-auto p-6 bg-black/[.99]",
                popup: "pt-0",
              },
              header: {
                base: "flex items-start justify-between rounded-t p-5 bg-black/[.99]",
                popup: "border-b-0 p-2",
                title: "text-xl font-medium text-gray-900 dark:text-white",
                close: {
                  base: "ml-auto inline-flex items-center rounded-lg text-[#fbc45f] border-2 border-[#fbc45f] rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white",
                  icon: "h-5 w-5",
                },
              },
            }}
          >
            <Modal.Header></Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <div className="flex justify-center items-center">
                  <img src="./sword.svg" width={175} height={200} />
                </div>
                <h2 className="text-center text-2xl font-semibold text-white">
                  Multi Slash
                </h2>
                <p className="text-xs text-center leading-relaxed text-white">
                  Multiply your income by x5 for 20 Seconds. Do not use energy
                  while active.
                </p>
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
                  px-10
              "
                >
                  Get for free!!!
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        <ButtomNav />
      </div>
    </section>
  );
};

export default BoostsComponent;
