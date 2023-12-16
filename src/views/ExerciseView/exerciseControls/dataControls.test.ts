import { describe, expect, it } from 'vitest'
import type { ExerciseData } from '@/components/userDataUtils'
import { answeredCorrect, setNextSentence } from './dataControls'

describe('Next sentence function', () => {
  const exerciseLength = 5
  it('loops through new empty exercise', () => {
    const exerciseData: ExerciseData = {
      current: 0,
      win: 0,
      done: [],
    }
    setNextSentence(exerciseData, exerciseLength)
    expect(exerciseData.current).toBe(1)
    setNextSentence(exerciseData, exerciseLength)
    expect(exerciseData.current).toBe(2)
    setNextSentence(exerciseData, exerciseLength)
    expect(exerciseData.current).toBe(3)
    setNextSentence(exerciseData, exerciseLength)
    expect(exerciseData.current).toBe(4)
    setNextSentence(exerciseData, exerciseLength)
    expect(exerciseData.current).toBe(0)
    setNextSentence(exerciseData, exerciseLength)
    expect(exerciseData.current).toBe(1)
  })

  it('skips over completed sentences', () => {
    const exerciseData: ExerciseData = {
      current: 0,
      win: 0,
      done: [0, 2, 3],
    }
    setNextSentence(exerciseData, exerciseLength)
    expect(exerciseData.current).toBe(1)
    setNextSentence(exerciseData, exerciseLength)
    expect(exerciseData.current).toBe(4)
    setNextSentence(exerciseData, exerciseLength)
    expect(exerciseData.current).toBe(1)
    setNextSentence(exerciseData, exerciseLength)
    expect(exerciseData.current).toBe(4)
  })

  it('does not work with full array', () => {
    const exerciseData: ExerciseData = {
      current: 0,
      win: 0,
      done: [0, 1, 2, 3, 4],
    }
    expect(() => setNextSentence(exerciseData, exerciseLength)).toThrow()
  })
})

describe('correct answer function', () => {
  const exerciseData = {
    current: 0,
    win: 0,
    done: [],
  }
  const exerciseLength = 5
  it('adds current index to completed and advance index', () => {
    answeredCorrect(exerciseData, exerciseLength)
    expect(exerciseData.done).toEqual([0])
    answeredCorrect(exerciseData, exerciseLength)
    expect(exerciseData.done).toEqual([0, 1])
    answeredCorrect(exerciseData, exerciseLength)
    expect(exerciseData.done).toEqual([0, 1, 2])
    answeredCorrect(exerciseData, exerciseLength)
    expect(exerciseData.done).toEqual([0, 1, 2, 3])
  })

  it('resets list and adds a win', () => {
    expect(exerciseData.win).toBe(0)
    answeredCorrect(exerciseData, exerciseLength)
    expect(exerciseData).toEqual({
      current: 0,
      win: 1,
      done: [],
    })
  })
})
