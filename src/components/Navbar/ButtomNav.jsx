/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export default function ButtomNav() {
  const route = useNavigate()

  return (
    <div className="flex justify-center">
      <div
        style={{ zIndex: 1 }}
        className="
            w-5/6 
            bg-gray-950
            stroke-[#a86a4b]
            font-medium 
            rounded-lg
            text-center 
            drop-shadow-xl
            text-2xl
            bordered-text-font
            border-2
            border-b-4 
            border-[#a86a4b]
            flex 
            justify-around 
            items-center
            mt-4
            py-2
            px-4
            "
      >
        <MiniBtn onClick={() => route("/boost")}>
          <img src="/energy.svg" height={25} width={25} />
          <span className="text-sm text-left text-white mt-2">Boosts</span>
        </MiniBtn>
        <MiniBtn onClick={() => route("/play")}>
          <img src="/play.svg" height={25} width={25} />
          <span className="text-sm text-left text-white mt-2">Play</span>
        </MiniBtn>
        <MiniBtn onClick={() => route("/refer")}>
          <img src="/gift.svg" height={25} width={25} />
          <span className="text-sm text-left text-white mt-2">Refer</span>
        </MiniBtn>
        <MiniBtn onClick={() => route("/task")}>
          <img src="/task.svg" height={25} width={25} />
          <span className="text-sm text-left text-white mt-2">Task</span>
        </MiniBtn>
      </div>
    </div>
  );
}

function MiniBtn({ children, onClick }) {
  return (
    <button
    onClick={onClick}
      className="
            flex 
            flex-col 
            justify-center 
            items-center
            bg-gray-950
            stroke-[#a86a4b]
            hover:bg-[#F7BE38]/90 
            focus:ring-4
            focus:outline-none 
            focus:ring-[#F7BE38]/50 
            font-medium rounded-lg
            drop-shadow-xl
            bordered-text-font
            border-2
            border-b-4 
            border-[#a86a4b]
            py-2
            px-4"
    >
      {children}
    </button>
  );
}
