interface ICoverObject {
  result: string;
  response: string;
  data: ICoverData;
}

export interface ICoverData {
  id: string;
  type: string;
  attributes: Attributes;
  relationships: Relationship[];
}

interface Relationship {
  id: string;
  type: string;
}

interface Attributes {
  description: string;
  volume?: any;
  fileName: string;
  locale: string;
  createdAt: string;
  updatedAt: string;
  version: number;
}
