const input = require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split(' ')
    .map(Number)

const X = +input[0]
const K = +input[1]

function solve(X, K) {
    const distance = Array(100001).fill(100001)
    distance[X] = 0

    const bfs = [X]

    while (bfs.length > 0) {
        const pos = bfs.shift()
        const step = distance[pos]
        // console.log(distance.slice(0, 20), pos, K, pos === K)
        if (pos === K)
            return distance[pos]

        if (pos + 1 < 100001 && distance[pos + 1] > step + 1) {
            distance[pos + 1] = step + 1
            bfs.push(pos + 1)
        }
        if (pos - 1 >= 0 && distance[pos - 1] > step + 1) {
            distance[pos - 1] = step + 1
            bfs.push(pos - 1)
        }
        if (pos * 2 < 100001 && distance[pos * 2] > step) {
            distance[pos * 2] = step
            bfs.push(pos * 2)
        }

    }
}

console.log(solve(X, K))

// 00:23:25 틀렸습니다(5%) -> null check->대소비교로 변경
// 00:26:15 맞았습니다!