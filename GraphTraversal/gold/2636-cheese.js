const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [N, M] = input[0].split(' ').map(Number)
const space = input.slice(1).map(e => e.split(' ').map(Number))
let hasCheese = false
for (const row of space) {
    if (row.includes(1)) {
        hasCheese = true
        break
    }
}
if (!hasCheese) {
    console.log(`0\n0`)
    return
}

const directions = [[1, 0], [0, 1], [-1, 0], [0, -1]]

function solve(N, M, inputSpace) {
    let cheeseSet = new Set()
    let innerAirSet = new Set()
    let outerAirSet = new Set()


    let oldSpace = inputSpace
    const isVisited = []
    let newSpace = []
    for (let i = 0; i < N; i++) {
        isVisited.push(Array(M).fill(false))
        if (i === 0 || i === N - 1) {
            const temp = Array(M).fill('x')
            newSpace.push(temp)
        } else {
            const temp = Array(M).fill(-1)
            temp[M - 1] = 'x'
            temp[0] = 'x'
            newSpace.push(temp)
        }
    }

    const queue = [[1, 1]]
    newSpace[1][1] = 0
    if (oldSpace[1][1] === 1) {
        cheeseSet.add(0)
    } else {
        innerAirSet.add(0)
    }

    let count = (N - 1) * (M - 1)
    while (queue.length > 0) {
        const pos = queue.pop()
        const x = pos[0]
        const y = pos[1]

        for (const direction of directions) {
            const nx = pos[0] + direction[0]
            const ny = pos[1] + direction[1]

            if (0 <= nx && nx < N && 0 <= ny && ny < M) {
                if (newSpace[nx][ny] === -1 && newSpace[nx][ny] !== 'x') {
                    if (oldSpace[nx][ny] === oldSpace[x][y]) {
                        newSpace[nx][ny] = newSpace[x][y]
                        queue.push([nx, ny])
                        count--
                    }
                }
                if (newSpace[nx][ny] === 'x' && innerAirSet.has(newSpace[x][y])) {
                    innerAirSet.delete(newSpace[x][y])
                    outerAirSet.add(newSpace[x][y])
                }
            }
        }
        if (queue.length === 0 && count > 0) {
            for (let i = 0; i < N; i++) {
                let isBreak = false
                for (let j = 0; j < M; j++) {
                    if (newSpace[i][j] === -1) {
                        queue.push([i, j])
                        newSpace[i][j] = newSpace[x][y] + 1

                        if (oldSpace[i][j] === 1) {
                            cheeseSet.add(newSpace[x][y] + 1)
                        } else {
                            innerAirSet.add(newSpace[x][y] + 1)
                        }

                        isBreak = true
                        break
                    }
                }
                if (isBreak)
                    break
            }
        }
    }

    // console.log(cheeseSet.values(), outerAirSet.values(), innerAirSet.values())

    for (let i = 1; i < N - 1; i++) {
        for (let j = 1; j < M - 1; j++) {
            if (cheeseSet.has(newSpace[i][j])) {
                for (const direction of directions) {
                    const nx = i + direction[0]
                    const ny = j + direction[1]

                    if (0 <= nx && nx < N && 0 <= ny && ny < M) {
                        if (newSpace[nx][ny] === 'x' || outerAirSet.has(newSpace[nx][ny])) {
                            newSpace[i][j] = -2
                        }
                    }
                }
            }
        }
    }

    for (let i = 1; i < N - 1; i++) {
        for (let j = 1; j < M - 1; j++) {
            if (cheeseSet.has(newSpace[i][j])) {
                if (newSpace[i][j] === -1) {
                    newSpace[i][j] = 0
                } else {
                    newSpace[i][j] = 1
                }
            } else {
                newSpace[i][j] = 0
            }
        }
    }

    // console.table(newSpace)
    return newSpace
}

let tempSpace = space
let count = 0
let lastCount = 0
for (let i = 1; i < N - 1; i++) {
    for (let j = 1; j < M - 1; j++) {
        if (tempSpace[i][j] === 1) {
            lastCount++
        }
    }
}
let step = 0
do {
    step++
    tempSpace = solve(N, M, tempSpace)
    count = 0
    for (let i = 1; i < N - 1; i++) {
        for (let j = 1; j < M - 1; j++) {
            if (tempSpace[i][j] === 1) {
                count++
            }
        }
    }
    if (count !== 0) {
        lastCount = count
        continue
    }

} while (count !== 0)

console.log(`${step}\n${lastCount}`)

// 01:07:56 틀렸습니다(95%) -> step 나중에 올리도록 변경
// 01:09:28 틀렸습니다(95%) -> 치즈 없을때 예외처리
// 01:13:28 틀렸습니다(95%) -> step 한단계일 때 예외처리
// 01:18:44 맞았습니다!