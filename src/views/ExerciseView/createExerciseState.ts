import type { ExerciseUserData } from '@/store/userDataUtils'

function createExerciseState(
  name: string,
  exerciseData: string[],
  exerciseUserData: ExerciseUserData,
) {
  return {
    exerciseData,
    exerciseUserData,
    exerciseName: name,
    isExerciseCompleted: false,
    isNewSentence: true,
    isAnswerSubmitted: false,
    userInput: '',
    resultsDisplay: 'Submit your answer',

    resetSentence() {
      this.isNewSentence = true
      this.isAnswerSubmitted = false
      this.userInput = ''
      this.resultsDisplay = 'Submit your answer'
    },
  }
}

export default createExerciseState
export type ExerciseState = ReturnType<typeof createExerciseState>
