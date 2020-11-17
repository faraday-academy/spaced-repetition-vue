<template>
  <div class="home p-grid">
    <div class="p-col-6 p-offset-3">
      <h1>Decks</h1>
    </div>
    <div class="p-col-6 p-offset-3 p-grid">
      <Card
        v-for="(deck, i) in decks"
        :key="i"
        class="p-col-4"
      >
        <template v-slot:header>
          <router-link :to="`/decks/${i}`"><h2>{{ deck.title }}</h2></router-link>
        </template>
        <template v-slot:content>
          <p>{{ deck.description }}</p>
        </template>
      </Card>
    </div>
    <Card class="p-col-6 p-offset-3">
      <template v-slot:header>
        <h2>Create Deck</h2>
      </template>
      <template v-slot:content>
        <form @submit.prevent="submitNewDeckForm" class="p-fluid">
          <div class="p-field">
            <label for="title">Title</label>
            <InputText
              v-model="title"
              id="title"
              class="p-field"
            />
          </div>

          <div class="p-field">
            <label for="description">Description</label>
            <InputText
              v-model="description"
              id="description"
              class="p-field"
            />
          </div>

          <Button type="submit" label="Add New Deck" />
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
      title: '',
      description: ''
    }
  },
  computed: {
    ...mapState(['decks'])
  },
  methods: {
    ...mapActions(['createDeck']),
    submitNewDeckForm () {
      const payload = {
        title: this.title,
        description: this.description
      }
      this.createDeck(payload)

      this.title = ''
      this.description = ''
    }
  }
}
</script>
