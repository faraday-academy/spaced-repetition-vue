<template>
  <div class="cards p-grid">
    <Card class="p-col-6 p-offset-3">
      <template v-slot:header>
        <h2>Study Card</h2>
      </template>
      <template v-slot:content>
        <h3>
          {{ cards[currentCardIndex].question }}
        </h3>
        <hr>
        <h3 v-if="isFlipped">
          {{ cards[currentCardIndex].answer }}
        </h3>
      </template>
      <template v-slot:footer>
        <Button
          v-if="!isFlipped"
          @click="flipCard"
          label="Show Answer"
        />

        <span v-else class="p-buttonset">
          <Button
            label="Easy"
            class="p-button-success"
          />
          <Button
            label="Medium"
            class="p-button-warning"
          />
          <Button
            label="Hard"
            class="p-button-danger"
          />
        </span>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Card from 'primevue/card'
import Button from 'primevue/button'

export default {
  components: {
    Card,
    Button
  },
  data () {
    return {
      currentCardIndex: 0,
      isFlipped: false
    }
  },
  computed: {
    ...mapState(['cards'])
  },
  methods: {
    flipCard () {
      this.isFlipped = !this.isFlipped
    },
    completeCard () {
      // update bucket number
      // move to next card
      // if no next card, should show completed screen
    }
  }
}
</script>
