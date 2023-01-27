const input = require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const N = +input[0]
const originNumbers = input[1].split(' ').map(e => +e)

const numbers = [originNumbers[0]]
for (let i = 1; i < N; i++) {
    if (numbers[numbers.length - 1] * originNumbers[i] >= 0)
        numbers[numbers.length - 1] += originNumbers[i]
    else
        numbers.push(originNumbers[i])
}

function getMaxFromIndex(N, numbers, startIndex) {
    let max = numbers[startIndex]
    let gapSum = 0
    for (let i = startIndex; i < N; i++) {
        // console.log('numbers[i]', numbers[i], gapSum)
        // 양수 일때
        if (numbers[i] > 0) {
            if (gapSum >= 0) {
                max = gapSum + numbers[i]
                gapSum = 0
            }
            else {
                if (numbers[i] + gapSum + max >= numbers[i] && max <= numbers[i] + gapSum + max) {
                    max = numbers[i] + gapSum + max
                    gapSum = 0
                } else if (numbers[i] >= max) {
                    max = numbers[i]
                    gapSum = 0
                } else {
                    gapSum += numbers[i]
                }
            }
        }
        // 음수 일때
        else {
            gapSum += numbers[i]
        }
        // console.log(max)
    }
    return max
}

if (numbers.length === 1) {
    if (numbers[0] > 0) {
        console.log(numbers[0])
    } else {
        let max = -1001
        for (let i of originNumbers) {
            if (i > max)
                max = i
        }
        console.log(max)
    }
} else {
    let max = -1001
    if (numbers[0] < 0) {
        for (let i = 1; i < numbers.length - 1; i += 2) {
            const temp = getMaxFromIndex(numbers.length, numbers, i)
            if (temp > max)
                max = temp
        }
    }
    else {
        for (let i = 0; i < numbers.length - 1; i += 2) {
            const temp = getMaxFromIndex(numbers.length, numbers, i)
            if (temp > max)
                max = temp
        }
    }
    console.log(max)
}

// 00:53:22 틀렸습니다(4%) -> 필요없는 변수 제거, 첫번째 값 양수로 고정
// 01:02:30 틀렸습니다(4%) -> gapSum =0 전, gapSum 값 체크
// 01:04:00 틀렸습니다(4%) -> 0도 합치는 코드 추가
// 01:06:57 틀렸습니다(4%) -> 
// 01:26:55 틀렸습니다(4%)
// 01:50:40 틀렸습니다(4%) -> 포기 -> 다시 시도(반례 얻음) -> 모든 시작에 대해서 추가
// 01:55:40 메모리 초과(8%?) -> 출력 배열 없앰
// 01:57:30 메모리 초과(8%) -> 시작 분기 없앰 
// 01:58:58 시간 초과 -> 복원, slice 제거 
// 02:00:00 시간 초과(37%) 
// 02:20:20 포기



// if (gapSum >= 0) {
//     // 사이값과 max를 합친게 새로운 숫자보다 클 때
//     if (gapSum + max > numbers[i]) {
//         max += gapSum
//     }
//     // 사이값과 max를 합친것 보다 새로운 숫자가 클 때
//     else {
//         max = numbers[i]
//     }
//     // 어쨌든 갱신되었으므로 초기화
//     gapSum = 0
// }
// else {
//     if (max <= numbers[i]) {
//         max = numbers[i]
//         gapSum = 0
//     }
// }
// // 사이값은 음수이지만
// // 최대값이 새로운 숫자보다 작을 때
// else if (max <= numbers[i] && gapSum < 0) {
//     max = numbers[i]
//     gapSum = 0
// }