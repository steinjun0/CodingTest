const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(e => e.split(' ').map(Number))

const [N, M, K] = input[0]
let fireballs = input.slice(1).map(e => [e[0] - 1, e[1] - 1, e[2], e[3], e[4]])

let space = Array(N).fill(undefined).map(e => Array(N).fill([]))


for (const fireball of fireballs) {
    const x = fireball[0]
    const y = fireball[1]
    space[x][y] = [fireball]
}

const direction = [[-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1], [-1, -1]]

function solve() {
    for (let count = 0; count < K; count++) {
        // 1. move
        let newSpace = Array(N).fill([])
        for (let i = 0; i < N; i++) {
            newSpace[i] = Array(N)
            for (let j = 0; j < N; j++) {
                newSpace[i][j] = []
            }
        }

        for (let i = 0; i < fireballs.length; i++) {
            let fireball = fireballs[i]
            let nx = fireball[0] + direction[fireball[4]][0] * fireball[3]
            let ny = fireball[1] + direction[fireball[4]][1] * fireball[3]

            nx = calcOverflow(nx)
            ny = calcOverflow(ny)
            fireball[0] = nx
            fireball[1] = ny
            newSpace[nx][ny].push(fireball)
        }

        space = newSpace
        fireballs = []
        // 2. reaction
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                // if fireballs exist
                if (space[i][j].length > 1) {
                    // console.log('fireballs1', [i, j], JSON.stringify(fireballs))
                    fireballs = fireballs.filter(e => !(e[0] === i && e[1] === j))
                    // console.log('fireballs2', JSON.stringify(fireballs))

                    // 2-3-3. define direction
                    let isEven = space[i][j][0][4] % 2 === 0
                    let spreadDirections = [0, 2, 4, 6]
                    for (let p = 0; p < space[i][j].length; p++) {
                        if ((space[i][j][p][4] % 2 === 0) !== isEven) {
                            spreadDirections = [1, 3, 5, 7]
                            break
                        }
                    }

                    // 2-1. merge, 2-3-1, 2-3-2
                    let bigFireball = [i, j, 0, 0, 0]
                    space[i][j].forEach(fireball => {
                        bigFireball[2] += fireball[2]
                        bigFireball[3] += fireball[3]
                    })

                    // 2-2. split
                    if (Math.floor(bigFireball[2] / 5) > 0) {
                        const nextFireballs = spreadDirections.map(d => {
                            return [i, j, Math.floor(bigFireball[2] / 5), Math.floor(bigFireball[3] / space[i][j].length), d]
                        })
                        fireballs.push(...nextFireballs)
                    }
                } else if (space[i][j].length === 1) {
                    fireballs.push(space[i][j][0])
                }
            }
        }
    }


    return fireballs.reduce((sum, a) => {
        return sum += a[2]
    }, 0)
}

console.log(solve())


function print(space) {
    for (const row of space) {
        console.log(row.map(e => {
            if (e.length === 0) {
                return 0
            } else {
                return e.reduce((sum, a) => {
                    return sum += a[2]
                }, 0)
            }
        }))
    }
    console.log('')
}

function calcOverflow(point) {
    let result = point
    if (result < 0)
        result = (result % N) + N
    else if (result >= N)
        result = (result % N)
    if (result === N)
        result = 0
    return result
}

// 01:45:20 맞았습니다
// 푸는데 시간이 너무 오래 걸린다.