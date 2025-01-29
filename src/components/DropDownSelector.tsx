import { useState } from "react";
import { TbListSearch } from "react-icons/tb";
import { Link } from "react-router-dom";
import SearchManga from "./SearchManga";

export function DropDownSelector() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="inline-flex items-center rounded-lg px-4 py-0 text-center focus:outline-none"
        type="button"
        aria-label="menu-button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-controls="dropdown-menu"
      >
        <TbListSearch className="h-full w-full px-2 pb-[1px] text-3xl font-bold text-amber-500" />
      </button>

      <div
        id="dropdown-menu"
        className={`absolute z-50 mt-2 right-0 top-10 w-44 divide-y divide-gray-100 rounded-bl-lg border-l-2 border-b-2 border-amber-600 bg-stone-800 shadow ${
          isOpen ? "block" : "hidden"
        }`}
      >
        <ul
          className="text-sm text-amber-500"
          role="menu"
        >
          <li className="">
            <SearchManga />
          </li>
          <li className="m-2 rounded px-2 py-1 text-lg hover:bg-stone-600" onClick={() => setIsOpen(!isOpen)}>
            <Link to="mangalist/createdAt">New Release</Link>
          </li>
          <li className="m-2 rounded px-2 py-1 text-lg hover:bg-stone-600" onClick={() => setIsOpen(!isOpen)}>
            <Link to="./mangalist/rating">Top Rated</Link>
          </li>
          <li className="m-2 rounded px-2 py-1 text-lg hover:bg-stone-600" onClick={() => setIsOpen(!isOpen)}>
            <Link to="./mangalist/followedCount">Most Popular</Link>
          </li>
          <li className="m-2 rounded px-2 py-1 text-lg hover:bg-stone-600" onClick={() => setIsOpen(!isOpen)}>
            <Link to="./mangalist/latestUploadedChapter">Latest</Link>
          </li>
          <li className="m-2 rounded px-2 py-1 text-lg hover:bg-stone-600" onClick={() => setIsOpen(!isOpen)}>
            <Link to="./favourites/">Favourites</Link>
          </li>
          <li className="m-2 rounded px-2 py-1 text-lg hover:bg-stone-600" onClick={() => setIsOpen(!isOpen)}>
            <Link to="./suspage/">Sus Page</Link>
          </li>
        </ul>
      </div>
    </>
  );
}