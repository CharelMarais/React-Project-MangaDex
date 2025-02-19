export interface LastReadStore {
    lastReadChapters: Record<string, string>;
    lastMangaReadId: string,
    lastReadChapterId: string
    setLastReadChapter: (mangaId: string, chapterId: string) => void;
}