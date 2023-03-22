import { Link } from "react-router-dom";
import { DropDownSelector } from "../components/DropDownSelector";

export function Header() {
  return (
    <>
      <div className="fixed mb-2 flex w-full content-center justify-between border-b-2 border-b-amber-600 bg-stone-800">
        <Link to="/">
          <img
            className="m-0  w-12 p-1 "
            src="/src/assets/img/logo.png"
            alt="logo"
          />
        </Link>

        <h1 className="flex flex-auto items-center font-mono text-3xl font-bold uppercase text-amber-500 antialiased">
          K<span className="text-lg">ame</span> H
          <span className="text-lg">ouse</span>
        </h1>
        <div className="flex items-center justify-center">
          <DropDownSelector />
        </div>
      </div>
    </>
  );
}
