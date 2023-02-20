const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const tempInput = input[0].split(' ').map(Number)
const r = tempInput[0] - 1
const c = tempInput[1] - 1
const k = tempInput[2]
const A = []

for (let i = 0; i < 3; i++) {
    A.push(input[i + 1].split(' ').map(Number))
}

function printMap(arr) {
    for (const row of arr) {
        console.log(JSON.stringify(row))
    }
    console.log('')
}

function countSort(arr) {
    const counter = []

    for (const e of arr) {
        if (e !== 0)
            counter[e] = counter[e] + 1 || 1
    }

    const temp = []
    for (let i = 0; i <= 100; i++) {
        if (counter[i] !== undefined)
            temp.push([i, counter[i]])
    }
    temp.sort((a, b) => {
        if (a[1] === b[1]) {
            return a[0] - b[0]
        } else {
            return a[1] - b[1]
        }
    })

    return temp.flat()
}

function rowZeroFill(A, maxLength) {
    for (let i = 0; i < A.length; i++) {
        for (let j = 0; j < maxLength; j++) {
            A[i][j] = A[i][j] ?? 0
        }
    }
}

function colZeroFill(A, maxLength) {
    for (let i = 0; i < A[0].length; i++) {
        for (let j = 0; j < maxLength; j++) {
            if (A[j] === undefined)
                A[j] = []
            A[j][i] = A[j][i] ?? 0
        }
    }
}

function solve(r, c, k, A) {
    for (let count = 0; count <= 100; count++) {
        if (A[r] && A[r][c] === k) {
            return count
        }

        let maxLength = 0
        if (A.length >= A[0].length) {
            for (let i = 0; i < A.length; i++) {
                A[i] = countSort(A[i])
                if (A[i].length > maxLength) {
                    maxLength = A[i].length
                }
            }

            if (maxLength > 100)
                maxLength = 100
            rowZeroFill(A, maxLength)
        } else {
            for (let i = 0; i < A[0].length; i++) {
                let tempArr = []
                for (let j = 0; j < A.length; j++) {
                    tempArr.push(A[j][i])
                }
                tempArr = countSort(tempArr)

                for (let j = 0; j < tempArr.length; j++) {
                    if (A[j] === undefined)
                        A[j] = []
                    A[j][i] = tempArr[j]
                }
                for (let t = tempArr.length; t < 100; t++) {
                    if (A[t] !== undefined)
                        A[t][i] = 0
                }

                if (tempArr.length > maxLength) {
                    maxLength = tempArr.length
                }
            }

            if (maxLength > 100)
                maxLength = 100
            colZeroFill(A, maxLength)
        }

        // printMap(A)
    }

    return -1
}

console.log(solve(r, c, k, A))

// 00:57:30 런타임 에러 -> colZeroFill 예외처리
// 00:59:55 런타임 에러 -> r,c 참조 부분 예외처리
// 01:07:00 틀렸습니다(74%) -> 100초 조건 변경(포함)
// 01:08:40 맞았습니다!