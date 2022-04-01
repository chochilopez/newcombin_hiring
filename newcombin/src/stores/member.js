import { defineStore } from 'pinia'
import axios from 'axios'

export const useMemberStore = defineStore('member', {
  state: () => ({
    member: null,
    members: null
  }),

  getters: {
  },

  actions: {
    getMembers (token) {
      return new Promise((resolve, reject) => {
        axios
          .get('http://localhost:8081/api/members', {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
          .then((result) => {
            resolve(result)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    saveMember (token, member) {
      return new Promise((resolve, reject) => {
        axios
          .post('http://localhost:8081/api/members', member, {
            headers: {
              Authorization: 'Bearer ' + token
            }
          })
          .then((result) => {
            resolve(result)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },
    setMember (member) {
      this.member = member
    },
    setMembers (members) {
      this.members = members
    }
  }
})
