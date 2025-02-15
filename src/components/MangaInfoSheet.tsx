import { useRef, useState } from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { IMangaInfoProp } from "../props/mangaProps";
import { useMangaFavouriteStore } from "../store/zustore";

const getProxiedImageUrl = (mangaId: string, filename: string): string => {
  const imagePath = `https://uploads.mangadex.org/covers/${mangaId}/${filename}.512.jpg`;
  
  if (import.meta.env.DEV) {
    return imagePath;
  }

  const encodedUrl = encodeURIComponent(imagePath);
  return `https://kame-house-manga.web.app/image?url=${encodedUrl}`;
};

export function MangaInfoSheet({ mangaData, coverFile }: IMangaInfoProp) {
  const [expandDescription, setExpandDescription] = useState(false);
  const isFavorited = useRef(false);
  const favoritedMangas = useMangaFavouriteStore();

  if (favoritedMangas.favouriteMangas.includes(mangaData)) {
    isFavorited.current = true;
  }

  const addFavoriteManga = useMangaFavouriteStore(
    (state) => state.addFavouriteManga
  );

  const removeFavoriteManga = useMangaFavouriteStore(
    (state) => state.removeFavouriteManga
  );

  const handleAddFavorite = () => {
    if (
      favoritedMangas.favouriteMangas
        .map((data) => data.id)
        .includes(mangaData.id)
    ) {
      removeFavoriteManga(mangaData);
      isFavorited.current = false;
    } else {
      addFavoriteManga(mangaData);
      isFavorited.current = true;
    }
  };

  const toggleDescription = () => setExpandDescription(!expandDescription);

  return (
    <div className=" m-6 flex flex-col overflow-hidden rounded-3xl bg-secondary-gradient sm:items-center md:flex-row md:items-start md:justify-start shadow-md shadow-secondary">
      <img
        className={` h-fit w-full sm:mt-6 sm:w-96 sm:rounded-lg  md:m-0 md:rounded-none`}
        src={getProxiedImageUrl(mangaData.id, coverFile)}
      ></img>

      <div className="flex w-full flex-col p-6 pt-4 text-neutral-300 ">
        <div className="flex justify-between">
          <h2 className="mb-2 w-full text-lg font-semibold uppercase italic text-primary">
            {mangaData?.attributes?.title?.en ||
              mangaData?.attributes?.title?.["ja-ro"]}
          </h2>
          {favoritedMangas.favouriteMangas
            .map((data) => data.id)
            .includes(mangaData.id) ? (
            <button
              onClick={handleAddFavorite}
              className="-mr-2 text-3xl text-amber-500"
            >
              <AiFillStar />
            </button>
          ) : (
            <button
              onClick={handleAddFavorite}
              className="-mr-2 text-3xl text-amber-800"
            >
              <AiOutlineStar />
            </button>
          )}
        </div>
        <section
          onClick={toggleDescription}
          className={
            expandDescription
              ? `h-fit min-h-[5rem] w-full cursor-pointer transition-all duration-500`
              : `h-20 min-h-[5rem] w-full  cursor-pointer overflow-hidden bg-gradient-to-t from-accents via-text to-text bg-clip-text  text-transparent transition-all duration-500`
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
