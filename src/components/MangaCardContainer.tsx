import { useQuery } from "@tanstack/react-query";
import { getManga } from "../services/apicalls";
import { MangaData } from "../models/manga";
import { MangaCard } from "./MangaCard01";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export function MangaCardContainer() {
  const [mangaOrderType, setMangaOrderType] = useState("");
  const { orderType } = useParams();

  const mangaQuery = useQuery<MangaData[], Error>([`mangaQuery`], () =>
    getManga(orderType)
  );

  useEffect(() => {
    if (orderType) {
      setMangaOrderType(orderType);
    }
    mangaQuery.refetch();
  }, [orderType]);

  const mangaListArray = mangaQuery.data;
  const mangaListIsLoading = mangaQuery.isLoading;
  const mangaListIsSuccess = mangaQuery.isSuccess;
  const mangaListIsError = mangaQuery.isError;

  console.log(mangaListIsLoading);

  return (
    <div>
      {mangaListIsLoading && <div>manga is loading</div>}
      {mangaListIsSuccess && (
        <div className="flex flex-wrap justify-center">
          {mangaListArray ? (
            mangaListArray.map((mangaData) => {
              return (
                <MangaCard
                  key={mangaData.id}
                  managId={mangaData.id}
                  coverId={
                    mangaData.relationships.find(
                      ({ type }) => type === "cover_art"
                    )?.id || ""
                  }
                  title={mangaData?.attributes?.title?.en}
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
