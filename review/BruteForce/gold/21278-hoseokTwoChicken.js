const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(e => [+e.split(' ')[0], +e.split(' ')[1]])

const [N, M] = input[0]
const distances = Array(N + 1).fill([])
for (let i = 0; i < distances.length; i++) {
    distances[i] = Array(N + 1).fill(Infinity)
    if (i >= 1)
        distances[i][i] = 0
}

for (let i = 1; i < input.length; i++) {
    distances[input[i][0]][input[i][1]] = 1
    distances[input[i][1]][input[i][0]] = 1
}

function printMap() {
    for (distance of distances) {
        console.log(distance)
    }
    console.log('')
}

function fillDistances() {
    for (let round = 1; round <= N; round++) {
        for (let i = 1; i <= N; i++) {
            for (let j = 1; j <= N; j++) {
                distances[i][j] = Math.min(distances[i][j], distances[i][round] + distances[round][j])
            }
        }
    }
}

function getDistance(x, y) {
    let result = 0
    for (let i = 1; i <= N; i++) {
        result += Math.min(distances[x][i], distances[y][i])
    }
    return result
}

function solve() {
    fillDistances()

    const result = []
    for (let i = 1; i <= N - 1; i++) {
        for (let j = i + 1; j <= N; j++) {
            result.push([i, j, getDistance(i, j)])
        }
    }

    result.sort((a, b) => {
        if (a[2] === b[2]) {
            if (a[0] === b[0]) {
                return a[1] - b[1]
            } else {
                return a[0] - b[0]
            }
        } else {
            return a[2] - b[2]
        }
    })
    return [result[0][0], result[0][1], result[0][2] * 2].join(' ')
}

console.log(solve())

// 01:07:17 6/19 -> result 구간 실수 수정
// 01:12:45 16/19 -> filldistance 횟수 증가
// 01:17:23 16/19 -> 중복 연산 제거
// 01:19:42 12/19 -> 즉, 최소값을 제대로 찾지 못하고 있다. -> 값 갱신할 수 있도록 수정
// 01:21:29 시간초과 -> 값 2번 체크 
// 01:25:31 16/19 -> 마지막에 값 한번 더 체크
// 01:43:00 19/19 맞았습니다!!