import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ReadChaptersStore } from "../models/readChapters";

export const useReadChaptersStore = create<ReadChaptersStore>()(
  persist(
    (set, get) => ({
      readChapters: {},
      markChapterAsRead: (mangaId, chapterId) => {
        set((state) => {
          const currentChapters = state.readChapters[mangaId] || [];
          const updatedChapters = new Set(currentChapters).add(chapterId);
          
          if (!currentChapters.includes(chapterId)) {
            return {
              readChapters: {
                ...state.readChapters,
                [mangaId]: [...currentChapters, chapterId]
              }
            };
          }

          return state;
        });
      },
      isChapterRead: (mangaId, chapterId) => {
        const chapters = get().readChapters[mangaId] || [];
        return chapters.includes(chapterId);
      }
    }),
    {
      name: "readChaptersStore",
      storage: createJSONStorage(() => localStorage)
    }
  )
);