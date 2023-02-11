const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()

function countOdd(str) {
    let count = 0
    for (let i of str) {
        if (+i % 2 === 1)
            count += 1
    }
    return count
}

let min = Infinity
let max = 0

function solve(numberStr, count) {
    // console.log(numberStr, count)
    if (numberStr.length === 1) {
        if (count > max)
            max = count
        if (count < min)
            min = count
        return count
    } else if (numberStr.length === 2) {
        const newNumberStr = `${+numberStr[0] + +numberStr[1]}`
        return solve(newNumberStr, count + countOdd(newNumberStr))
    } else if (numberStr.length >= 3) {
        for (let i = 1; i < numberStr.length - 1; i++) {
            for (let j = i + 1; j < numberStr.length; j++) {
                const newNumberStr = `${+numberStr.slice(0, i) + +numberStr.slice(i, j) + +numberStr.slice(j)}`
                solve(newNumberStr, count + countOdd(newNumberStr))
            }
        }
    }
}
solve(input, countOdd(input))
console.log(min, max)


// for (let i = 82829; i < 82830; i++) {
//     min = Infinity; max = 0
//     solve(`${i}`, countOdd(`${i}`))
//     console.log(i, min, max)
// }

// 00:32:26 맞았습니다 (82/102) -> 조건식 잘못된 부분 발견
// 00:59:40 맞았습니다! (102/102)
// 실수를 하지 말자. 제발 로직이 어느정도 맞다가 틀리면 코드를 다시 보자. 테스트 케이스는 그 다음에