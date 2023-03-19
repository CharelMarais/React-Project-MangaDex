import { useLocation } from "react-router-dom";
import { ChapterFeed } from "../components/ChapterFeed";
import { ErrorComponent } from "../components/ErrorComponent";
import { MangaInfoSheet } from "../components/MangaInfoSheet";
import { IMangaData } from "../models/manga";

export function MangaPage() {
  const location = useLocation();
  const mangaData: IMangaData = location.state[0];
  const coverFile: string = location.state[1];

  return (
    <div className="pt-14 w-full">
      {mangaData && coverFile ? (
        <div>
          <MangaInfoSheet mangaData={mangaData} coverFile={coverFile} />
          <ChapterFeed mangaId={mangaData.id} />
        </div>
      ) : (
        <ErrorComponent />
      )}
    </div>
  );
}
