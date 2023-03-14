import { useQuery } from "@tanstack/react-query";
import { getManga } from "../services/apicalls";
import { MangaData } from "../models/manga";
import { MangaCard } from "../components/MangaCard";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function MangaCardContainer() {
  const { orderType } = useParams();

  const mangaQuery = useQuery<MangaData[], Error>([`mangaQuery`], () =>
    getManga(orderType)
  );

  useEffect(() => {
    mangaQuery.refetch();
  }, [orderType]);

  const mangaListArray = mangaQuery.data;
  const mangaListIsLoading = mangaQuery.isLoading;
  const mangaListIsSuccess = mangaQuery.isSuccess;
  const mangaListIsError = mangaQuery.isError;

  return (
    <div>
      {mangaListIsLoading && <div>manga is loading</div>}
      {mangaListIsSuccess && (
        <div className="flex flex-wrap justify-center gap-2">
          {mangaListArray ? (
            mangaListArray.map((mangaData) => {
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
