<script setup lang="ts">
import SpeechSettingModal from '../speech/SpeechSettingsModal.vue'
import type { ExerciseControls } from './useExerciseControls'
import type { ExerciseState } from '../createExerciseState'

defineProps<{
  controls: ExerciseControls
  state: ExerciseState
  stopText: () => void
}>()
</script>

<template>
  <div>
    <button
      @click="controls.submitButton()"
      :class="{ highlighted: state.isNewSentence || state.isExerciseCompleted }"
      type="button"
    >
      {{ controls.submitButtonText.value }} <span>"Enter"</span>
    </button>
    <button @click="controls.playPauseButton()" type="button" :disabled="state.isAnswerSubmitted">
      {{ controls.playPauseButtonText.value }} <span>"Tab"</span>
    </button>
    <button @click="stopText()" type="button">Stop <span>"Esc"</span></button>
    <SpeechSettingModal />
  </div>
</template>
<style scoped>
div {
  display: flex;
  flex-direction: column;
}

button {
  display: flex;
  justify-content: space-around;
}

.highlighted {
  border-color: var(--highlight-color);
  color: var(--highlight-color);
  background-color: var(--highlight-background);
}
</style>
