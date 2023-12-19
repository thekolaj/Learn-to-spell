<script setup lang="ts">
import { watch } from 'vue'
import { useRoute } from 'vue-router'
import SpeechSettingModal from './speech/SpeechSettingsModal.vue'
import { stopText } from './speech/speechControls'
import {
  homeButton,
  submitButton,
  playPauseButton,
  setupExercise,
  vFocus,
  exercisesCompleted,
  exerciseName,
  userInput,
  isAnswerSubmitted,
  resultsDisplay,
  submitButtonText,
  playPauseButtonText,
} from './exerciseControls'

const route = useRoute()

watch(
  () => route.params.exercise,
  () => {
    const { category, exercise } = route.params
    setupExercise(category, exercise)
  },
  { immediate: true },
)
</script>

<template>
  <div
    class="container"
    @keydown.enter.prevent="submitButton()"
    @keydown.tab.prevent="playPauseButton()"
    @keydown.esc.prevent="stopText()"
    tabindex="-1"
  >
    <div class="title">
      <h2>Exercise: {{ exerciseName }} {{ exercisesCompleted }}</h2>
      <button @click="homeButton()" type="button">Home</button>
    </div>
    <textarea
      ref="userInputElement"
      v-model="userInput"
      :class="{ disabled: isAnswerSubmitted }"
      :readonly="isAnswerSubmitted"
      v-focus
      id="text"
      cols="50"
      rows="5"
      autocomplete="off"
      autocorrect="off"
      autocapitalize="off"
      spellcheck="false"
      aria-label="text input"
      placeholder="Write what you hear."
    ></textarea>
    <p>{{ resultsDisplay }}</p>
    <div class="controls">
      <button @click="submitButton()" type="button">
        {{ submitButtonText }} <span>"Enter"</span>
      </button>
      <button @click="playPauseButton()" type="button" :disabled="isAnswerSubmitted">
        {{ playPauseButtonText }} <span>"Tab"</span>
      </button>
      <button @click="stopText()" type="button">Stop <span>"Esc"</span></button>
      <SpeechSettingModal />
    </div>
  </div>
</template>

<style scoped>
.title {
  width: 100%;
  display: flex;
  justify-content: space-between;
}

.controls {
  display: flex;
  flex-direction: column;
}

.controls > button {
  display: flex;
  justify-content: space-around;
}
</style>
