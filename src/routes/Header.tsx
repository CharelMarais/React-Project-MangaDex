import { TbListSearch } from "react-icons/tb";
import { Outlet, Link } from "react-router-dom";

export function Header() {
  return (
    <>
      <div className="bg-stone-800 mb-2 flex justify-between content-center border-b-amber-600 border-b-2">
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
        <div className="flex justify-center items-center m-2">
          <button className="cursor-pointer w-10">
            <TbListSearch className="text-amber-500 text-3xl w-full h-full font-bold pr-2 -pl-2" />
          </button>
        </div>
      </div>
      <Link to="mangalist/createdAt">New Release </Link>
      <Link to="mangalist/rating">Top Rated </Link>
      <Link to="mangalist/followedCount">Most Popular </Link>
      <Link to="mangalist/latestUploadedChapter">New Chapters</Link>
      <Outlet />
    </>
  );
}
