import { IMangaData } from "./manga";

export type IMangaStore = {
  favoriteMangas: IMangaData[];
  addFavoriteManga: (mangaData: IMangaData) => void;
  removeFavoriteManga: (mangaData: IMangaData) => void;
};
