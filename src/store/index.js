import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'

import actions from './actions'
import mutations from './mutations'

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
})

// buckets: 1, 2, 3, 4, 5

// CARD:
// {
//   deckId:
//   question:
//   answer:
//   bucket:
//   nextReviewDate:
//   lastReviewed:
//   createdAt:
//   updatedAt:
// }

// DECK:
// {
//   title:
//   description:
//   lastReviewed:
//   createdAt:
//   updatedAt:
// }

export default createStore({
  state: {
    currentDeck: {
      deck: {},
      cards: []
    },
    decks: [],
    bucketDays: [1, 3, 7, 16, 30]
  },
  getters: {
    getDeck: (state) => (id) => {
      return state.decks.find((deck, index) => {
        return index === id
      })
    },
    getCardsForDeck: (state) => (deckId) => {
      return state.cards.filter((card) => {
        return card.deckId === deckId
      })
    }
  },
  mutations,
  actions,
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
