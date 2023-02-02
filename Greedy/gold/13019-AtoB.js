const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const A = input[0]
const B = input[1]

function solve(A, B) {
    const countA = {}
    const countB = {}

    if (A === B)
        return 0

    for (i of A.split('').sort()) {
        countA[i] = countA[i] + 1 || 1
    }
    for (i of B.split('').sort()) {
        countB[i] = countB[i] + 1 || 1
    }

    if (JSON.stringify(countA) !== JSON.stringify(countB)) {
        return -1
    }

    let cutIndex = A.length - 1

    for (let i = cutIndex; i >= 0; i--) {
        if (A[i] !== B[i]) {
            cutIndex = i
            break
        }
    }
    A = A.slice(0, cutIndex + 1)
    B = B.slice(0, cutIndex + 1)


    let fitIndex = 0
    let startIndex = B.length - 2
    for (let i = 0; i < B.length; i++) {
        if (A.slice(0, A.length - i) === B.slice(i, B.length)) {
            startIndex = i - 1
            fitIndex = B.length - i - 1
            break
        }
    }


    console.log(A, B)

    let result = 0
    console.log('fitIndex', fitIndex, 'startIndex', startIndex)
    for (let i = startIndex; i >= 0; i--) {
        // console.log(i)
        for (let j = fitIndex; i < A.length; j++) {
            // console.log('A[j]', A[j], 'B[i]', B[i])
            if (A[j] === B[i]) {
                const pastA = A
                const temp = A[j]
                A = A.slice(0, j) + A.slice(j + 1)
                A = temp + A


                fitIndex++
                if (pastA !== A) {
                    result++
                }
                break
            }
        }
        console.log(i, B[i], A, B, result)
        if (A === B) {
            return result
        }
    }


}

console.log(solve(A, B))

// 마지막은 어차피 자동으로 맞춰져서 무시해도됨
// 01:00:06 틀렸습니다(x%) -> fitIndex 빠진 부분 수정 -> 해당부분 지우고, A가 변하지 않았으면 result 더하지 않음
// 01:17:00 틀렸습니다(1%) -> 중복 발생하는 경우 제거(fitIndex, startIndex initial값 변경)
// 01:50:00 틀렸습니다(0%)
// 02:04:00 포기
// 도저히 반례를 찾지 못함