import type { ExerciseUserData } from '@/store/userDataUtils'
import type { Change } from 'diff'

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
    isAnswerCorrect: false,
    userInput: '',
    diffResults: <Change[]>[],

    resetSentence() {
      this.isNewSentence = true
      this.isAnswerSubmitted = false
      this.userInput = ''
    },
  }
}

export default createExerciseState
export type ExerciseState = ReturnType<typeof createExerciseState>
