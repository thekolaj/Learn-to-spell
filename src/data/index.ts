import easy from './categoryEasy.json'
import medium from './categoryMedium.json'
import difficult from './categoryDifficult.json'
import misspelled from './categoryMisspelled.json'

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
}

export function doesExerciseExist(category: string, exercise: string) {
  return Boolean(data?.[category]?.content?.[exercise])
}
