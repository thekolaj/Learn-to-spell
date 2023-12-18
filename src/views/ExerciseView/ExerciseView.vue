<script setup lang="ts">
import { watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import SpeechSettingModal from './speech/SpeechSettingsModal.vue'
import { stopText } from './speech/speechControls'
import {
  homeButton,
  submitButton,
  playPauseButton,
  setupExercise,
  vFocus,
} from './exerciseControls'
import {
  userInput,
  isAnswerSubmitted,
  resultsDisplay,
  submitButtonText,
  playPauseButtonText,
} from './exerciseState'

const route = useRoute()

watchEffect(() => {
  const { category, exercise } = route.params
  setupExercise(category, exercise)
})
</script>

<template>
  <div
    class="container"
    @keydown.enter.prevent="submitButton()"
    @keydown.tab.prevent="playPauseButton()"
    @keydown.esc.prevent="stopText()"
    tabindex="-1"
  >
    <button @click="homeButton()" type="button">Home</button>
    <label for="text">Text Input:</label>
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
    ></textarea>
    <p>{{ resultsDisplay }}</p>

    <button @click="submitButton()" type="button">{{ submitButtonText }} "Enter"</button>
    <button @click="playPauseButton()" type="button" :disabled="isAnswerSubmitted">
      {{ playPauseButtonText }} "Tab"
    </button>
    <button @click="stopText()" type="button">Stop "Esc"</button>
    <SpeechSettingModal />
  </div>
</template>
