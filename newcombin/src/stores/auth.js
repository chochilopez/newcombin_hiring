import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: null
  }),

  getters: {
  },

  actions: {
    actionLogin (user) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:8081/auth', user)
          .then((response) => {
            if (response.status === 200) {
              this.token = response.data
            }
            resolve(response)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    setToken (token) {
      this.token = token
    }
  }
})
