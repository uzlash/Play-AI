"use client";
import { Modal } from "flowbite-react";
import { useEffect, useState } from "react";
import useGame from "../states/useGame";

import ButtomNav from "./Navbar/ButtomNav";
import sword from "../assets/sword.svg";
import energy from "../assets/energy.svg";
import potion from "../assets/potion.svg";
import roboto from "../assets/roboto.svg";

export default function BoostsComponent() {
  const { points, freeBoosts, damage, claimTurbo, claimRefill, rechargeSpeed, energyCap, manager, upgradeRechargeSpeed, upgradeDamage, upgradeEnergyCap, upgradeManager } = useGame();
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState()

  const calculateCost = (baseCost, currentLevel) => {
    return currentLevel === 1 ? baseCost : 1000 * Math.pow(2, currentLevel - 1);
  };

  const boosts = [
    {
      name: "Multi Slash",
      price: `$ ${calculateCost(100, damage)}`,
      level: `LVL ${damage}`,
      desc: `Increase your miners point to ${damage + 1} per mine`,
      image: sword,
      action: () => upgradeDamage(),
      ref: "damage"
    },
    {
      name: "Power Threshold",
      price: `$ ${calculateCost(100, energyCap === 1000 ? 1 : ((energyCap - 1000) / 500) + 1)}`,
      level: `LVL ${energyCap === 1000 ? 1 : ((energyCap - 1000) / 500) + 1}`,
      desc: `Increase your power threshold to ${energyCap + 500}`,
      image: potion,
      action: () => upgradeEnergyCap(),
      ref: "energyCap"
    },
    {
      name: "Recharge Speed",
      price: `$ ${calculateCost(100, rechargeSpeed)}`,
      level: `LVL ${rechargeSpeed}`,
      desc: `Increase Recharging speed to ${rechargeSpeed + 1} per second`,
      image: energy,
      action: () => upgradeRechargeSpeed(),
      ref: "rechargeSpeed"
    },
    {
      name: "Hire Miner",
      price: `$${manager.level === 0 ? 1000 : 2000 * Math.pow(2, manager.level + 1)}`,
      // price: `$${manager.level === 0 ? 5000 : 10000 * Math.pow(2, manager.level + 1)}`,
      level: `LVL ${manager.level + 1}`,
      desc: `Miner would mine on your behalf when there is energy for ${manager.level + 1}mins every trigger.`,
      image: roboto,
      action: () => upgradeManager(),
      ref: "manager"
    },
  ];

  function handleTurboBoost() {
    setModalContent({
      title: "Turbo Mode",
      desc: "Multiply your income by x5 for 20 Seconds. Do not use energy while active",
      btnText: freeBoosts.turboCount === 0 ? "Try Again Tomorrow" : "Get for free!!!",
      action: () => { handleCloseModal(); claimTurbo() },
      image: "/potion.svg",
      disabled: freeBoosts.turboCount === 0
    })
  }

  function handleRefillBoost() {
    setModalContent({
      title: "Recharge Power",
      desc: "Recharge your Power to the max",
      btnText: freeBoosts.refillEnergyAmount === 0 ? "Try Again Tomorrow" : "Get for free!!!",
      action: () => { handleCloseModal(); claimRefill() },
      image: "/energy.svg",
      disabled: freeBoosts.refillEnergyAmount === 0
    })
  }

  function handleCloseModal() {
    setOpenModal(false)
    setModalContent(null)
  }

  function handleBoosters(boost) {
    setModalContent({
      title: boost.name,
      desc: boost.desc,
      btnText: `Get for ${boost.price}`,
      action: () => { handleCloseModal(); boost.action() },
      image: boost.image,
      price: Number(boost.price.slice(1))
    })
  }

  useEffect(() => {
    if (modalContent) setOpenModal(true)
  }, [modalContent])

  return (
    <section className="min-h-screen bg-[#A86A4B]">
      <div className="h-screen relative mx-auto flex justify-center max-w-screen-sm bg-[url('/bg-main.jpeg')] bg-no-repeat bg-cover bg-center bg-[#0B080880] bg-blend-multiply">
        <div className="fixed top-5 w-[90%] max-w-md mx-auto z-50 flex flex-col items-center">
          <p className="text-xs text-center text-gray-400">Your Balance</p>
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
            <span className="ml-2 text-white text-4xl">$ {points}</span>
          </div>
        </div>
        <div className="fixed top-24 w-[90%] max-w-md mx-auto z-50 flex flex-col">
          <div className=" text-xl text-white font-medium">
            Free Boosts:
          </div>
          <div className="flex flex-col items-center">
            <div className="mt-2 w-full flex justify-between">
              <button
                onClick={handleTurboBoost}
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
                    <span className="text-base text-left">TURBO</span>
                    <span className="text-base text-left text-[#F7BE38]">
                      {freeBoosts.turboCount}/{freeBoosts.maxTurbo} Boosts
                    </span>
                  </div>
                </div>
              </button>
              <button
                onClick={handleRefillBoost}
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
                    <span className="text-base text-left">RECHARGE</span>
                    <span className="text-base text-left text-[#F7BE38]">
                      {freeBoosts.refillEnergyAmount}/{freeBoosts.maxRefillEnergyAmount} Boosts
                    </span>
                  </div>
                </div>
              </button>
            </div>
          </div>
          <div className="mt-2 text-xl text-white font-medium">Boosts:</div>
        </div>
        <div className="flex pt-64 w-full justify-center">
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
                  onClick={() => handleBoosters(e)}
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
            onClose={handleCloseModal}
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
                  <img src={modalContent?.image} width={175} height={200} />
                </div>
                <h2 className="text-center text-2xl font-semibold text-white">
                  {modalContent?.title}
                </h2>
                <p className="text-xs text-center leading-relaxed text-white">
                  {modalContent?.desc}
                </p>
              </div>
              <div className="flex justify-center my-4">
                <button
                  disabled={(modalContent?.price && points < modalContent.price) || modalContent?.disabled}
                  onClick={modalContent?.action}
                  type="button"
                  className=" disabled:bg-transparent
                  disabled:text-gray-500
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
                  {(modalContent?.price && points < modalContent.price) ? "Not Enoung Points" : modalContent?.btnText}
                </button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
        <ButtomNav />
      </div>
    </section>
  );
}


