import { IChapterData } from "../models/chapterList";

export function processChapters(data?: IChapterData[]): IChapterData[] {
    if (!data) return [];
  
    return Array.from(
        data
            .sort((a, b) => {
                const chapterA = parseFloat(a.attributes.chapter) || 0;
                const chapterB = parseFloat(b.attributes.chapter) || 0;
                
                const volumeA = a.attributes.volume ? parseFloat(a.attributes.volume) : 0;
                const volumeB = b.attributes.volume ? parseFloat(b.attributes.volume) : 0;
              
                const pagesA = a.attributes.pages;
                const pagesB = b.attributes.pages;
              
                return chapterA - chapterB || volumeA - volumeB || pagesA - pagesB;
            })
            .filter(data => data.attributes.pages > 0)
            .reduce((map, current) => {
                const key = `${current.attributes.chapter}-${current.attributes.volume || '0'}`;
                return map.set(key, current);
            }, new Map<string, IChapterData>())
            .values()
    );
  }