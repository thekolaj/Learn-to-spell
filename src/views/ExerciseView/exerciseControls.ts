import { ref, computed } from 'vue'
import router from '@/router'
import { getExerciseData } from '@/data'
import userData from '@/store/userData'
import { getExerciseUserData, type ExerciseUserData } from '@/components/userDataUtils'
import { answeredCorrect, setNextSentence } from './dataControls/dataControls'
import * as speech from './speech/speechControls'

let currentExerciseData: string[]
let currentExerciseUserData: ExerciseUserData

const completedList = ref<number[]>([])
const isExerciseCompleted = ref(false)
const isNewSentence = ref(true)

export const exerciseName = ref('')
export const isAnswerSubmitted = ref(false)
export const userInput = ref('')
export const resultsDisplay = ref('')

export const playPauseButtonText = computed(() => {
  return speech.playing.value ? 'Pause' : 'Play'
})

export const submitButtonText = computed(() => {
  if (isExerciseCompleted.value) return 'Finish'
  if (isAnswerSubmitted.value) return 'Next'
  if (isNewSentence.value) return 'Start'
  return 'Submit'
})

export const exercisesCompleted = computed(() => {
  return `${completedList.value.length}/${currentExerciseData.length}`
})

export const vFocus = { mounted: (el: HTMLInputElement) => el.focus() }

export function setupExercise(category: string | string[], exercise: string | string[]) {
  exerciseName.value = String(exercise)
  if (typeof category === 'string' && typeof exercise === 'string') {
    const exerciseData = getExerciseData(category, exercise)
    if (exerciseData) {
      currentExerciseData = exerciseData
      currentExerciseUserData = getExerciseUserData(exercise, userData)
      completedList.value = currentExerciseUserData.done
      isExerciseCompleted.value = false
      resetSentence()
      return
    }
  }
  alert(`Exercise ${exerciseName.value} does not exist`)
  router.push({ name: 'home' })
}

function resetSentence() {
  isNewSentence.value = true
  userInput.value = ''
  resultsDisplay.value = 'Submit your answer'
  isAnswerSubmitted.value = false
}

function submitAnswer() {
  speech.stopText()
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

export function playPauseButton() {
  if (isAnswerSubmitted.value) return
  if (isNewSentence.value) {
    speech.playTextWithPreview(currentExerciseData[currentExerciseUserData.current])
    isNewSentence.value = false
  } else {
    speech.playPauseText(currentExerciseData[currentExerciseUserData.current])
  }
}

export function submitButton() {
  if (isExerciseCompleted.value) router.push({ name: 'completed' })
  if (isAnswerSubmitted.value) resetSentence()
  else if (isNewSentence.value) playPauseButton()
  else submitAnswer()
}

export function homeButton() {
  speech.stopText()
  router.push({ name: 'home' })
}
