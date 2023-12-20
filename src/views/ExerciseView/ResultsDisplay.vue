<script setup lang="ts">
import type { Change } from 'diff'

defineProps<{
  submitted: boolean
  correct: boolean
  results: Change[]
}>()
</script>

<template>
  <div v-if="!submitted">Submit your answer.</div>
  <div v-else-if="correct">
    <span class="correct">Correct: {{ results[0].value }}</span>
  </div>
  <div v-else>
    <span class="wrong">Wrong:</span>&nbsp;
    <span
      v-for="result in results"
      :key="result.value"
      :class="{ correct: result.removed, wrong: result.added }"
      >{{ result.value }}</span
    >
  </div>
</template>

<style scoped>
div {
  margin: 1rem;
  white-space: pre-wrap;
}

span {
  padding: 2px;
  border-radius: 0.5rem;
}

.correct {
  background-color: var(--primary-good);
}

.wrong {
  background-color: var(--primary-highlight);
}
</style>
