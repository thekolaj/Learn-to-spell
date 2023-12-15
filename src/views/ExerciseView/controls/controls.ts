import type { ExerciseData } from '@/components/userDataUtils'

function checkExerciseCompletion(exerciseData: ExerciseData, exerciseLength: number) {
  return exerciseData.done.length === exerciseLength
}

function resetExercise(exerciseData: ExerciseData) {
  exerciseData.current = 0
  exerciseData.win += 1
  exerciseData.done = []
}

export function setNextSentence(exerciseData: ExerciseData, exerciseLength: number) {
  if (checkExerciseCompletion(exerciseData, exerciseLength)) {
    throw new Error('Cannot find next index. Completed sentences index list is full.')
  }
  let foundUncompletedSentence = false
  let searchIndex = exerciseData.current
  while (foundUncompletedSentence === false) {
    searchIndex += 1
    if (searchIndex === exerciseLength) {
      searchIndex = 0
    }
    if (!exerciseData.done.includes(searchIndex)) {
      exerciseData.current = searchIndex
      foundUncompletedSentence = true
    }
  }
}

export function answeredCorrect(exerciseData: ExerciseData, exerciseLength: number) {
  if (!exerciseData.done.includes(exerciseData.current)) {
    exerciseData.done.push(exerciseData.current)
  }
  if (checkExerciseCompletion(exerciseData, exerciseLength)) {
    resetExercise(exerciseData)
    return true
  }
  setNextSentence(exerciseData, exerciseLength)
  return false
}
