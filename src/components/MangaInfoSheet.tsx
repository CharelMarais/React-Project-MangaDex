import { useState } from "react";
import { IMangaInfoProp } from "../props/mangaProps";

export function MangaInfoSheet({ mangaData, coverFile }: IMangaInfoProp) {
  const [expandDescription, setExpandDescription] = useState(false);

  const toggleDescription = () => setExpandDescription(!expandDescription);

  return (
    <div className=" bg-stone-800 rounded-3xl flex flex-col m-6 overflow-hidden sm:items-center md:flex-row md:justify-start md:items-start">
      <img
        className={` w-full h-fit sm:w-96 sm:mt-6 sm:rounded-lg  md:m-0 md:rounded-none`}
        src={`https://uploads.mangadex.org/covers/${mangaData.id}/${coverFile}.512.jpg`}
      ></img>

      <div className="flex flex-col text-neutral-300 p-6 pt-4 w-full ">
        <h2 className="w-full text-amber-500 uppercase font-semibold italic text-lg mb-2">
          {mangaData?.attributes?.title?.en ||
            mangaData?.attributes?.title?.["ja-ro"]}
        </h2>
        <section
          onClick={toggleDescription}
          className={
            expandDescription
              ? `w-full min-h-[5rem] h-fit transition-all duration-500 cursor-pointer`
              : `w-full min-h-[5rem] h-20  from-stone-800 to-neutral-200 via-neutral-200 bg-gradient-to-t bg-clip-text text-transparent cursor-pointer  transition-all duration-500 overflow-hidden`
          }
        >
          <p className="">
            {mangaData.attributes.description.en || "No Description Found"}
          </p>
        </section>
        <div className=" flex flex-wrap py-2 transition-all duration-500">
          {mangaData.attributes.tags.map((tag) => {
            if (tag.attributes.group === "genre") {
              return (
                <p
                  key={tag.id}
                  className="m-1 ml-0 rounded-full bg-stone-600 w-fit px-2 text-[0.6rem] font-semibold uppercase"
                >
                  {tag.attributes.name.en}
                </p>
              );
            }
          })}
        </div>
        <p>
          Release Year:{" "}
          <span className="italic m-1 ml-0 rounded-full bg-stone-600 w-fit px-2 text-sm font-semibold uppercase">
            {mangaData.attributes.year}
          </span>
        </p>
        <p>
          Status:{" "}
          <span className="italic m-1 ml-0 rounded-full bg-stone-600 w-fit px-2 text-sm font-semibold uppercase">
            {mangaData.attributes.status}
          </span>
        </p>
        <p>
          State:{" "}
          <span className="italic m-1 ml-0 rounded-full bg-stone-600 w-fit px-2 text-sm font-semibold uppercase">
            {mangaData.attributes.state}
          </span>
        </p>
      </div>
    </div>
  );
}
