import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { LastReadStore } from "../models/lastRead";

export const useLastReadStore = create<LastReadStore>()(
  persist(
    (set) => ({
      lastReadChapters: {},
      lastMangaReadId: '',
      lastReadChapterId: '',
      setLastReadChapter: (mangaId, chapterId) => 
        set((state) => ({
          lastReadChapters: {
            ...state.lastReadChapters,
            [mangaId]: chapterId
          },
          lastReadMangaId: mangaId,
          lastReadChapterId: chapterId
        }))
    }),
    {
      name: "lastReadChaptersStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);