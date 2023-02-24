function getCombination(n, c) {
    let result = []
    const elements = []
    for (let i = 0; i < n - 1; i++) {
        elements.push([i, i + 1])
    }

    if (c < 2) {
        return []
    }

    else if (c === 2) {
        return elements
    }
    else {
        result = [...elements]
        for (let count = 2; count < c; count += 2) {
            let newResult = []
            for (let i = 0; i < result.length; i++) {
                const temp = []

                for (let element of elements) {
                    if (result[i][result[i].length - 1] < element[0]) {
                        // console.log(result[i], element)
                        temp.push([...result[i], ...element])
                    }
                }
                newResult.push(...temp)
            }
            result = [...newResult]
        }
        // console.table(result)
        return result
    }
}

// console.table(getCombination(8, 6))

const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const N = +input[0]
const calcStr = input[1]

function calc(calcStr, priNums) {
    let calcArr = [calcStr[0]]
    for (let i = 1; i < calcStr.length; i++) {
        if (['+', '-', '*'].includes(calcStr[i])) {
            calcArr.push(calcStr[i])
        } else {
            if (['+', '-', '*'].includes(calcArr[calcArr.length - 1]))
                calcArr.push(calcStr[i])
            else
                calcArr[calcArr.length - 1] += calcStr[i]
        }
    }
    for (let i = 0; i < calcArr.length; i++) {
        if (!isNaN(+calcArr[i])) {
            calcArr[i] = +calcArr[i]
        }
    }

    while (priNums.length > 0) {
        // console.log(calcArr)
        const lastIndex = priNums.pop()
        priNums.pop()
        const second = calcArr[lastIndex * 2]
        const operator = calcArr[lastIndex * 2 - 1]
        const first = calcArr[(lastIndex - 1) * 2]

        let temp
        if (operator === '+') {
            temp = first + second
        } else if (operator === '-') {
            temp = first - second
        } else if (operator === '*') {
            temp = first * second
        }

        calcArr.splice((lastIndex - 1) * 2, 2)
        calcArr[(lastIndex - 1) * 2] = temp

        // console.log(calcArr)
    }

    let operator
    let result = calcArr[0]
    for (let i = 1; i < calcArr.length; i++) {
        if (!isNaN(+calcArr[i])) {
            if (operator === '+') {
                result += +calcArr[i]
            } else if (operator === '-') {
                result -= +calcArr[i]
            } else if (operator === '*') {
                result *= +calcArr[i]
            }
        } else {
            operator = calcArr[i]
        }
    }
    // console.log(result)
    return result

}

function solve(calcStr) {

    const n = calcStr.split(/[-,+,*]/g).length
    if (n === 1) {
        return calcStr
    }

    if (n === 2) {
        return calc(calcStr, [])
    }

    let max = -Infinity
    for (let i = 0; i < n; i += 2) {
        for (const comb of getCombination(n, i)) {
            // console.log(comb)
            max = Math.max(calc(calcStr, comb), max)
        }
    }
    return max
}

console.log(solve(calcStr))

// 01:21:24 틀렸습니다 (78%) -> 한개일 때 예외처리
// 01:23:09 틀렸습니다 (78%) -> 3개일 때 예외처리(...)
// 01:24:40 맞았습니다!