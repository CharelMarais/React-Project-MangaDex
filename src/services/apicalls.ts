import { IChapter } from "../models/chapter";
import { IChapterData } from "../models/chapterList";
import { ICoverData } from "../models/cover";
import { IMangaData } from "../models/manga";

const API_BASE = import.meta.env.PROD 
  ? 'https://us-central1-kame-house-manga.cloudfunctions.net/mangaProxy/api'
  : 'http://localhost:5001/kame-house-manga/us-central1/mangaProxy/api';

interface MangaFetchParams {
  [key: string]: string | number | boolean | string[] | Record<string, string>;
}

async function mangaFetch(endpoint: string, params?: MangaFetchParams): Promise<any> {
  try {
    const url = new URL(`${API_BASE}/${endpoint}`);
    
    if (params) {
      // Convert parameters to URLSearchParams with MangaDex format
      const formattedParams = new URLSearchParams();
      
      Object.entries(params).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          // Handle array parameters like includes[]=cover_art
          value.forEach(v => formattedParams.append(`${key}[]`, v));
        } else if (typeof value === 'object') {
          // Handle nested objects like order[rating]=desc
          Object.entries(value).forEach(([subKey, subValue]) => {
            formattedParams.append(`${key}[${subKey}]`, subValue);
          });
        } else {
          // Handle primitive values
          formattedParams.append(key, String(value));
        }
      });

      url.search = formattedParams.toString();
    }

    const response = await fetch(url.toString(), {
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    });

    const data = await response.json();

    if (!response.ok) {
      const errorMessage = data.errors?.[0]?.detail || `HTTP error! status: ${response.status}`;
      throw new Error(errorMessage);
    }
    
    return data;
  } catch (error: any) {
    console.error('API call failed:', error);
    throw new Error(`Failed to fetch data: ${error.message}`);
  }
}

// Manga Listings
export async function getManga(listOrder: string = "createdAt"): Promise<IMangaData[]> {
  const data = await mangaFetch("manga", {
    order: { [listOrder]: "desc" },
    limit: 20,
    includes: ["cover_art"]
  });
  return data.data;
}

export async function getMangaSearchResults(
  searchValue: string = ""
): Promise<IMangaData[]> {
  const data = await mangaFetch("manga", {
    title: searchValue,
    limit: 20,
    includes: ["cover_art"]
  });
  return data.data;
}

// Cover Art
export async function getCoverById(id: string): Promise<ICoverData> {
  if (!id) throw new Error("Missing cover ID");
  const data = await mangaFetch(`cover/${id}`);
  return data.data;
}

// Chapter Feed
export async function getChapterFeedById(mangaId: string): Promise<IChapterData[]> {
  if (!mangaId) throw new Error("Missing manga ID");
  const data = await mangaFetch(`manga/${mangaId}/feed`, {
    translatedLanguage: ["en"],
    limit: 500,
    order: { chapter: "desc" }
  });
  return data.data;
}

// Chapter Images
export async function getChapterImagesById(
  chapterId: string
): Promise<IChapter> {
  if (!chapterId) throw new Error("Missing chapter ID");
  const data = await mangaFetch(`at-home/server/${chapterId}`);
  return data.chapter;
}