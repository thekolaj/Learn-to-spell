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

/** Get exercise user data. If missing, create default */
export function getOrCreateExerciseUserData(
  exercise: string,
  userData: UserData,
): ExerciseUserData {
  if (!userData[exercise]) {
    userData[exercise] = defaultExerciseUserDataFactory()
  }
  return userData[exercise]
}

/** @example: "🏆x1 3/20" */
export function statsAsString(
  exercise: string | number,
  exerciseLength: number,
  userData: UserData,
) {
  const exerciseUserData = userData[exercise]
  const sentencesCompleted = exerciseUserData ? exerciseUserData.done.length : 0
  let completion = `${sentencesCompleted}/${exerciseLength}`
  if (exerciseUserData?.win) {
    completion = `🏆x${exerciseUserData.win} ${completion}`
  }
  return completion
}
