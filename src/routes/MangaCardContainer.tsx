import { useQuery } from "@tanstack/react-query";
import { getManga } from "../services/apicalls";
import { MangaData } from "../models/manga";
import { MangaCard } from "../components/MangaCard";
import { useParams } from "react-router-dom";

export function MangaCardContainer() {
  const { orderType } = useParams();

  const { data, isLoading, isSuccess } = useQuery<MangaData[], Error>(
    [`mangaQuery`, orderType],
    () => getManga(orderType)
  );

  let currentPage: string = "";
  switch (orderType) {
    case "rating":
      currentPage = "Top Rated";
      break;
    case "createdAt":
      currentPage = "New Releases";
      break;
    case "followedCount":
      currentPage = "Most Popular";
      break;
    case "latestUploadedChapter":
      currentPage = "Latest Chapters";
      break;
  }

  return (
    <div>
      {isLoading && <div>manga is loading</div>}
      {isSuccess && (
        <div className="flex flex-wrap justify-center gap-2">
          <h2 className="w-full text-amber-500 uppercase font-semibold italic pl-4 text-lg">
            {currentPage}
          </h2>
          {data ? (
            data.map((mangaData) => {
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
            })
          ) : (
            <h1>Test</h1>
          )}
        </div>
      )}
    </div>
  );
}
