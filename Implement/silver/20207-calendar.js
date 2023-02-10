const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const N = input[0]
const schedules = input
    .slice(1)
    .map(e => [+e.split(' ')[0], +e.split(' ')[1]])
    .sort((a, b) => {
        if (a[0] !== b[0])
            return a[0] - b[0]
        else
            return b[1] - a[1]
    })

function solve() {
    const group = [[...schedules[0]]]

    for (let i = 1; i < N; i++) {
        if (schedules[i][0] <= group[group.length - 1][1] + 1) {
            if (group[group.length - 1][1] < schedules[i][1])
                group[group.length - 1][1] = schedules[i][1]
        } else {
            group.push([...schedules[i]])
        }
    }

    const scheduleCount = []
    for (let i = 0; i <= 366; i++) {
        scheduleCount.push(Array(1001).fill(0))
    }

    for (let schedule of schedules) {
        let height = 0
        for (let j = 1; j <= 1001; j++) {
            if (scheduleCount[schedule[0]][j] === 0) {
                height = j
                break
            }
        }

        for (let i = schedule[0]; i <= schedule[1]; i++) {
            scheduleCount[i][height] = 1
        }
    }

    let resultArea = 0
    for (let range of group) {
        // console.log('range', range)
        let max = 0
        for (let i = range[0]; i <= range[1]; i++) {
            for (let j = 1; j <= 1001; j++) {
                if (scheduleCount[i][j] === 1) {
                    if (j > max)
                        max = j
                }
            }
        }

        resultArea += max * (range[1] - range[0] + 1)
    }
    return resultArea
}

console.log(solve())
// 00:27:11 틀렸습니다 (58%) -> 조건 추가 설정(정렬) /////// <- 이때 group 로직 수정했으면 맞았음
// 00:55:00 (58%) -> array 조건 -> 366으로 고정 -> 문제와 완전히 동일하게 구현
// 01:22:00 틀렸습니다 (0%) -> for 범위 수정
// 01:25:00 틀렸습니다 (0%) -> for 범위 수정
// 01:26:00 틀렸습니다 (0%) -> 배열 범위 수정
// 01:29:00 틀렸습니다 (58%) -> ... -> group 로직 수정
// 01:33:00 맞았습니다

// 00:27:11 코드 
// const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
//     .toString()
//     .trim()
//     .split('\n')

// const N = input[0]
// const schedules = input
//     .slice(1)
//     .map(e => [+e.split(' ')[0], +e.split(' ')[1]])
//     .sort((a, b) => a[0] - b[0])

// function solve() {
//     const group = [[...schedules[0]]]

//     for (let i = 1; i < N; i++) {
//         if (schedules[i][0] <= group[group.length - 1][1]+1) {
//             if (group[group.length - 1][1] < schedules[i][1])
//                 group[group.length - 1][1] = schedules[i][1]
//         } else {
//             group.push([...schedules[i]])
//         }
//     }

//     const scheduleCount = Array(group[group.length - 1][1] + 1).fill(0)
//     for (let schedule of schedules) {
//         for (let i = schedule[0]; i <= schedule[1]; i++) {
//             scheduleCount[i] += 1
//         }
//     }

//     let resultArea = 0
//     for (let range of group) {
//         let max = 0
//         for (let i = range[0]; i <= range[1]; i++) {
//             if (max < scheduleCount[i]) {
//                 max = scheduleCount[i]
//             }
//         }
//         resultArea += max * (range[1] - range[0] + 1)
//     }
//     return resultArea
// }

// console.log(solve())