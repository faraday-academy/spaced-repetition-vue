<template>
  <div class="home p-grid">
    <div class="p-col-6 p-offset-3">
      <h1>{{ deck.title }} Deck</h1>
      <Card class="">
        <template v-slot:header>
          <h2>Create Card</h2>
        </template>
        <template v-slot:content>
          <form @submit.prevent="submitNewCardForm" class="p-fluid">
          <div class="p-field">
              <label for="question">Question</label>
              <InputText
              v-model="question"
              id="question"
              class="p-field"
              />
          </div>

          <div class="p-field">
            <label for="answer">Answer</label>
            <InputText
              v-model="answer"
              id="answer"
              class="p-field"
            />
          </div>

          <Button type="submit" label="Add New Card" />
          </form>
        </template>
      </Card>

      <Card v-for="(card, i) in cards" :key="i">
        <template v-slot:header>
          <h2>{{ card.question }}</h2>
        </template>
        <template v-slot:content>

        </template>
      </Card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Card from 'primevue/card'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

export default {
  name: 'Home',
  components: {
    Card,
    InputText,
    Button
  },
  data () {
    return {
      question: '',
      answer: '',
      deck: {},
      cards: []
    }
  },
  computed: {
    ...mapGetters(['getDeck', 'getCardsForDeck'])
  },
  methods: {
    ...mapActions(['createCard']),
    submitNewCardForm () {
      const payload = {
        deckId: parseInt(this.$route.params.id),
        question: this.question,
        answer: this.answer
      }
      this.createCard(payload)

      this.question = ''
      this.answer = ''
    }
  },
  mounted () {
    const id = parseInt(this.$route.params.id)
    this.cards = this.getCardsForDeck(id)
    this.deck = this.getDeck(id)
  }
}
</script>
