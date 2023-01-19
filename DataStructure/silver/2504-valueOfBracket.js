function solve(input) {
    const queue = []
    let point = 0
    let tempInput = [...input]
    let newTempInput = []
    let count = 10
    let pastTempInput = []
    while (true) {
        pastTempInput = [...tempInput]
        // console.log(tempInput)
        for (let i = 0; i < tempInput.length; i++) {
            if (tempInput[i] === ')') {
                if (newTempInput[newTempInput.length - 1] === '(') {
                    newTempInput.pop()
                    newTempInput.push(2)
                }
                else {
                    newTempInput.push(tempInput[i])
                }
            }
            else if (tempInput[i] === ']') {
                if (newTempInput[newTempInput.length - 1] === '[') {
                    newTempInput.pop()
                    newTempInput.push(3)
                }
                else {
                    newTempInput.push(tempInput[i])
                }
            } else {
                newTempInput.push(tempInput[i])
            }
        }

        tempInput = [...newTempInput]
        newTempInput = []
        // console.log(tempInput)

        for (let i = 0; i < tempInput.length; i++) {
            if (tempInput[i] === ')') {
                if (typeof newTempInput[newTempInput.length - 1] === 'number' && newTempInput[newTempInput.length - 2] === '(') {
                    const value = newTempInput.pop()
                    newTempInput.pop()
                    newTempInput.push(value * 2)
                }
                else {
                    newTempInput.push(tempInput[i])
                }
            }
            else if (tempInput[i] === ']') {
                if (typeof newTempInput[newTempInput.length - 1] === 'number' && newTempInput[newTempInput.length - 2] === '[') {
                    const value = newTempInput.pop()
                    newTempInput.pop()
                    newTempInput.push(value * 3)
                }
                else {
                    newTempInput.push(tempInput[i])
                }
            } else {
                newTempInput.push(tempInput[i])
            }
        }

        tempInput = [...newTempInput]
        newTempInput = []
        // console.log(tempInput)

        for (let i = 0; i < tempInput.length; i++) {
            if (typeof tempInput[i] === 'number') {
                if (typeof newTempInput[newTempInput.length - 1] === 'number')
                    newTempInput[newTempInput.length - 1] += tempInput[i]
                else
                    newTempInput.push(tempInput[i])
            } else {
                newTempInput.push(tempInput[i])
            }
        }

        if (pastTempInput.toString() === newTempInput.toString()) {
            return 0
        }
        if (newTempInput.length === 1) {
            return newTempInput[0]
        }

        tempInput = [...newTempInput]
        newTempInput = []
    }

    let result = point
    if (queue.length !== 0)
        result = 0

    return result
}

const filePath =
    process.platform === "linux" ? "/dev/stdin" : "/Users/seogjun-yeong/Desktop/Programming/CodingTest/testcase.txt";

const input = require('fs')
    .readFileSync(filePath)
    .toString()
    .trim()
    .split('')


console.log(solve(input))


// 00:55:34 맞았습니다!
// 처음 생각한 로직으로 되지 않아서 앞에 시간을 조금 버림
// 풀긴했지만 로직은 for문을 3번 돌아야해서 비효율적으로 보임