import { useQuery } from "@tanstack/react-query";
import { getManga } from "../services/apicalls";
import { MangaData } from "../models/manga";
import { MangaCard } from "./MangaCard";

export function MangaCardContainer() {
  const mangaQuery = useQuery<MangaData[], Error>([`mangaQuery`], () =>
    getManga()
  );

  if (!mangaQuery?.data) return <></>;
  const mangaListArray = mangaQuery.data;

  return (
    <div className="flex flex-wrap">
      {mangaListArray ? (
        mangaListArray.map((mangaData) => (
          <MangaCard key={mangaData.id} data={mangaData} />
        ))
      ) : (
        <h1>Test</h1>
      )}
    </div>
  );
}
