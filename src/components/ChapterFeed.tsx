import { useQuery } from "@tanstack/react-query";
import { IChapterData } from "../models/chapterList";
import { IMangaChapterFeedProp } from "../props/mangaProps";
import { getChapterFeedById } from "../services/apicalls";

export function ChapterFeed({ mangaId }: IMangaChapterFeedProp) {
  const { data, isLoading, isSuccess } = useQuery<IChapterData[], Error>(
    [`chapterFeedQuery`, mangaId],
    () => getChapterFeedById(mangaId)
  );

  return (
    <div className=" bg-stone-800 rounded-3xl flex flex-col p-6 m-6 overflow-hidden">
      <h1 className="text-amber-500 pb-4">Available Chapters</h1>
      {data
        ?.sort((a, b) => {
          return (
            (Number(a.attributes.chapter) ||
              Number(a.attributes.chapter.replaceAll(".", ""))) -
            (Number(b.attributes.chapter) ||
              Number(b.attributes.chapter.replaceAll(".", "")))
          );
        })
        .map((data) => {
          return (
            <p
              key={data.id}
              className="cursor-pointer text-neutral-400 hover:bg-stone-700"
            >
              Chapter: {data.attributes.chapter} Pages: {data.attributes.pages}
            </p>
          );
        })}
    </div>
  );
}
