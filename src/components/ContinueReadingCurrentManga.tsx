import { Link, useMatch } from "react-router-dom";
import { useLastReadStore } from "../store/lastReadChapter";
import { useCurrentChapter } from "../store/currentChapterStore";

export function ContinueReadingButton({ mangaId }: { mangaId: string }) {
    const { setCurrentChapter } = useCurrentChapter();
    const { lastReadChapters, lastReadChapterId } = useLastReadStore();
    const lastChapterId = mangaId ? lastReadChapters[mangaId] : lastReadChapterId;
    const isHomePage = useMatch("/");
    
    const shouldShow = isHomePage 
        ? !!lastChapterId 
        : !!(mangaId && lastChapterId); 

    if (!shouldShow) return null;

    return (
        <div className="m-2">
          <div className="absolute bottom-1 right-1 text-sm">
            <Link
              to={`../manga/chapter/${lastChapterId}`} 
              state={{ mangaId }}
              onClick={() => setCurrentChapter(lastChapterId)}
              className="flex text-nowrap py-1 px-2 rounded-full text-primary hover:bg-secondary/60 font-bold"
            >
              {`Continue Reading >>`}
            </Link>
          </div>
        </div>
    );
}