const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
  .toString()
  .trim()

function removeBracket(str) {
  let count = 0
  for (const s of str) {
    if (s === '(')
      count++
  }
  let lastIndex = 0
  const result = []
  for (let i = 0; i < count; i++) {
    const stack = []
    let removeStartIndex = str.indexOf('(', lastIndex)
    let removeEndIndex = -1

    for (let j = removeStartIndex; j < str.length; j++) {
      if (str[j] === '(')
        stack.push('(')
      else if (str[j] === ')') {
        if (stack.length === 1) {
          removeEndIndex = j
          break
        } else {
          stack.pop()
        }
      }
    }
    result.push(str.slice(0, removeStartIndex) + str.slice(removeStartIndex + 1, removeEndIndex) + str.slice(removeEndIndex + 1))
    lastIndex = str.indexOf('(', lastIndex) + 1
  }

  return result
}

function solve(inputStr) {
  const result = new Set()
  result.add(inputStr)
  let isFinish = false
  while (!isFinish) {
    isFinish = true
    for (const elem of result) {
      const temp = removeBracket(elem)
      for (str of temp) {
        if (!result.has(str)) {
          result.add(str)
          isFinish = false
        }
      }
    }
  }
  result.delete(inputStr)

  return Array.from(result).sort().join('\n')
}
console.log(solve(input))

// 01:05:00 (맞았습니다!)
// 침착하게 처음 구상을 버리고 새로 짰으면 더 빨리 했을 수 있었을텐데. 아쉽다.