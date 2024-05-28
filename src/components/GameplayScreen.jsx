import ButtomNav from "./Navbar/ButtomNav";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import useGame from "../states/useGame";
import ManagerButton from "./manager";

export default function Game() {
  const route = useNavigate()
  const { points, damage, levelData, manager, tap, recharge, rechargeTurbo, rechargeRefill, startManager, energy, energyCap } = useGame();
  const [showManagerButton, setShowManagerButton] = useState(false);
  const [tapEffects, setTapEffects] = useState([]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      //TODO: handle in a global position.
      recharge();
      rechargeTurbo();
      rechargeRefill()

      const now = Date.now();
      if (manager.level > 0 && (now - manager.timeTriggered) > 60000) {
        setShowManagerButton(true);
      } else {
        setShowManagerButton(false);
      }
    }, 1000);

    return () => clearInterval(intervalId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleTap(e) {
    const x = e.clientX;
    const y = e.clientY;
    const newTapEffect = {
      id: Date.now(),
      x,
      y,
      damage
    };

    tap()
    setTapEffects([...tapEffects, newTapEffect]);

    setTimeout(() => {
      setTapEffects((effects) => effects.filter((effect) => effect.id !== newTapEffect.id));
    }, 1000);
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      const now = Date.now();
      const autoTapDuration = manager.level * 60 * 1000;

      if (manager.timeTriggered > now && (now - manager.timeTriggered) < autoTapDuration) {
        tap();
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [manager, tap]);

  return (
    <section className="h-screen bg-[#A86A4B]">
      <div className="h-screen pt-10 relative mx-auto max-w-screen-sm bg-[url('/bg-main.jpeg')] bg-no-repeat bg-cover bg-center bg-gray-600 bg-blend-multiply">
        <div className="flex flex-col items-center">
          <div
            type="button"
            className="
              w-4/5
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
            <span className="ml-2 text-white">$ {points}</span>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="grid grid-cols-3 mb-4 w-4/5 center gap-2">
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
                <span className="text-xs ml-2 font-[Montserrat] text-left text-white">
                  <span className="font-[600] mr-1">Earn Gold</span>
                </span>
              </div>
            </button>
          </div>
        </div>
        <div className="flex justify-center my-4">
          <img onClick={handleTap} src="/robot.png" height="auto" width={'auto'} />
        </div>
        <div className="flex justify-center">
          <div
            className="
              w-5/6 
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
        {showManagerButton && <ManagerButton show={showManagerButton} onClick={startManager} />}
        {tapEffects.map((effect) => (
          <div
            key={effect.id}
            className="absolute text-white font-bold text-xl animate-evaporate"
            style={{ left: effect.x, top: effect.y }}
          >
            +{effect.damage}
          </div>
        ))}
      </div>
    </section>
  );
}

