import { IMangaData } from "./manga";

export type IMangaStore = {
  favouriteMangas: IMangaData[];
  addFavouriteManga: (mangaData: IMangaData) => void;
  removeFavouriteManga: (mangaData: IMangaData) => void;
};
