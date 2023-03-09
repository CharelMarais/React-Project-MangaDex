import { TbListSearch } from "react-icons/tb";

export function Header() {
  return (
    <div className="bg-gray-800 mb-2 flex justify-between content-center border-b-amber-600 border-b-2">
      <img
        className="w-12 m-0 -my-1 "
        src="src/assets/img/logo.png"
        alt="aura"
      />
      <h1 className="text-amber-500 flex antialiased flex-auto items-center font-mono uppercase font-bold text-3xl">
        K<span className="text-lg">ame</span> H
        <span className="text-lg">ouse</span>
      </h1>
      <div className="flex justify-center items-center m-2">
        <button className="cursor-pointer w-10">
          <TbListSearch className="text-amber-500 text-3xl w-full h-full font-bold pr-2 -pl-2" />
        </button>
      </div>
    </div>
  );
}
