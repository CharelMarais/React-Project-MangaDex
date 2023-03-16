import { Outlet, Link } from "react-router-dom";
import { DropDownSelector } from "../components/DropDownSelector";

export function Header() {
  return (
    <>
      <div className="bg-stone-800 mb-2 w-full flex justify-between content-center border-b-amber-600 border-b-2 fixed">
        <Link to="/">
          <img
            className="w-12 m-0 -my-1 "
            src="/src/assets/img/logo.png"
            alt="logo"
          />
        </Link>

        <h1 className="text-amber-500 flex antialiased flex-auto items-center font-mono uppercase font-bold text-3xl">
          K<span className="text-lg">ame</span> H
          <span className="text-lg">ouse</span>
        </h1>
        <div className="flex justify-center items-center">
          <DropDownSelector />
        </div>
      </div>

      <Outlet />
    </>
  );
}
