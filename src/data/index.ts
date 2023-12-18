import easy from './categoryEasy.json'
import medium from './categoryMedium.json'
import difficult from './categoryDifficult.json'
import misspelled from './categoryMisspelled.json'
import test from './categoryTest.json'

type Data = {
  [key: string]: {
    name: string
    description: string
    content: { [key: string]: string[] }
  }
}

export const data: Data = {
  easy,
  medium,
  difficult,
  misspelled,
  test,
}

export function getExerciseData(category: string, exercise: string): string[] | undefined {
  return data?.[category]?.content?.[exercise]
}
