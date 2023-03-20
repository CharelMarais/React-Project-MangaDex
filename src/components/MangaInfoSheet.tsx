import { useState } from "react";
import { IMangaInfoProp } from "../props/mangaProps";

export function MangaInfoSheet({ mangaData, coverFile }: IMangaInfoProp) {
  const [expandDescription, setExpandDescription] = useState(false);

  const toggleDescription = () => setExpandDescription(!expandDescription);

  return (
    <div className=" m-6 flex flex-col overflow-hidden rounded-3xl bg-stone-800 sm:items-center md:flex-row md:items-start md:justify-start">
      <img
        className={` h-fit w-full sm:mt-6 sm:w-96 sm:rounded-lg  md:m-0 md:rounded-none`}
        src={`https://uploads.mangadex.org/covers/${mangaData.id}/${coverFile}.512.jpg`}
      ></img>

      <div className="flex w-full flex-col p-6 pt-4 text-neutral-300 ">
        <h2 className="mb-2 w-full text-lg font-semibold uppercase italic text-amber-500">
          {mangaData?.attributes?.title?.en ||
            mangaData?.attributes?.title?.["ja-ro"]}
        </h2>
        <section
          onClick={toggleDescription}
          className={
            expandDescription
              ? `h-fit min-h-[5rem] w-full cursor-pointer transition-all duration-500`
              : `h-20 min-h-[5rem] w-full  cursor-pointer overflow-hidden bg-gradient-to-t from-stone-800 via-neutral-200 to-neutral-200 bg-clip-text  text-transparent transition-all duration-500`
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
                  className="m-1 ml-0 w-fit rounded-full bg-stone-600 px-2 text-[0.6rem] font-semibold uppercase"
                >
                  {tag.attributes.name.en}
                </p>
              );
            }
          })}
        </div>
        <p>
          Release Year:{" "}
          <span className="m-1 ml-0 w-fit rounded-full bg-stone-600 px-2 text-sm font-semibold uppercase italic">
            {mangaData.attributes.year}
          </span>
        </p>
        <p>
          Status:{" "}
          <span className="m-1 ml-0 w-fit rounded-full bg-stone-600 px-2 text-sm font-semibold uppercase italic">
            {mangaData.attributes.status}
          </span>
        </p>
        <p>
          State:{" "}
          <span className="m-1 ml-0 w-fit rounded-full bg-stone-600 px-2 text-sm font-semibold uppercase italic">
            {mangaData.attributes.state}
          </span>
        </p>
      </div>
    </div>
  );
}
