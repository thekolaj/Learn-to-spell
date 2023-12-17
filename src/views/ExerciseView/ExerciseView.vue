<script setup lang="ts">
import { ref, watchEffect } from 'vue'
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
  speechControls.playPauseText(currentExerciseData[currentExerciseUserData.current])
}

function submitAnswer() {
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
  speechControls.stopText()
  // TODO: add ExerciseCompleted test
  if (isAnswerSubmitted.value) resetTest()
  else if (speechControls.playPreview.value) playPauseButton()
  else submitAnswer()
}

function homeButton() {
  speechControls.stopText()
  router.push({ name: 'home' })
}
</script>

<template>
  <button @click="homeButton()" type="button">Home</button>
  <label for="text">Text Input:</label>
  <textarea
    @keydown.enter.prevent="submitButton()"
    @keydown.tab.prevent="playPauseButton()"
    v-model="userInput"
    id="text"
    cols="50"
    rows="5"
    autocomplete="off"
    autocorrect="off"
    autocapitalize="off"
    spellcheck="false"
  ></textarea>
  <p>{{ resultsDisplay }}</p>

  <div>
    <button @click="submitButton()" type="button">Submit</button>
    <button @click="playPauseButton()" type="button">Play</button>
    <button @click="speechControls.stopText()" type="button">Stop</button>
    <SpeechSettingModal />
    <p>{{ speechControls.playing }}</p>
  </div>
</template>
