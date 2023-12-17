import type { ExerciseUserData } from '@/components/userDataUtils'

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
