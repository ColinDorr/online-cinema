export type Movie = {
  aliases: string[];
  id: number;
  image: string;
  lastUpdated: string;
  name: string;
  nameTranslations: string[];
  overviewTranslations: string[];
  runtime: number;
  score: number;
  slug: string;
  status: {
    id: number;
    name: string;
    recordType: string;
    keepUpdated: boolean;
  };
  year: string;
  [key: string]: any
}

export type Serie = {
  id: number;
  name: string;
  slug: string;
  image: string;
  nameTranslations: string[];
  overviewTranslations: string[];
  aliases: string[];
  firstAired: string;
  lastAired: string;
  nextAired: string;
  score: number;
  status: {
    id: number | null;
    name: string | null;
    recordType: string;
    keepUpdated: boolean;
  };
  originalCountry: string;
  originalLanguage: string;
  defaultSeasonType: number;
  isOrderRandomized: boolean;
  lastUpdated: string;
  averageRuntime: number;
  episodes: number | null;
  overview: string;
  year: string;
  [key: string]: any
}

export type Person = {
  id: number;
  name: string;
  image: string;
  score: number;
  nameTranslations: string[] | null;
  overviewTranslations: string[] | null;
  aliases: string[] | null;
  lastUpdated: string;
  [key: string]: any
}