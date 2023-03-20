import { create } from "zustand";
import { IMangaData } from "../models/manga";
import { persist, createJSONStorage } from "zustand/middleware";
import { IMangaStore } from "../models/favoriteManga";

export const useMangaFavouriteStore = create<IMangaStore>()(
  persist(
    (set, get) => ({
      favouriteMangas: [],
      addFavouriteManga: (mangaData: IMangaData) =>
        set({
          favouriteMangas: get().favouriteMangas.includes(mangaData)
            ? get().favouriteMangas
            : [...get().favouriteMangas, mangaData],
        }),
      removeFavouriteManga: (mangaData: IMangaData) =>
        set({
          favouriteMangas: get().favouriteMangas.filter(
            (favourite: IMangaData) => favourite !== mangaData
          ),
        }),
    }),
    {
      name: "favouriteMangaStorage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
