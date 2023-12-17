export type ExerciseUserData = {
  current: number
  win: number
  done: number[]
}

export type UserData = {
  [key: string]: ExerciseUserData
}

function defaultExerciseUserDataFactory(): ExerciseUserData {
  return {
    current: 0,
    win: 0,
    done: [],
  }
}
export function getExerciseUserData(exercise: string, userData: UserData): ExerciseUserData {
  if (!userData[exercise]) {
    userData[exercise] = defaultExerciseUserDataFactory()
  }
  return userData[exercise]
}

export function completionAsString(sentencesCompleted: number, exerciseLength: number) {
  return `${sentencesCompleted}/${exerciseLength}`
}

export function statsAsString(
  exercise: string | number,
  exerciseLength: number,
  userData: UserData,
) {
  const exerciseUserData = userData[exercise]
  const sentencesCompleted = exerciseUserData ? exerciseUserData.done.length : 0
  let completion = completionAsString(sentencesCompleted, exerciseLength)
  if (exerciseUserData?.win) {
    completion = `🏆x${exerciseUserData.win} ${completion}`
  }
  return completion
}
