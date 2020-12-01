export default {
  setDecks (state, decks) {
    state.decks = decks
  },
  setDeckCards (state, cards) {
    state.currentDeck.cards = cards
  },
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
}
