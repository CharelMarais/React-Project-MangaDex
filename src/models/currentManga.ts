import { IChapterData } from "./chapterList";
import { IMangaData } from "./manga";

export interface IChapterStore {
  currentMangaId: string | null;
  chapters: IChapterData[];
  currentChapterIndex: number;
  currentMangaData: IMangaData | null;
  coverFile: string | null;
  setChapterList: (mangaId: string, chapters: IChapterData[]) => void; 
  setCurrentMangaData: (mangaData: IMangaData, coverFile: string) => void; 
  setCurrentChapter: (chapterId: string) => void;
  goToNextChapter: () => IChapterData | null;
  goToPreviousChapter: () => IChapterData | null;
  getCurrentChapter: () => IChapterData | null;
}