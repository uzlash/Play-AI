/* eslint-disable react-hooks/exhaustive-deps */
import ButtomNav from "./Navbar/ButtomNav";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import useGame, { parsePoints } from "../states/useGame";
import ManagerButton from "./manager";
import TurboButton from "./Turbo";

export default function Game() {
  const route = useNavigate()
  const { points, damage, levelData, freeBoosts, activateTurbo, turboTap, turboDamageMultiplier, manager, tap, startManager, energy, energyCap, turboActive, managerActive } = useGame();
  const [tapEffects, setTapEffects] = useState([]);
  const [idle, setIdle] = useState(true);
  const idleTimeoutRef = useRef(null);

  function resetIdleTimeout() {
    if (idleTimeoutRef.current) {
      clearTimeout(idleTimeoutRef.current);
    }
    idleTimeoutRef.current = setTimeout(() => setIdle(true), 2250);
  }

  function createTapEffect(id, x, y, damage) {
    return { id, x, y, damage };
  }
  
  function handleTapOrClick(e, isTurbo, isMultiTouch) {
    e.preventDefault();
    if (energy > damage || isTurbo) {
      setIdle(false);
      const newTapEffects = [];
      const touchList = isMultiTouch ? e.touches : [e];
      const effectDamage = isTurbo ? damage * turboDamageMultiplier : damage;
      const tapAction = isTurbo ? turboTap : tap;
  
      for (let i = 0; i < touchList.length; i++) {
        const touch = touchList[i];
        const x = touch.clientX;
        const y = touch.clientY;
        const newTapEffect = createTapEffect(Date.now() + i, x, y, effectDamage);
        newTapEffects.push(newTapEffect);
        tapAction();
      }
  
      setTapEffects((prevEffects) => [...prevEffects, ...newTapEffects]);
  
      setTimeout(() => {
        setTapEffects((effects) => effects.filter((effect) => !newTapEffects.includes(effect)));
      }, 1000);
  
      resetIdleTimeout();
    }
  }
  
  function handleTap(e) {
    handleTapOrClick(e, false, true);
  }
  
  function handleTurboTap(e) {
    handleTapOrClick(e, true, true);
  }
  
  function handleClick(e) {
    handleTapOrClick(e, false, false);
  }
  
  function handleTurboClick(e) {
    handleTapOrClick(e, true, false);
  }

  function handleActivateManger() {
    startManager()
  }

  function handleActivateTurbo() {
    activateTurbo()
  }

  return (
    <section className="h-screen bg-[#A86A4B]">
      <div className="h-screen justify-center flex relative mx-auto max-w-screen-sm bg-[url('/bg-main.jpeg')] bg-no-repeat bg-cover bg-center bg-gray-600 bg-blend-multiply">
        <div className="fixed top-5 max-w-md w-[90%]  mx-auto z-50 flex flex-col items-center">
          <div
            type="button"
            className="
              w-full
              bg-gray-950 
              stroke-[#a86a4b]
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
            <span className="ml-2 text-white">{parsePoints(points).value}{parsePoints(points).units ? ' ' + parsePoints(points).units : ''}</span>
          </div>
        </div>
        <div className="fixed top-[100px]  max-w-md  w-[90%]  mx-auto z-50 flex justify-center">
          <div className="grid grid-cols-3 mb-4 w-full center gap-2">
            <button
              type="button"
              className="
              col-span-2
              bg-gray-950 
              stroke-[#a86a4b]
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
              <div onClick={() => route("/league")} className="flex justify-center items-center">
                <img src="/crown.svg" height={16} width={16} />
                <span className="text-xs ml-2 font-[300] font-[Montserrat] text-left text-[#DFAF56]">
                  {levelData.name} {" >"}
                </span>
              </div>
              <div className="flex justify-center items-center">
                <img src="/coin.svg" height={16} width={16} />
                <span className="text-xs ml-2 font-[Montserrat] text-left text-[#DFAF56]">
                  <span className="font-[600] mr-1">2,431</span>
                  <span className="font-[300]">Gold</span>
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
              <div className="flex justify-center items-center">
                <img src="/cash.svg" height={16} width={16} />
                <span className="text-xs ml-1 font-[Montserrat] text-left text-white">
                  <span className="font-[600] mr-1">Earn Gold</span>
                </span>
              </div>
            </button>
          </div>
        </div>
        <div className="fixed top-[200px] max-w-md w-[90%] items-center mx-auto z-50 flex justify-center ">
          <img onTouchStart={turboActive ? handleTurboTap : handleTap} onClick={turboActive ? handleTurboClick : handleClick} className="self-center transition-all" src={(idle && !managerActive) ? "/loader.gif" : "/miner.gif"} height="auto" width={'auto'} />
        </div>
        <div className="flex z-50 bottom-28 max-w-md  w-[90%] mx-auto fixed justify-center">
          <div
            className="
              w-full
              bg-gray-950 
              stroke-[#a86a4b]
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
            <span className="ml-2 text-xs text-white">{energy}/{energyCap}</span>
            <div className="ml-4 w-full h-4 bg-gray-600 rounded-md dark:bg-gray-700">
              <div
                className="h-4 bg-[#FAB135] rounded-md"
                style={{ width: `${(energy / energyCap) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
        <ButtomNav />
        {manager.level > 0 && !managerActive && <ManagerButton show={manager.level > 0 && !managerActive} onTouchStart={handleActivateManger} />}
        {freeBoosts.turboActivePurchase && <TurboButton show={freeBoosts.turboActivePurchase} onTouchStart={handleActivateTurbo} />}
        {tapEffects.map((effect) => (
          <div
            key={effect.id}
            className="absolute text-white z-50 font-bold text-3xl animate-evaporate"
            style={{ left: effect.x, top: effect.y }}
          >
            +{effect.damage}
          </div>
        ))}
      </div>
    </section>
  );
}

