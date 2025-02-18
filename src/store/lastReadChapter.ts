import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useLastReadStore = create<LastReadStore>()(
  persist(
    (set) => ({
      lastReadChapters: {},
      setLastReadChapterPerManga: (mangaId, chapterId) => 
        set((state) => ({
          lastReadChapters: {
            ...state.lastReadChapters,
            [mangaId]: chapterId
          }
        }))
    }),
    {
      name: "lastReadChaptersStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);