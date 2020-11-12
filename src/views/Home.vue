<template>
  <div class="home p-grid">
    <Card class="p-col-6 p-offset-3">
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
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
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
      answer: ''
    }
  },
  computed: {
    ...mapState(['cards'])
  },
  methods: {
    ...mapActions(['createCard']),
    submitNewCardForm () {
      const payload = {
        question: this.question,
        answer: this.answer
      }
      this.createCard(payload)

      this.question = ''
      this.answer = ''
    }
  }
}
</script>
