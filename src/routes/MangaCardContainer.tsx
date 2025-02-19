import { useQuery } from "@tanstack/react-query";
import { getManga, getMangaSearchResults } from "../services/apiCalls";
import { IMangaData } from "../models/manga";
import { MangaCard } from "../components/MangaCard";
import { useParams } from "react-router-dom";
import { ErrorComponent } from "../components/ErrorComponent";
import Loading from "../components/Loading";

export function MangaCardContainer() {
  const { orderType } = useParams();
  const { searchValue } = useParams();

  if (!(orderType || searchValue)) return <ErrorComponent />;

  let data: IMangaData[] | undefined;
  let isLoading: boolean;
  let isSuccess: boolean;
  let isError: boolean;

  if (orderType) {
    const queryResult = useQuery<IMangaData[], Error>(
      [`mangaQuery`, orderType],
      () => getManga(orderType)
    );
    data = queryResult.data;
    isLoading = queryResult.isLoading;
    isSuccess = queryResult.isSuccess;
    isError = queryResult.isError;
  } else {
    const queryResult = useQuery<IMangaData[], Error>(
      [`mangaSearchQuery`, searchValue],
      () => getMangaSearchResults(searchValue)
    );
    data = queryResult.data;
    isLoading = queryResult.isLoading;
    isSuccess = queryResult.isSuccess;
    isError = queryResult.isError;
  }

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
    <div className="w-full pt-16">
      {isError && <ErrorComponent />}
      {isLoading && <Loading />}
      {isSuccess && (
        <div className="flex flex-wrap justify-center gap-2">
          <h2 className="w-full pl-4 text-lg font-semibold uppercase italic text-primary ">
            {currentPage || `Results: ${searchValue}`}
          </h2>

          {data?.map((mangaData) => {
            return (
              mangaData.attributes.availableTranslatedLanguages.find(lang => lang === 'en') && <MangaCard
                key={mangaData.id}
                mangaData={mangaData}
                mangaId={mangaData.id}
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
      )}
    </div>
  );
}
