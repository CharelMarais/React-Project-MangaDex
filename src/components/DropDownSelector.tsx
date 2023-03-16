import { TbListSearch } from "react-icons/tb";
import { Link } from "react-router-dom";
import "flowbite";

export function DropDownSelector() {
  return (
    <>
      <button
        id="dropdownDefaultButton"
        data-dropdown-toggle="dropdown"
        className=""
        type="button"
      >
        <TbListSearch className="text-amber-500 text-3xl w-full h-full font-bold px-2 pb-[1px]" />
      </button>

      <div
        id="dropdown"
        className=" z-10 hidden bg-stone-800 divide-y divide-gray-100 rounded-b-lg shadow w-44 border-x-2 border-b-2 border-amber-600"
      >
        <ul
          className=" text-sm text-amber-500"
          aria-labelledby="dropdownDefaultButton"
        >
          <li className="text-lg px-2 py-1 m-2 hover:bg-stone-600 rounded">
            <Link to="mangalist/createdAt">New Release </Link>
          </li>
          <li className="text-lg px-2 py-1 m-2 hover:bg-stone-600 rounded">
            <Link to="mangalist/rating">Top Rated </Link>
          </li>
          <li className="text-lg px-2 py-1 m-2 hover:bg-stone-600 rounded">
            <Link to="mangalist/followedCount">Most Popular </Link>
          </li>
          <li className="text-lg px-2 py-1 m-2 hover:bg-stone-600 rounded">
            <Link to="mangalist/latestUploadedChapter">New Chapters</Link>
          </li>
          <li className="text-lg px-2 py-1 m-2 hover:bg-stone-600 rounded">
            <Link to="suspage/">Sus Page</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
