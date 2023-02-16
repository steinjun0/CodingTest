const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(e => e.split(' ').map(Number))

const [R, C, T] = input[0]
let room = input.slice(1)
let tempPos = false
for (let i = 0; i < room.length; i++) {
    for (let j = 0; j < room[i].length; j++) {
        if (room[i][j] === -1) {
            tempPos = [i, j]
            break
        }
    }
    if (tempPos) {
        break
    }
}

const upperAirCleaner = [tempPos[0], tempPos[1]]
const lowerAirCleaner = [tempPos[0] + 1, tempPos[1]]


const directions = [[0, 1], [1, 0], [-1, 0], [0, -1]]

// printMap(room)

function printMap(arr) {
    for (let i = 0; i < arr.length; i++) {
        console.log(arr[i])
    }
    console.log('')
}

function solve() {
    // 0. for Time T
    for (let time = 0; time < T; time++) {
        // 1. find dust expand
        let nextRoom = Array(R).fill([])
        for (let i = 0; i < R; i++) {
            nextRoom[i] = Array(C).fill(0)
        }
        for (let i = 0; i < room.length; i++) {
            for (let j = 0; j < C; j++) {
                // if find dust
                if (![0, -1].includes(room[i][j])) {
                    const dustAmount = room[i][j]
                    nextRoom[i][j] += dustAmount
                    for (direction of directions) {
                        const nx = direction[0] + i
                        const ny = direction[1] + j
                        if (0 <= nx && nx < R && 0 <= ny && ny < C) {
                            if (room[nx][ny] !== -1) {
                                nextRoom[nx][ny] += Math.floor(dustAmount / 5)
                                nextRoom[i][j] -= Math.floor(dustAmount / 5)
                            }
                        }
                    }
                } else if (room[i][j] === -1) {
                    nextRoom[i][j] = -1
                }
            }
        }
        room = JSON.parse(JSON.stringify(nextRoom))
        // printMap(nextRoom)


        // 2. cleaning air

        // upper

        nextRoom[0] = [...room[0].slice(1, C), room[1][C - 1]]
        nextRoom[upperAirCleaner[0]] = [room[upperAirCleaner[0] - 1][0], ...room[upperAirCleaner[0]].slice(0, C - 1)]
        nextRoom[upperAirCleaner[0]][upperAirCleaner[1] + 1] = 0
        nextRoom[upperAirCleaner[0]][upperAirCleaner[1]] = -1

        for (let i = 1; i < upperAirCleaner[0]; i++) {
            nextRoom[i][0] = room[i - 1][0]

            if (room[i + 1][C - 1] === -1) {
                nextRoom[i][C - 1] = 0
            } else {
                nextRoom[i][C - 1] = room[i + 1][C - 1]
            }
        }

        // low
        nextRoom[lowerAirCleaner[0]] = [room[lowerAirCleaner[0] + 1][0], ...room[lowerAirCleaner[0]]].slice(0, C)
        nextRoom[lowerAirCleaner[0]][lowerAirCleaner[1] + 1] = 0
        nextRoom[lowerAirCleaner[0]][lowerAirCleaner[1]] = -1

        nextRoom[R - 1] = room[R - 1].slice(1)
        nextRoom[R - 1].push(room[R - 2][C - 1])


        for (let i = lowerAirCleaner[0] + 1; i < R - 1; i++) {
            if (room[i - 1][C - 1] === -1)
                nextRoom[i][C - 1] = 0
            else
                nextRoom[i][C - 1] = room[i - 1][C - 1]
            nextRoom[i][0] = room[i + 1][0]
        }

        room = nextRoom
    }

    // printMap(room)
    let result = 0
    for (let i = 0; i < R; i++) {
        result += room[i].reduce((sum, e) => sum += e)
    }
    return result + 2

}

console.log(solve())

// 01:45:30 맞았습니다!
// 너무 오래 걸림