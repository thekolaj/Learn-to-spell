import { ref, computed } from 'vue'
import { playing } from './speech/speechControls'

export const exerciseName = ref('')
export const isNewSentence = ref(true)
export const isAnswerSubmitted = ref(false)
export const isExerciseCompleted = ref(false)
export const userInput = ref('')
export const resultsDisplay = ref('')

export const playPauseButtonText = computed(() => {
  return playing.value ? 'Pause' : 'Play'
})

export const submitButtonText = computed(() => {
  if (isExerciseCompleted.value) return 'Finish'
  if (isAnswerSubmitted.value) return 'Next'
  if (isNewSentence.value) return 'Start'
  return 'Submit'
})
