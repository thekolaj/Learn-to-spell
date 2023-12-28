import { readFileSync } from 'fs'

/* eslint-disable */

const category = 'easy'
const topCount = 50
const moreThenTimes = 2

const data = {
  easy: JSON.parse(readFileSync('./src/data/categoryEasy.json')),
  medium: JSON.parse(readFileSync('./src/data/categoryMedium.json')),
  difficult: JSON.parse(readFileSync('./src/data/categoryDifficult.json')),
  misspelled: JSON.parse(readFileSync('./src/data/categoryMisspelled.json')),
}

const fullList = [...Object.values(data[category].content).flat()]

const regex =
  /,|(?<!\S)(?:i|the|a|this|to|and|is|we|he|she|in|my|on|at|of|with|for|are|has|us|not|can|have|its|it|our|was|an)(?!\S)/g
const words = {}

for (const sentence of fullList) {
  const cleanSentence = sentence.toLocaleLowerCase().replaceAll(regex, '')
  const wordArray = cleanSentence.match(/\S+/g)
  for (const word of wordArray) {
    words[word] = words[word] + 1 || 1
  }
}
const sortableWords = Object.entries(words)
sortableWords.sort((a, b) => b[1] - a[1])

function topWords(sortedWords) {
  for (let i = 0; i < topCount; i++) {
    console.log(sortableWords[i][1], sortedWords[i][0])
  }
}

function wordsWithMoreThen(sortedWords) {
  for (const word of sortedWords) {
    if (word[1] <= moreThenTimes) return
    console.log(word[0])
  }
}

console.log(sortableWords)
// topWords(sortableWords)
// wordsWithMoreThen(sortableWords)
