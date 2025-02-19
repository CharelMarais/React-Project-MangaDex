import { useQuery } from "@tanstack/react-query";
import { useLocation, useParams } from "react-router-dom";
import { ErrorComponent } from "../components/ErrorComponent";
import Loading from "../components/Loading";
import { IChapter } from "../models/chapter";
import { getChapterImagesById } from "../services/apiCalls";
import { MangaReaderBottomBar } from "../components/MangaReaderBottomBar";
import { useScrollToTop } from "../services/scrollToTop";
import { useLastReadStore } from "../store/lastReadChapter";
import { useEffect } from "react";
import { useReadChaptersStore } from "../store/readChaptersStore";

const getProxiedImageUrl = (hash: string, chapter: string): string => {
  const imagePath = `https://uploads.mangadex.org/data-saver/${hash}/${chapter}`;
  
  if (import.meta.env.DEV) {
    return imagePath;
  }

  const encodedUrl = encodeURIComponent(imagePath);
  return `https://kame-house-manga.web.app/image?url=${encodedUrl}`;
};

export function MangaReader() {
  useScrollToTop()
  const { chapterId } = useParams();
  const location = useLocation();
  const { mangaId } = location.state || {};
  
  const { setLastReadChapter } = useLastReadStore();
  const { markChapterAsRead } = useReadChaptersStore();

  const { data, isLoading, isSuccess, isError } = useQuery<IChapter, Error>(
    [`coverImageQuery`, chapterId],
    () => getChapterImagesById(chapterId as string)
  );

  useEffect(() => {
    if (isSuccess && mangaId && chapterId) {
      setLastReadChapter(mangaId, chapterId);
    }
  }, [isSuccess, mangaId, chapterId, setLastReadChapter]);

  useEffect(() => {
    chapterId && mangaId && markChapterAsRead(mangaId, chapterId);
  }, [mangaId, chapterId]);
  
  return (
    <div className="flex h-full w-full flex-col items-center py-16 px-4">
      <MangaReaderBottomBar />
      {isError && <ErrorComponent />}
      {isLoading && <Loading />}
      {isSuccess &&
        data?.dataSaver.map((chapter) => {
          return (
            <img
              key={chapter}
              src={getProxiedImageUrl(data.hash, chapter)}
              alt=""
            />
          );
        })}
    </div>
  );
}
