/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";

export default function LaunchScreen() {
  const route = useNavigate()

  //TODO: hnadlebutton clicks with tg api
  return (
    <section className="min-h-screen bg-[#A86A4B]">
      <div className="min-h-screen h-fit relative mx-auto max-w-screen-sm bg-[url('/bg-main.jpeg')] bg-no-repeat bg-cover bg-center bg-gray-500 bg-blend-multiply">
        <div className="flex justify-center" style={{ zIndex: 1 }}>
          <img src="/robot.svg" height={325} width={325} />
        </div>
        <div className="flex flex-col items-center">
          <h1 className="mt-10 font-normal text-6xl leading-[55px] bordered-text bordered-text-font">
            WELCOME <br />
            TO PLAYAI
          </h1>
          <p className="my-5 w-60 text-white text-xs text-center font-[Montserrat]">
            Are you ready to make a difference while having fun? Start tapping
            and training our AI bot today!
          </p>
          <div className="z-50 max-w-md  w-[90%] fixed bottom-10 flex flex-col mx-auto justify-center items-center">
            <MainBtn text={'Start Game'} onClick={() => route("/play")} />
            <div
              style={{ zIndex: 1 }}
              className="mt-4 w-4/5 flex justify-between"
            >
              <SmallBtn text={'Telegram'} />
              <SmallBtn text={'Website'} />
              <SmallBtn text={'Discord'} />
            </div>
          </div>
        </div>
        <img src="bg-land.png" className="w-full absolute left-0 bottom-0 z-10" />
      </div>
    </section>
  );
}

function SmallBtn({ text, onClick }) {
  return (
    <button
      onClick={onClick}
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
      px-4
      md:px-10
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
      {text}
    </button>)
}

function MainBtn({ text, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{ zIndex: 1 }}
      type="button"
      className="
        w-4/5 
        text-gray-900 
        bg-[#FBC45F]
        stroke-[#FAB135]
        hover:bg-[#F7BE38]/90 
        focus:ring-4 
        focus:outline-none 
        focus:ring-[#F7BE38]/50 
        font-medium rounded-lg
        px-5 
        py-2
        text-center 
        dark:focus:ring-[#F7BE38]/50
        drop-shadow-xl
        text-2xl
        bordered-text-font
        border-b-4 border-gray-900
        "
    >
      {text}
    </button>

  )
}

