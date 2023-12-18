import router from '@/router'
import { getExerciseData } from '@/data'
import userData from '@/store/userData'
import { getExerciseUserData, type ExerciseUserData } from '@/components/userDataUtils'
import { answeredCorrect, setNextSentence } from './dataControls/dataControls'
import * as speech from './speech/speechControls'
import * as state from './exerciseState'

let currentExerciseData: string[]
let currentExerciseUserData: ExerciseUserData

export const vFocus = { mounted: (el: HTMLInputElement) => el.focus() }

export function setupExercise(category: string | string[], exercise: string | string[]) {
  state.exerciseName.value = `${category}/${exercise}`
  if (typeof category === 'string' && typeof exercise === 'string') {
    const exerciseData = getExerciseData(category, exercise)
    if (exerciseData) {
      currentExerciseData = exerciseData
      currentExerciseUserData = getExerciseUserData(exercise, userData)
      state.isExerciseCompleted.value = false
      resetSentence()
      return
    }
  }
  alert(`Exercise ${state.exerciseName.value} does not exist`)
  router.push({ name: 'home' })
}

function resetSentence() {
  state.isNewSentence.value = true
  state.userInput.value = ''
  state.resultsDisplay.value = 'Submit your answer'
  state.isAnswerSubmitted.value = false
}

function submitAnswer() {
  speech.stopText()
  const currentSentence = currentExerciseData[currentExerciseUserData.current]
  const isAnswerCorrect = state.userInput.value === currentSentence

  state.isAnswerSubmitted.value = true
  if (isAnswerCorrect) {
    state.resultsDisplay.value = `Correct: ${currentSentence}`
    state.isExerciseCompleted.value = answeredCorrect(
      currentExerciseUserData,
      currentExerciseData.length,
    )
  } else {
    state.resultsDisplay.value = `Wrong: ${currentSentence}`
    setNextSentence(currentExerciseUserData, currentExerciseData.length)
  }
}

export function playPauseButton() {
  if (state.isAnswerSubmitted.value) return
  if (state.isNewSentence.value) {
    speech.playTextWithPreview(currentExerciseData[currentExerciseUserData.current])
    state.isNewSentence.value = false
  } else {
    speech.playPauseText(currentExerciseData[currentExerciseUserData.current])
  }
}

export function submitButton() {
  if (state.isExerciseCompleted.value) router.push({ name: 'completed' })
  if (state.isAnswerSubmitted.value) resetSentence()
  else if (state.isNewSentence.value) playPauseButton()
  else submitAnswer()
}

export function homeButton() {
  speech.stopText()
  router.push({ name: 'home' })
}
