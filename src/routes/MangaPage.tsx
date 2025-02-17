import { useLocation, useNavigate } from "react-router-dom";
import { ChapterFeed } from "../components/ChapterFeed";
import { ErrorComponent } from "../components/ErrorComponent";
import { MangaInfoSheet } from "../components/MangaInfoSheet";
import { IMangaData } from "../models/manga";
import { useScrollToTop } from "../services/scrollToTop";
import { useCurrentChapter } from "../store/currentChapterStore";
import { useEffect } from "react";

export function MangaPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const mangaData: IMangaData = location.state[0];
  const coverFile: string = location.state[1];
  useScrollToTop();

  const { setCurrentMangaData } = useCurrentChapter(); 

  useEffect(() => {
    if (mangaData && coverFile) {
      setCurrentMangaData(mangaData, coverFile);
    }
  }, [mangaData, coverFile, setCurrentMangaData]);

  useEffect(() => {
    if (!mangaData || !coverFile) {
      navigate('/', { replace: true });
    }
  }, [mangaData, coverFile, navigate]);

  return (
    <div className="w-full pt-14">
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