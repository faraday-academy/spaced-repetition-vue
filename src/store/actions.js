import { DateTime } from 'luxon'
import axios from 'axios'

const API_URL = 'http://localhost:8000'

export default {
  async getDecks ({ commit }) {
    const res = await axios.get(`${API_URL}/decks`)
    commit('setDecks', res.data)
  },
  async getDeckCards ({ commit }, deckId) {
    const res = await axios.get(`${API_URL}/decks/${deckId}/cards`)
    commit('setDeckCards', res.data)
  },
  async getTodaysDeckCards ({ commit }, deckId) {
    const res = await axios.get(`${API_URL}/decks/${deckId}/todays-cards`)
    commit('setDeckCards', res.data)
  },
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
}
