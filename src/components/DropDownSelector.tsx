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
        <TbListSearch className="h-full w-full px-2 pb-[1px] text-3xl font-bold text-amber-500" />
      </button>

      <div
        id="dropdown"
        className=" z-10 hidden w-44 divide-y divide-gray-100 rounded-b-lg border-x-2 border-b-2 border-amber-600 bg-stone-800 shadow"
      >
        <ul
          className=" text-sm text-amber-500"
          aria-labelledby="dropdownDefaultButton"
        >
          <li className="m-2 rounded px-2 py-1 text-lg hover:bg-stone-600">
            <Link to="mangalist/createdAt">New Release </Link>
          </li>
          <li className="m-2 rounded px-2 py-1 text-lg hover:bg-stone-600">
            <Link to="mangalist/rating">Top Rated </Link>
          </li>
          <li className="m-2 rounded px-2 py-1 text-lg hover:bg-stone-600">
            <Link to="mangalist/followedCount">Most Popular </Link>
          </li>
          <li className="m-2 rounded px-2 py-1 text-lg hover:bg-stone-600">
            <Link to="mangalist/latestUploadedChapter">New Chapters</Link>
          </li>
          <li className="m-2 rounded px-2 py-1 text-lg hover:bg-stone-600">
            <Link to="suspage/">Sus Page</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
