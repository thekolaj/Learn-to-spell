import { diffWordsWithSpace } from 'diff'
import { getExerciseUserData, type ExerciseUserData, type UserData } from '@/store/userDataUtils'
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

export function submitAnswer(stateValue: ExerciseState) {
  const currentSentence = stateValue.exerciseData[stateValue.exerciseUserData.current]
  const isAnswerCorrect = stateValue.userInput === currentSentence
  const diff = diffWordsWithSpace(currentSentence, stateValue.userInput)
  console.log(diff)
  stateValue.isAnswerSubmitted = true
  if (isAnswerCorrect) {
    stateValue.resultsDisplay = `Correct: ${currentSentence}`
    stateValue.isExerciseCompleted = answeredCorrect(
      stateValue.exerciseUserData,
      stateValue.exerciseData.length,
    )
  } else {
    stateValue.resultsDisplay = `Wrong: ${currentSentence}`
    setNextSentence(stateValue.exerciseUserData, stateValue.exerciseData.length)
  }
}

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
      return createExerciseState(exercise, exerciseData, getExerciseUserData(exercise, userData))
    }
  }
  throw new Error('Exercise not found.')
}
