import { useLocation } from "react-router-dom";
import { MangaData } from "../models/manga";

export function MangaPage() {
  const location = useLocation();
  const mangaData: MangaData = location.state[0];
  const coverFile: string = location.state[1];

  console.log(mangaData);

  return (
    <div className=" bg-stone-800 rounded-3xl flex flex-col m-4 overflow-hidden">
      <img
        className={` overflow-hidden w-full h-fit flex flex-col-reverse`}
        src={`https://uploads.mangadex.org/covers/${mangaData.id}/${coverFile}.512.jpg`}
      ></img>

      <div className="flex flex-col text-neutral-300 p-2 w-full ">
        <h2 className="w-full text-amber-500 uppercase font-semibold italic pl-4 text-lg">
          {mangaData?.attributes?.title?.en ||
            mangaData?.attributes?.title?.["ja-ro"]}
        </h2>
        <div
          className="  p-4 w-full min-h-[5rem] h-20 hover:h-fit from-stone-800 to-neutral-200 via-neutral-200 bg-gradient-to-t bg-clip-text text-transparent
           hover:text-neutral-200  transition-all duration-500 overflow-hidden
           "
        >
          <p className="">
            {mangaData.attributes.description.en || "No Description Found"}
          </p>
        </div>
        <div className=" flex px-4 py-2 group-hover:hidden transition-all duration-500">
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
            } else {
              return <></>;
            }
          })}
        </div>
      </div>
    </div>
  );
}
