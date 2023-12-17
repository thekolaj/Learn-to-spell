<script setup lang="ts">
import { ref, watchEffect, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getExerciseData } from '@/data'
import userData from '@/store/userData'
import { getExerciseUserData, type ExerciseUserData } from '@/components/userDataUtils'
import * as speechControls from './speech/speechControls'
import SpeechSettingModal from './speech/SpeechSettingsModal.vue'
import { answeredCorrect, setNextSentence } from './exerciseControls/dataControls'

const route = useRoute()
const router = useRouter()
const isAnswerSubmitted = ref(false)
const isExerciseCompleted = ref(false)
const userInput = ref('')
const resultsDisplay = ref('')
let currentExerciseData: string[]
let currentExerciseUserData: ExerciseUserData

watchEffect(() => {
  const { category, exercise } = route.params
  resetTest()
  isExerciseCompleted.value = false
  if (typeof category !== 'string' || typeof exercise !== 'string') return
  currentExerciseData = getExerciseData(category, exercise)
  currentExerciseUserData = getExerciseUserData(exercise, userData)
})

function playPauseButton() {
  if (isAnswerSubmitted.value) return
  speechControls.playPauseText(currentExerciseData[currentExerciseUserData.current])
}

const playPauseButtonText = computed(() => {
  return speechControls.playing.value ? 'Pause' : 'Play'
})

function submitAnswer() {
  speechControls.stopText()
  const currentSentence = currentExerciseData[currentExerciseUserData.current]
  const isAnswerCorrect = userInput.value === currentSentence

  isAnswerSubmitted.value = true
  if (isAnswerCorrect) {
    resultsDisplay.value = `Correct: ${currentSentence}`
    isExerciseCompleted.value = answeredCorrect(currentExerciseUserData, currentExerciseData.length)
  } else {
    resultsDisplay.value = `Wrong: ${currentSentence}`
    setNextSentence(currentExerciseUserData, currentExerciseData.length)
  }
}

function resetTest() {
  speechControls.playPreview.value = true
  userInput.value = ''
  resultsDisplay.value = 'Submit your answer'
  isAnswerSubmitted.value = false
}

function submitButton() {
  // TODO: add ExerciseCompleted test
  if (isAnswerSubmitted.value) resetTest()
  else if (speechControls.playPreview.value) playPauseButton()
  else submitAnswer()
}

const submitButtonText = computed(() => {
  if (isAnswerSubmitted.value) return 'Next'
  if (speechControls.playPreview.value) return 'Start'
  return 'Submit'
})

function homeButton() {
  speechControls.stopText()
  router.push({ name: 'home' })
}
</script>

<template>
  <div
    class="container"
    @keydown.enter.prevent="submitButton()"
    @keydown.tab.prevent="playPauseButton()"
    @keydown.esc.prevent="speechControls.stopText()"
    tabindex="-1"
  >
    <button @click="homeButton()" type="button">Home</button>
    <label for="text">Text Input:</label>
    <textarea
      v-model="userInput"
      :disabled="isAnswerSubmitted"
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
    <button @click="speechControls.stopText()" type="button">Stop "Esc"</button>
    <SpeechSettingModal />

    <p>{{ speechControls.playing.value ? 'Speech Playing' : 'Speech Stopped' }}</p>
  </div>
</template>
