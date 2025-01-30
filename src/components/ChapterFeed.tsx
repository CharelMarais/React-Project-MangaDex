import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { IChapterData } from "../models/chapterList";
import { IMangaChapterFeedProp } from "../props/mangaProps";
import { getChapterFeedById } from "../services/apicalls";

export function ChapterFeed({ mangaId }: IMangaChapterFeedProp) {
  const { data, isSuccess } = useQuery<IChapterData[], Error>(
    [`chapterFeedQuery`, mangaId],
    () => getChapterFeedById(mangaId)
  );

  return (
    <>
      {isSuccess && (
        <div className=" m-6 flex flex-col overflow-hidden rounded-3xl bg-stone-800 p-6">
          <h1 className="pb-4 text-amber-500">Available Chapters</h1>
          <div className="flex flex-col justify-center sm:flex-row sm:flex-wrap">
            {!data?.length ? (
              <p className="text-neutral-400">No English Translated Chapters</p>
            ) : (
                Array.from(
                  data
                    ?.sort((a, b) => {
                      const chapterA = parseFloat(a.attributes.chapter) || 0;
                      const chapterB = parseFloat(b.attributes.chapter) || 0;
                      
                      const volumeA = a.attributes.volume ? parseFloat(a.attributes.volume) || 0 : 0;
                      const volumeB = b.attributes.volume ? parseFloat(b.attributes.volume) || 0 : 0;
                    
                      const pagesA = a.attributes.pages;
                      const pagesB = b.attributes.pages;
                    
                      return chapterA - chapterB || volumeA - volumeB || pagesA - pagesB;
                    })
                    .filter(data => data.attributes.pages > 0)
                    .reduce((map, current) => {
                      const key = `${current.attributes.chapter}-${current.attributes.volume || '0'}`;
                      map.set(key, current);
                      return map;
                    }, new Map<string, IChapterData>())
                    .values()
                )?.map((data) => {
                  return (
                    <Link key={data.id} to={`../manga/chapter/${data.id}`}>
                      <div className="flex w-60 flex-shrink-0 cursor-pointer py-1 text-neutral-400 hover:bg-stone-700 ">
                        <p className="w-full">
                          Chapter: {data.attributes.chapter} Pages:{" "}
                          {data.attributes.pages}
                        </p>
                      </div>
                    </Link>
                  );
                })
            )}
          </div>
        </div>
      )}
    </>
  );
}
