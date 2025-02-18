import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { IChapterData } from "../models/chapterList";
import { IMangaChapterFeedProp } from "../props/mangaProps";
import { useEffect, useState } from "react";
import { processChapters } from "../services/processChapters";
import { useCurrentChapter } from "../store/currentChapterStore";
import { getChapterFeedById } from "../services/apicalls";

export function ChapterFeed({ mangaId }: IMangaChapterFeedProp) {
  const { setChapterList, setCurrentChapter } = useCurrentChapter();
  const [processedChapters, setProcessedChapters] = useState<IChapterData[]>([]);

  const { data, isSuccess } = useQuery<IChapterData[], Error>(
    [`chapterFeedQuery`, mangaId],
    () => getChapterFeedById(mangaId)
  );

  useEffect(() => {
    if (isSuccess && data) {
      const processed = processChapters(data);
      setProcessedChapters(processed);
      setChapterList(mangaId, processed);
    }
  }, [data, isSuccess, mangaId, setChapterList]);

  return (
    <div className="m-6 flex flex-col overflow-hidden rounded-3xl bg-[rgba(0, 180, 216, 0.4)] p-6 z-0">
      <h1 className="pb-4 text-primary">Available Chapters</h1>
      <div className="flex flex-col justify-center sm:flex-row sm:flex-wrap">
        {processedChapters.length === 0 ? (
          <p className="text-neutral-400">No English Translated Chapters</p>
        ) : (
          processedChapters.map((chapter) => (
            <div key={chapter.id} className="group relative">
              <Link
                to={`../manga/chapter/${chapter.id}`} state={{ mangaId }}
                onClick={() => setCurrentChapter(chapter.id)}
                className="block"
              >
                <div className="flex w-60 flex-shrink-0 cursor-pointer text-neutral-400">
                  <p className="rounded-full hover:bg-secondary/40 py-1 px-2">
                    Chapter: {chapter.attributes.chapter} {" "} 
                    Pages: {chapter.attributes.pages}
                  </p>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>
    </div>
  );
}