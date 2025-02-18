import { Link } from "react-router-dom";
import { useLastReadStore } from "../store/lastReadChapter";
import { useCurrentChapter } from "../store/currentChapterStore";

export function ContinueReadingButton({ mangaId }: { mangaId: string }) {
    const { setCurrentChapter } = useCurrentChapter();
    const { lastReadChapters } = useLastReadStore();
    const lastChapterId = lastReadChapters[mangaId];

    return (
        <Link
        to={`../manga/chapter/${lastChapterId}`} state={{ mangaId }}
        onClick={() => setCurrentChapter(lastChapterId)}
        className={`flex text-nowrap py-1 px-2 rounded-full text-primary hover:bg-secondary/60 font-bold`}
        >
        {`Continue Reading >>`}
        </Link>
    );
}