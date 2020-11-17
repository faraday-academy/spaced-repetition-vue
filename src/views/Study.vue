<template>
  <div class="cards p-grid">
    <Card v-if="!isCompleted" class="p-col-6 p-offset-3">
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
            @click="completeCard(1)"
            label="Easy"
            class="p-button-success"
          />
          <Button
            @click="completeCard(0)"
            label="Medium"
            class="p-button-warning"
          />
          <Button
            @click="completeCard(-1)"
            label="Hard"
            class="p-button-danger"
          />
        </span>
      </template>
    </Card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { DateTime } from 'luxon'

export default {
  components: {
    Card,
    Button
  },
  data () {
    return {
      currentCardIndex: 0,
      isFlipped: false,
      isCompleted: false
    }
  },
  computed: {
    ...mapState(['cards', 'bucketDays'])
  },
  methods: {
    ...mapActions(['updateCard']),
    flipCard () {
      this.isFlipped = !this.isFlipped
    },
    completeCard (difficulty) {
      // update bucket number
      const card = { ...this.cards[this.currentCardIndex] }
      let bucket = card.bucket + difficulty

      if (bucket < 1) {
        bucket = 1
      } else if (bucket > 5) {
        bucket = 5
      }

      // update card details in Vuex

      const now = DateTime.local()
      const next = now.plus({ days: this.bucketDays[bucket - 1] })
      const payload = {
        cardIndex: this.currentCardIndex,
        cardDetails: {
          bucket,
          nextReviewDate: next.toISO(),
          lastReviewed: now.toISO()
        }
      }
      this.updateCard(payload)

      // if no next card, should show completed screen
      if (this.currentCardIndex >= this.cards.length) {
        this.isCompleted = true
      } else {
        // move to next card
        this.isFlipped = false
        this.currentCardIndex += 1
      }
    }
  }
}
</script>
