import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

// buckets: 1, 2, 3, 4, 5

// {
//   question:
//   answer:
//   bucket:
//   nextReviewDate:
//   lastReviewed:
//   createdAt:
//   updatedAt:
// }

export default createStore({
  state: {
    cards: []
  },
  mutations: {
    appendCard (state, card) {
      console.log('mutation', card)
      state.cards.push(card)
    }
  },
  actions: {
    createCard ({ commit }, card) {
      console.log('actions', card)
      commit('appendCard', card)
    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
