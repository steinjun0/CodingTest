const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [N, M, T] = input[0].split(' ').map(Number)
const castle = input.slice(1).map(row => row.split(' ').map(Number))

const dx = [0, 0, 1, -1]
const dy = [1, -1, 0, 0]

function solve(N, M, T, castle) {
    const queue = [[0, 0, false], '*']
    const isVisit = []
    for (let i = 0; i < N; i++) {
        isVisit.push(Array.from(Array(M), () => new Array(2).fill(false)))
    }
    isVisit[0][0][0] = true
    let step = 1
    while (queue.length > 1) {
        const hero = queue.shift()
        if (hero === '*') {
            step += 1
            if (step > T) {
                return 'Fail'
            }
            queue.push('*')
            continue
        }
        for (let i = 0; i < 4; i++) {
            const nx = dx[i] + hero[0]
            const ny = dy[i] + hero[1]
            let hasSword = hero[2]

            if (0 <= nx && nx < N && 0 <= ny && ny < M) {
                if (castle[nx][ny] === 2) {
                    hasSword = true
                }

                if (nx === N - 1 && ny === M - 1) {
                    return step
                } else if (castle[nx][ny] === 1 && hasSword) {
                    if (!isVisit[nx][ny][1]) {
                        queue.push([nx, ny, true])
                        isVisit[nx][ny][1] = true
                    }
                } else if (castle[nx][ny] === 0 || castle[nx][ny] === 2) {
                    if (!isVisit[nx][ny][hasSword ? 1 : 0]) {
                        queue.push([nx, ny, hasSword])
                        isVisit[nx][ny][hasSword ? 1 : 0] = true
                    }
                }
            }
        }
    }
    return 'Fail'
}

console.log(solve(N, M, T, castle))

// 00:31:46 맞았습니다!!