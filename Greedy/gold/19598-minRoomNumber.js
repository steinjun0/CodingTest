const input = require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const N = +input[0]

const timeTableInput = input.slice(1)
    .map(e => e.split(' '))
    .flat()
    .map((e, i) => {
        if (i % 2 === 0)
            return [+e, 1] // start
        else
            return [+e, -1] // end
    })
    .sort((a, b) => {
        if (a[0] !== b[0])
            return a[0] - b[0]
        else
            return a[1] - b[1]
    })


function solve(timeTable) {
    let result = 0
    let active = 0
    // console.log(JSON.stringify(timeTable))
    for (let e of timeTable) {
        // console.log('e', e)
        if (e[1] === 1) {
            active += 1
        } else if (e[1] === -1) {
            active -= 1
        }
        if (result <= active)
            result = active
    }
    return result
}
console.log(solve(timeTableInput))

// 00:12:24 (8%) 틀렸습니다 -> endTime 배열 추가
// 00:29:39 (8%) 메모리 초과 -> lastEnd으로 다시 돌림, 정렬 변경
// 00:33:06 (8%) 틀렸습니다 -> 
// 00:53:26 (8$) 메모리 초과 -> endTime 배열 추가(정렬 안됐었던것 같아서)
// ~~~ -> 시간을 뜯어냄
// 01:09:10 (8%) 틀렸습니다 -> 정렬 추가
// 01:12:40 틀렸습니다 [0 0] 예외처리
// 틀렸습니다
// 01:25:50 포기

// -> 백준에 input 받을 떄는 toString 이후에 무조건 trim 해야함.