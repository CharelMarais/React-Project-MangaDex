import { MangaData } from "../models/manga";

export type IMangaCardProp = {
  managId: string;
  coverId: string;
  title: string;
  contentRating: string;
  mangaData: MangaData;
  className?: string;
};
