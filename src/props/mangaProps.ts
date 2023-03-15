import { IMangaData } from "../models/manga";

export type IMangaInfoProp = {
  mangaData: IMangaData;
  coverFile: string;
};

export type IMangaChapterFeedProp = {
  mangaId: string;
};
