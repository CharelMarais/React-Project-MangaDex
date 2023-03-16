import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { IChapter } from "../models/chapter";
import { getChapterImagesById } from "../services/apicalls";

export function MangaReader() {
  const { chapterId } = useParams();

  const { data, isLoading, isSuccess } = useQuery<IChapter, Error>(
    [`coverImageQuery`, chapterId],
    () => getChapterImagesById(chapterId)
  );

  return (
    <div className="pt-16 p-4 flex flex-col items-center">
      {data?.dataSaver.map((chapter) => {
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
