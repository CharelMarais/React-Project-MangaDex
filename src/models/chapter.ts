export interface IChapterObject {
  result: string;
  baseUrl: string;
  chapter: IChapter;
}

export interface IChapter {
  hash: string;
  data: string[];
  dataSaver: string[];
}
