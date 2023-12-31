import { diffWordsWithSpace, type Change } from 'diff'
import {
  getOrCreateExerciseUserData,
  type ExerciseUserData,
  type UserData,
} from '@/store/userDataUtils'
import getExerciseData, { type Data } from '@/data/dataUtils'
import createExerciseState, { type ExerciseState } from '../createExerciseState'

function checkExerciseCompletion(exerciseUserData: ExerciseUserData, exerciseLength: number) {
  return exerciseUserData.done.length >= exerciseLength
}

function resetExercise(exerciseUserData: ExerciseUserData) {
  exerciseUserData.current = 0
  exerciseUserData.win += 1
  exerciseUserData.done = []
}

/** Set current sentence index to the next number that is not in the completed sentences list. */
export function setNextSentence(exerciseUserData: ExerciseUserData, exerciseLength: number) {
  if (checkExerciseCompletion(exerciseUserData, exerciseLength)) {
    throw new Error('Cannot find next index. Completed sentences index list is full.')
  }
  let foundUncompletedSentence = false
  let searchIndex = exerciseUserData.current
  while (foundUncompletedSentence === false) {
    searchIndex += 1
    if (searchIndex === exerciseLength) {
      searchIndex = 0
    }
    if (!exerciseUserData.done.includes(searchIndex)) {
      exerciseUserData.current = searchIndex
      foundUncompletedSentence = true
    }
  }
}

/** Set next sentence, adds current to completed. Resets exercise if all sentences are completed. */
export function answeredCorrect(exerciseUserData: ExerciseUserData, exerciseLength: number) {
  if (!exerciseUserData.done.includes(exerciseUserData.current)) {
    exerciseUserData.done.push(exerciseUserData.current)
  }
  if (checkExerciseCompletion(exerciseUserData, exerciseLength)) {
    resetExercise(exerciseUserData)
    return true
  }
  setNextSentence(exerciseUserData, exerciseLength)
  return false
}

/** Swap users incorrect word and original word places and add an arrow between them for clarity. */
function remodelDiffResults(results: Change[]): Change[] {
  const newResults: Change[] = []
  for (let i = 0; i < results.length; i += 1) {
    const result = results[i]
    if (result?.removed && results?.[i + 1]?.added) {
      newResults.push(results[i + 1], { value: '=>' })
      i += 1
    }
    newResults.push(result)
  }
  return newResults
}

/** Mark sentence as submitted. Generate results based on correctness. */
export function submitAnswer(stateValue: ExerciseState) {
  stateValue.isAnswerSubmitted = true
  const currentSentence = stateValue.exerciseData[stateValue.exerciseUserData.current]
  stateValue.isAnswerCorrect = stateValue.userInput === currentSentence
  stateValue.diffResults = diffWordsWithSpace(currentSentence, stateValue.userInput)
  if (stateValue.isAnswerCorrect) {
    stateValue.isExerciseCompleted = answeredCorrect(
      stateValue.exerciseUserData,
      stateValue.exerciseData.length,
    )
  } else {
    stateValue.diffResults = remodelDiffResults(stateValue.diffResults)
    setNextSentence(stateValue.exerciseUserData, stateValue.exerciseData.length)
  }
}

/** Exercise setup used when route URL changes. */
export default function exerciseSetup(
  data: Data,
  userData: UserData,
  {
    category,
    exercise,
  }: {
    category?: string | string[]
    exercise?: string | string[]
  },
) {
  if (typeof category === 'string' && typeof exercise === 'string') {
    const exerciseData = getExerciseData(data, category, exercise)
    if (exerciseData) {
      return createExerciseState(
        exercise,
        exerciseData,
        getOrCreateExerciseUserData(exercise, userData),
      )
    }
  }
  throw new Error('Exercise not found.')
}
