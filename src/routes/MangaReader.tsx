import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ErrorComponent } from "../components/ErrorComponent";
import Loading from "../components/Loading";
import { IChapter } from "../models/chapter";
import { getChapterImagesById } from "../services/apicalls";
import { MangaReaderBottomBar } from "../components/MangaReaderBottomBar";
import { useScrollToTop } from "../services/scrollToTop";

const getProxiedImageUrl = (hash: string, chapter: string): string => {
  const imagePath = `https://uploads.mangadex.org/data-saver/${hash}/${chapter}`;
  
  if (import.meta.env.DEV) {
    const encodedUrl = encodeURIComponent(imagePath);
    return `http://localhost:5001/kame-house-manga/us-central1/imageProxy?url=${encodedUrl}`;
  }

  const encodedUrl = encodeURIComponent(imagePath);
  return `https://kame-house-manga.web.app/image?url=${encodedUrl}`;
};

export function MangaReader() {
  useScrollToTop()
  const { chapterId } = useParams();

  const { data, isLoading, isSuccess, isError } = useQuery<IChapter, Error>(
    [`coverImageQuery`, chapterId],
    () => getChapterImagesById(chapterId as string)
  );
  

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
