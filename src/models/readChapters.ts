export interface ReadChaptersStore {
    readChapters: Record<string, string[]>;
    markChapterAsRead: (mangaId: string, chapterId: string) => void;
    isChapterRead: (mangaId: string, chapterId: string) => boolean;
  };