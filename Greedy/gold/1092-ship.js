const input = require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const N = +input[0]
const crains = input[1].split(' ').map(e => +e).sort((a, b) => b - a)
const M = +input[2]
const boxes = input[3].split(' ').map(e => +e).sort((a, b) => b - a)

function solve(N, crains, M, boxes) {
    if (boxes[0] > crains[0]) {
        return -1
    }
    let result = 0
    let crainsAble
    let leftBoxes
    while (boxes.length > 0) {
        crainsAble = Array(crains.length).fill(true)
        leftBoxes = Array(boxes.length).fill(true)
        for (let i = 0; i < boxes.length; i++) {
            const box = boxes[i]
            for (let j = 0; j < crains.length; j++) {
                const crain = crains[j]
                if (crainsAble[j] && box <= crain) {
                    crainsAble[j] = false
                    leftBoxes[i] = false
                    break
                }
            }
        }
        result += 1
        crainsAble.fill(true)
        boxes = boxes.filter((e, i) => leftBoxes[i])
    }


    return result
}

console.log(solve(N, crains, M, boxes))

// 00:17:45 틀렸습니다(2%) -> crainNumber++ 조건 더 정확하게 작성
// 00:20:55 틀렸습니다(2%) -> crains 낮은것 부터 채워지도록 수정
// 00:49:20 틀렸습니다(2%) -> 테스트용 변수 제거
// 00:50:50 틀렸습니다(2%) -> boxes 변수로 생성
// 00:55:50 틀렸습니다(2%) -> 다시 처음으로 롤백 -> 천천히 적어서 다시(덜 구현함)
// 01:23:40 틀렸습니다(2%) -> 작은 애들도 들어갈 수 있도록 수정
// 01:39:00 맞았습니다!
// 꼭 필기를 하고 문제를 풉시다
