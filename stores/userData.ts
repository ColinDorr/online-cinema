import { defineStore } from 'pinia'

export const useUserDataStore = defineStore('userData', {
  state: () => ({
    user: {}
  }),

  actions: {
    setUserData ( data: {string: any}) {
      this.user = {
        ...this.user
      }
    }
  }
})