interface LastReadStore {
    lastReadChapters: Record<string, string>;
    setLastReadChapterPerManga: (mangaId: string, chapterId: string) => void;
}