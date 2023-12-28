import { describe, expect, it } from 'vitest'
import type { ExerciseUserData } from '@/store/userDataUtils'
import { answeredCorrect, setNextSentence } from './dataControls'

describe('setNextSentence function', () => {
  const exerciseLength = 5
  it('loops through new empty exercise', () => {
    const exerciseUserData: ExerciseUserData = {
      current: 0,
      win: 0,
      done: [],
    }
    setNextSentence(exerciseUserData, exerciseLength)
    expect(exerciseUserData.current).toBe(1)
    setNextSentence(exerciseUserData, exerciseLength)
    expect(exerciseUserData.current).toBe(2)
    setNextSentence(exerciseUserData, exerciseLength)
    expect(exerciseUserData.current).toBe(3)
    setNextSentence(exerciseUserData, exerciseLength)
    expect(exerciseUserData.current).toBe(4)
    setNextSentence(exerciseUserData, exerciseLength)
    expect(exerciseUserData.current).toBe(0)
    setNextSentence(exerciseUserData, exerciseLength)
    expect(exerciseUserData.current).toBe(1)
  })

  it('skips over completed sentences', () => {
    const exerciseUserData: ExerciseUserData = {
      current: 0,
      win: 0,
      done: [0, 2, 3],
    }
    setNextSentence(exerciseUserData, exerciseLength)
    expect(exerciseUserData.current).toBe(1)
    setNextSentence(exerciseUserData, exerciseLength)
    expect(exerciseUserData.current).toBe(4)
    setNextSentence(exerciseUserData, exerciseLength)
    expect(exerciseUserData.current).toBe(1)
    setNextSentence(exerciseUserData, exerciseLength)
    expect(exerciseUserData.current).toBe(4)
  })

  it('does not work with full array', () => {
    const exerciseUserData: ExerciseUserData = {
      current: 0,
      win: 0,
      done: [0, 1, 2, 3, 4],
    }
    expect(() => setNextSentence(exerciseUserData, exerciseLength)).toThrow()
  })
})

describe('answerCorrect function', () => {
  const exerciseUserData = {
    current: 0,
    win: 0,
    done: [],
  }
  const exerciseLength = 5
  it('adds current index to completed and advance index', () => {
    answeredCorrect(exerciseUserData, exerciseLength)
    expect(exerciseUserData.done).toEqual([0])
    answeredCorrect(exerciseUserData, exerciseLength)
    expect(exerciseUserData.done).toEqual([0, 1])
    answeredCorrect(exerciseUserData, exerciseLength)
    expect(exerciseUserData.done).toEqual([0, 1, 2])
    answeredCorrect(exerciseUserData, exerciseLength)
    expect(exerciseUserData.done).toEqual([0, 1, 2, 3])
  })

  it('resets list and adds a win', () => {
    expect(exerciseUserData.win).toBe(0)
    answeredCorrect(exerciseUserData, exerciseLength)
    expect(exerciseUserData).toEqual({
      current: 0,
      win: 1,
      done: [],
    })
  })
})
