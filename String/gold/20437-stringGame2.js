const input = require('fs')
  .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
  .toString()
  .trim()
  .split('\n')


function solve(str, k) {
  const wordCounter = {}
  const targetWords = []
  for (let i in str) {
    wordCounter[str[i]] =
      wordCounter[str[i]]
        ? { count: wordCounter[str[i]].count + 1, positions: [...wordCounter[str[i]].positions, +i] }
        :
        { count: 1, positions: [+i] }
  }
  // console.log(JSON.stringify(wordCounter))

  for (let word in wordCounter) {
    if (wordCounter[word].count >= k) {
      targetWords.push(word)
    }
  }
  // console.log(targetWords)
  if (targetWords.length === 0)
    return -1

  let min = 10001
  let max = 0

  for (word of targetWords) {
    const wordPositions = wordCounter[word].positions

    for (let i = 0; i <= wordPositions.length - k; i++) {
      const start = wordPositions[i]
      const end = wordPositions[i + k - 1]

      const gap = end - start + 1
      if (gap < min)
        min = gap
      if (gap > max)
        max = gap
    }

  }

  return `${min} ${max}`
}



const T = input[0]
let startIndex = 1
for (let i = 0; i < T; i++) {
  console.log(solve(input[i * 2 + 1], +input[i * 2 + 2]))
}

// 00:49:50 정답입니다!