export type Data = {
  [key: string]: {
    name: string
    description: string
    content: { [key: string]: string[] }
  }
}

export default function getExerciseData(
  data: Data,
  category: string,
  exercise: string,
): string[] | undefined {
  return data?.[category]?.content?.[exercise]
}
