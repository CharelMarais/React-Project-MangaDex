import { CoverData } from "../models/cover";
import { MangaData } from "../models/manga";

export function getManga(listOrder: string | undefined): Promise<MangaData[]> {
  const response = fetch(
    //rating
    //followedCount
    //createdAt
    //latestUploadedChapter
    `https://api.mangadex.org/manga?order[${listOrder}]=desc&limit=20&includes[]=cover_art&contentRating[]=safe`
    // `https://api.mangadex.org/manga?title=one punch man&limit=20` Search
  )
    .then((res) => res.json())
    .then((res) => res.data);

  return response;
}

export function getCoverById(id: string): Promise<CoverData> {
  const response: Promise<CoverData> = fetch(
    `https://api.mangadex.org/cover/${id}`
  )
    .then((res) => res.json())
    .then((res) => res.data)
    .catch((error) => {
      console.log(error);
    });

  return response;
}
