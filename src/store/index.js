import { createStore } from 'vuex'
import VuexPersistence from 'vuex-persist'
import { DateTime } from 'luxon'

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
    cards: [],
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
  mutations: {
    appendDeck (state, deck) {
      state.decks.push(deck)
    },
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
    createDeck ({ commit }, { title, description }) {
      const now = DateTime.local().toISO()
      const deck = {
        title,
        description,
        bucket: 1,
        lastReviewed: 0,
        createdAt: now,
        updatedAt: now
      }
      commit('appendDeck', deck)
    },
    createCard ({ commit }, { question, answer, deckId }) {
      const now = DateTime.local().toISO()
      const card = {
        deckId,
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
