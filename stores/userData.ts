import { defineStore } from 'pinia'

export const useUserDataStore = defineStore('userData', {
  state: () => ({
    user: {
      icon: undefined,
      list: {
        movies: []as number[],
        series: [] as number[],
      }
    }
  }),

  actions: {
    setUserData (data: { [key: string]: any }) {
      this.user = {
        ...this.user,
        ...data
      }
    },
    getListIndex (path: "movies" | "series", id: number) {
      const list = this.user.list[path];
      const index = list.indexOf(id);
      return index;
    },
    toggleListItem (path: "movies" | "series", id: number) {
      const list = this.user.list[path];
      const index = this.getListIndex(path, id);
      if (index !== -1) {
        this.user.list[path] = list.filter(item => item !== id);
      } else {
        this.user.list[path] = [...list, id];
      }
    }
  }
})