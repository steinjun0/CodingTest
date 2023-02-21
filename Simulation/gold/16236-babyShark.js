const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const N = +input[0]
const sea = input.slice(1).map(e => e.split(' ').map(Number))

function findShark(N, sea) {
    for (let i = 0; i < N; i++) {
        const temp = sea[i].indexOf(9)
        if (temp !== -1) {
            return [i, temp]
        }
    }
}

const stepX = [-1, 0, 0, 1]
const stepY = [0, -1, 1, 0]

function findAllDistance(N, sea, sharkWeight) {
    const sharkPos = findShark(N, sea)
    sea[sharkPos[0]][sharkPos[1]] = 0
    const visited = []
    for (let i = 0; i < N; i++) {
        visited.push(Array(N).fill(false))
    }

    const queue = [[0, sharkPos]]
    const result = []
    step = 0
    while (queue.length > 0) {
        const pos = queue.shift()
        for (let i = 0; i < 4; i++) {
            const nx = pos[1][0] + stepX[i]
            const ny = pos[1][1] + stepY[i]
            if (0 <= nx && nx < N && 0 <= ny && ny < N) {
                if (!visited[nx][ny]) {
                    visited[nx][ny] = true
                    if (sea[nx][ny] !== 0) {
                        if (sea[nx][ny] < sharkWeight) {
                            result.push([pos[0] + 1, [nx, ny]])
                        } else if (sea[nx][ny] === sharkWeight) {
                            queue.push([pos[0] + 1, [nx, ny]])
                        }
                    } else if (sea[nx][ny] === 0) {
                        queue.push([pos[0] + 1, [nx, ny]])
                    }
                }
            }
        }
    }

    return result

}

function solve(N, sea) {
    let second = 0
    let eatCount = 0
    let sharkWeight = 2
    while (true) {
        const eatables = findAllDistance(N, sea, sharkWeight)
        if (eatables.length <= 0) {
            return second
        } else {
            eatables.sort((a, b) => {
                if (a[0] === b[0]) {
                    if (a[1][0] === b[1][0])
                        return a[1][1] - b[1][1]
                    else
                        return a[1][0] - b[1][0]
                } else
                    return a[0] - b[0]
            })
            sea[eatables[0][1][0]][eatables[0][1][1]] = 9
            eatCount++
            second += eatables[0][0]

            if (eatCount === sharkWeight) {
                sharkWeight++
                eatCount = 0
            }
        }

    }
}

console.log(solve(N, sea))

// 00:52:50 맞았습니다!