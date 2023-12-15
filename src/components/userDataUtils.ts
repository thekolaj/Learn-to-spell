export type ExerciseData = {
  current: number
  win: number
  done: number[]
}

export type UserData = {
  [key: string]: ExerciseData
}

function defaultExerciseDataFactory(): ExerciseData {
  return {
    current: 0,
    win: 0,
    done: [],
  }
}
export function getExerciseData(exercise: string, userData: UserData): ExerciseData {
  if (!userData[exercise]) {
    userData[exercise] = defaultExerciseDataFactory()
  }
  return userData[exercise]
}

export function completionAsString(sentencesCompleted: number, exerciseLength: number) {
  return `${sentencesCompleted}/${exerciseLength}`
}

export function statsAsString(exercise: string, exerciseLength: number, userData: UserData) {
  const exerciseData = userData[exercise]
  const sentencesCompleted = exerciseData ? exerciseData.done.length : 0
  let completion = completionAsString(sentencesCompleted, exerciseLength)
  if (exerciseData?.win) {
    completion = `🏆x${exerciseData.win} ${completion}`
  }
  return completion
}
