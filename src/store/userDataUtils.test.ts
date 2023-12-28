import { describe, expect, it } from 'vitest'
import type { UserData } from './userDataUtils'
import { statsAsString, getOrCreateExerciseUserData } from './userDataUtils'

describe('statsAsString function', () => {
  const exerciseLength = 5
  const testData: UserData = {
    'test-1': {
      current: 4,
      win: 0,
      done: [],
    },
    'test-2': {
      current: 0,
      win: 0,
      done: [1, 2, 4],
    },
    'test-3': {
      current: 1,
      win: 2,
      done: [0],
    },
  }

  it('creates string, includes exercise completion count (wins) when available', () => {
    expect(statsAsString('test-1', exerciseLength, testData)).toBe('0/5')
    expect(statsAsString('test-2', exerciseLength, testData)).toBe('3/5')
    expect(statsAsString('test-3', exerciseLength, testData)).toBe('🏆x2 1/5')
  })
  it('creates string when data is missing', () => {
    expect(statsAsString(1, exerciseLength, testData)).toBe('0/5')
    expect(statsAsString('thisDoesNotExist', exerciseLength, testData)).toBe('0/5')
  })
})

describe('retrieve and modify data', () => {
  const testData: UserData = {
    'test-1': {
      current: 4,
      win: 0,
      done: [],
    },
    'test-2': {
      current: 0,
      win: 0,
      done: [1, 2, 4],
    },
    'test-3': {
      current: 1,
      win: 2,
      done: [0],
    },
  }
  it('returns existing exercise user data', () => {
    expect(getOrCreateExerciseUserData('test-1', testData)).toEqual({
      current: 4,
      win: 0,
      done: [],
    })
    expect(getOrCreateExerciseUserData('test-2', testData)).toEqual({
      current: 0,
      win: 0,
      done: [1, 2, 4],
    })
    expect(getOrCreateExerciseUserData('test-3', testData)).toEqual({
      current: 1,
      win: 2,
      done: [0],
    })
  })
  it('adds new data if missing', () => {
    expect(Object.keys(testData).length).toBe(3)
    expect(getOrCreateExerciseUserData('newData', testData)).toEqual({
      current: 0,
      win: 0,
      done: [],
    })
    expect(Object.keys(testData).length).toBe(4)
    expect('test-1' in testData).toBe(true)
    expect('newData' in testData).toBe(true)
    expect('missingData' in testData).toBe(false)
  })
})
