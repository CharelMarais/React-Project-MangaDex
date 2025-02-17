import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { IChapterStore } from "../models/currentManga";
import { IChapterData } from "../models/chapterList";
import { IMangaData } from "../models/manga";

export const useCurrentChapter = create<IChapterStore>()(
  persist(
    (set, get) => ({
      currentMangaId: null,
      chapters: [],
      currentChapterIndex: -1,
      currentMangaData: null,
      coverFile: null, 

      setChapterList: (mangaId: string, chapters: IChapterData[]) => {
        set({
          currentMangaId: mangaId,
          chapters: chapters,
          currentChapterIndex: -1
        });
      },

      setCurrentMangaData: (mangaData: IMangaData, coverFile: string) => {
        set({
          currentMangaData: mangaData, 
          coverFile: coverFile
        });
      },

      setCurrentChapter: (chapterId: string) => {
        const chapters = get().chapters;
        const index = chapters.findIndex(c => c.id === chapterId);
        if (index >= 0) {
          set({ currentChapterIndex: index });
        } else {
        }
      },

      goToNextChapter: () => {
        const { chapters, currentChapterIndex } = get();
        if (chapters.length === 0) {
          return null;
        }
        if (currentChapterIndex < chapters.length - 1) {
          const newIndex = currentChapterIndex + 1;
          set({ currentChapterIndex: newIndex });
          return chapters[newIndex];
        }
        return null;
      },

      goToPreviousChapter: () => {
        const { chapters, currentChapterIndex } = get();
        if (chapters.length === 0) {
          return null;
        }
        if (currentChapterIndex > 0) {
          const newIndex = currentChapterIndex - 1;
          set({ currentChapterIndex: newIndex });
          return chapters[newIndex];
        }
        return null;
      },

      getCurrentChapter: () => {
        const { chapters, currentChapterIndex } = get();
        return currentChapterIndex >= 0 ? chapters[currentChapterIndex] : null;
      },
      
      hasPreviousChapter: () => {
        const { currentChapterIndex } = get();
        return currentChapterIndex > 0;
      },
    }),
    {
      name: "currentChapterStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);