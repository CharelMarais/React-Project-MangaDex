import { MangaCard } from "../components/MangaCard";
import { ErrorComponent } from "../components/ErrorComponent";
import Loading from "../components/Loading";
import { useMangaFavoriteStore } from "../store/zustore";

export function FavoriteMangaCardContainer() {
  const favoritedMangas = useMangaFavoriteStore().favoriteMangas;

  return (
    <div className="h-full w-full pt-16">
      <div className="flex h-full flex-col flex-wrap gap-2">
        <h2 className="w-fit pl-4 text-lg font-semibold uppercase italic text-amber-500 ">
          Favorites
        </h2>
        {favoritedMangas.length ? (
          <div className="flex flex-wrap justify-center gap-2">
            {favoritedMangas.map((mangaData) => {
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
            <p>No favorites saved... yet!!!</p>
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
