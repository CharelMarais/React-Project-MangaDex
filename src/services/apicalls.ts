import { CoverData } from "../models/cover";
import { MangaData } from "../models/manga";

export function getManga(): Promise<MangaData[]> {
  const response = fetch(
    `https://api.mangadex.org/manga?limit=20&includes[]=cover_art`
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
