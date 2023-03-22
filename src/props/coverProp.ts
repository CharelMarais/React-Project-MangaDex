import { IMangaData } from "../models/manga";

export type IMangaCardProp = {
  managId: string;
  coverId: string;
  title: string;
  contentRating: string;
  mangaData: IMangaData;
  className?: string;
};
