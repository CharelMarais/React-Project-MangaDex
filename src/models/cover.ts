interface CoverObject {
  result: string;
  response: string;
  data: CoverData;
}

export interface CoverData {
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
