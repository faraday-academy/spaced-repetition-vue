import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { DateTime } from 'luxon'

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
    cards: [],
    bucketDays: [1, 3, 7, 16, 30]
  },
  mutations: {
    appendCard (state, card) {
      state.cards.push(card)
    },
    mutateCard (state, card) {
      const { cardIndex, cardDetails } = card
      state.cards[cardIndex] = {
        ...state.cards[cardIndex],
        ...cardDetails
      }
    }
  },
  actions: {
    createCard ({ commit }, { question, answer }) {
      const now = DateTime.local().toISO()
      const card = {
        question,
        answer,
        bucket: 1,
        nextReviewDate: now,
        lastReviewed: 0,
        createdAt: now,
        updatedAt: now
      }
      commit('appendCard', card)
    },
    updateCard ({ commit }, payload) {
      // payload = {cardId, cardDetails: {}}
      commit('mutateCard', payload)
    },
    deleteCard () {

    }
  },
  modules: {
  },
  plugins: [vuexLocal.plugin]
})
