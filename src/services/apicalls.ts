import { IChapter } from "../models/chapter";
import { IChapterData } from "../models/chapterList";
import { ICoverData } from "../models/cover";
import { IMangaData } from "../models/manga";

export function getManga(listOrder: string | undefined): Promise<IMangaData[]> {
  const response = fetch(
    `https://api.mangadex.org/manga?order[${listOrder}]=desc&limit=20&includes[]=cover_art&contentRating[]=safe`
  )
    .then((res) => res.json())
    .then((res) => res.data);

  return response;
}
export function getMangaSearchResults(
  searchValue: string | undefined
): Promise<IMangaData[]> {
  const response = fetch(
    `https://api.mangadex.org/manga?title=${searchValue}&limit=20&includes[]=cover_art&contentRating[]=safe`
  )
    .then((res) => res.json())
    .then((res) => res.data);

  return response;
}

export function getCoverById(id: string): Promise<ICoverData> {
  const response: Promise<ICoverData> = fetch(
    `https://api.mangadex.org/cover/${id}`
  )
    .then((res) => res.json())
    .then((res) => res.data);

  return response;
}

export function getChapterFeedById(mangaId: string): Promise<IChapterData[]> {
  const response = fetch(
    `https://api.mangadex.org/manga/${mangaId}/feed?translatedLanguage[]=en&limit=500`
  )
    .then((res) => res.json())
    .then((res) => res.data);

  return response;
}

export function getChapterImagesById(
  chapterId: string | undefined
): Promise<IChapter> {
  const response = fetch(`https://api.mangadex.org/at-home/server/${chapterId}`)
    .then((res) => res.json())
    .then((res) => res.chapter);

  return response;
}
