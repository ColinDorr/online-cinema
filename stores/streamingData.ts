import { defineStore } from "pinia";
import type { Movie, Serie, Person } from "@/types/globals";

export const useStreamingDataStore = defineStore("streamingData", {
  state: () => ({
    movies: [] as Movie[],
    series: [] as Serie[],
    people: [] as Person[],
    bearerToken: "" as string,
  }),

  actions: {
    setBearerToken(token: string) {
      this.bearerToken = token;
    },

    mergeAndSort<T>(
      existing: T[],
      incoming: T[] | undefined,
      keyFn: (item: T) => number,
      sortFn: (a: T, b: T) => number,
    ): T[] {
      const safeIncoming = Array.isArray(incoming) ? incoming : [];
      const map = new Map<number, T>();
      existing.forEach((item) => map.set(keyFn(item), item));
      safeIncoming.forEach((item) => map.set(keyFn(item), item));
      return Array.from(map.values()).sort(sortFn);
    },

    setMovies(data: Movie[] = []) {
      this.movies = this.mergeAndSort(
        this.movies,
        data,
        (movie) => movie.id,
        (a, b) =>
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(),
      );
    },

    setSeries(data: Serie[]) {
      this.series = this.mergeAndSort(
        this.series,
        data,
        (serie) => serie.id,
        (a, b) =>
          new Date(b.lastUpdated).getTime() - new Date(a.lastUpdated).getTime(),
      );
    },

    setPeople(data: Person[]) {
      this.people = this.mergeAndSort(
        this.people,
        data,
        (person) => person.id,
        (a, b) => (a.name ?? "").localeCompare(b.name ?? ""),
      );
    },

    getMovieById(id: number): Movie | null {
      return this.movies.find((movie) => movie.id === id)?.[0] || null;
    },
    getSerieById(id: number): Serie | undefined {
      return this.series.find((serie) => serie.id === id)?.[0] || null;
    },
    getPersonById(id: number): Person | undefined {
      return this.people.find((person) => person.id === id)?.[0] || null;
    },
  },
});
