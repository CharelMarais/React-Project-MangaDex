import { MangaCard } from "../components/MangaCard";
import { useMangaFavouriteStore } from "../store/zustore";

export function FavouriteMangaCardContainer() {
  const favouritedMangas = useMangaFavouriteStore().favouriteMangas;

  return (
    <div className="h-full w-full pt-16">
      <div className="flex h-full w-full flex-col flex-wrap gap-2">
        <h2 className="w-fit pl-4 text-lg font-semibold uppercase italic text-amber-500 ">
          Favourites
        </h2>
        {favouritedMangas.length ? (
          <div className="flex w-full flex-wrap justify-center gap-2">
            {favouritedMangas.map((mangaData) => {
              return (
                <MangaCard
                  key={mangaData.id}
                  mangaData={mangaData}
                  managId={mangaData.id}
                  coverId={
                    mangaData.relationships.find(
                      ({ type }) => type === "cover_art"
                    )?.id || ""
                  }
                  title={
                    mangaData?.attributes?.title?.en ||
                    mangaData?.attributes?.title?.["ja-ro"]
                  }
                  contentRating={mangaData?.attributes?.contentRating}
                />
              );
            })}
          </div>
        ) : (
          <div className="m-auto flex h-fit flex-col items-center text-neutral-200 ">
            <p>No favourites saved... yet!!!</p>
            <p>We have many flavours to choose from</p>
            <img
              className="w-60"
              src="/src/assets/img/force.png"
              alt="ginu force"
            />
          </div>
        )}
      </div>
    </div>
  );
}
