import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ErrorComponent } from "../components/ErrorComponent";
import Loading from "../components/Loading";
import { IChapter } from "../models/chapter";
import { getChapterImagesById } from "../services/apicalls";

export function MangaReader() {
  const { chapterId } = useParams();

  const { data, isLoading, isSuccess, isError } = useQuery<IChapter, Error>(
    [`coverImageQuery`, chapterId],
    () => getChapterImagesById(chapterId)
  );

  return (
    <div className="flex h-full w-full flex-col items-center py-16 px-4">
      {isError && <ErrorComponent />}
      {isLoading && <Loading />}
      {isSuccess &&
        data?.dataSaver.map((chapter) => {
          return (
            <img
              key={chapter}
              className="py-1"
              src={`https://uploads.mangadex.org/data-saver/${data.hash}/${chapter}`}
              alt=""
            />
          );
        })}
    </div>
  );
}
