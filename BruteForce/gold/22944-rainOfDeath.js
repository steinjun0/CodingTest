const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')


const dirX = [0, 0, 1, -1]
const dirY = [1, -1, 0, 0]

function solve(input) {
    const [N, H, D] = input[0].split(' ').map(Number)
    const map = []
    const umbrellas = []
    let start
    for (let i = 0; i < N; i++) {
        const row = input[i + 1].split('')
        let sCol = row.indexOf('S')
        if (sCol !== -1) {
            start = [i, sCol]
        }
        for (let j = 0; j < N; j++) {
            if (row[j] === 'U')
                umbrellas.push([i, j])
        }
        map.push(row)
    }

    function updateDestination(startPos, initStep, dstPos, initH, initUmb) {
        // pos, step, h, umb
        const queue = [[startPos, initStep, initH, initUmb]]
        const isVisited = []
        for (let i = 0; i < N; i++) {
            isVisited.push(Array(N).fill(false))
        }

        while (queue.length > 0) {
            const [pos, step, h, umb, usedUmb] = queue.shift()
            for (let i = 0; i < 4; i++) {
                const nx = dirX[i] + pos[0]
                const ny = dirY[i] + pos[1]

                if (0 <= nx && nx < N && 0 <= ny && ny < N) {
                    if (!isVisited[nx][ny]) {
                        if (nx === dstPos[0] && ny === dstPos[1]) {
                            return [step + 1, h]
                        }
                        else if (map[nx][ny] === '.') {
                            if (umb > 0) {
                                queue.push([[nx, ny], step + 1, h, umb - 1, usedUmb])
                            }
                            else {
                                if (h > 1) {
                                    queue.push([[nx, ny], step + 1, h - 1, 0, usedUmb])
                                }
                            }
                        }
                        isVisited[nx][ny] = true
                    }

                }
            }
        }
        return false
    }

    const umbrellasInfo = {}

    const queue = [[start, 0, H, 0]]
    while (queue.length > 0) {
        const [pos, step, h, umb] = queue.shift()
        for (const umbrella of umbrellas) {
            if (umbrellasInfo[umbrella[0] * N + umbrella[1]])
                continue
            const temp = updateDestination(pos, step, umbrella, h, umb)
            if (temp) {
                if (umbrellasInfo[umbrella[0] * N + umbrella[1]]) {
                    umbrellasInfo[umbrella[0] * N + umbrella[1]].push(temp)
                } else {
                    umbrellasInfo[umbrella[0] * N + umbrella[1]] = [temp]
                }
                queue.push([umbrella, temp[0], temp[1], D - 1])
            }
        }
    }



    // const queue = [[start, 0, H, 0, [], []]]
    // const isVisited = []
    // let minStep = Infinity
    // for (let i = 0; i < N; i++) {
    //     isVisited.push(Array(N).fill(false))
    // }

    // while (queue.length > 0) {
    //     const [pos, step, h, umb, usedUmb] = queue.shift()
    //     for (let i = 0; i < 4; i++) {
    //         const nx = dirX[i] + pos[0]
    //         const ny = dirY[i] + pos[1]

    //         if (0 <= nx && nx < N && 0 <= ny && ny < N) {
    //             if (!isVisited[nx][ny]) {
    //                 if (map[nx][ny] === 'E') {
    //                     return step + 1
    //                 }
    //                 else if (map[nx][ny] === 'U') {
    //                     if (!usedUmb.find(e => e[0] === nx && e[1] === ny)) {
    //                         for (let t = 0; t < isVisited.length; t++) {
    //                             isVisited[t].fill(false)
    //                         }
    //                         isVisited[nx][ny] = true
    //                         queue.push([[nx, ny], step + 1, h, D - 1, [...usedUmb, [nx, ny]]])
    //                     } else {
    //                         if (umb > 0) {
    //                             queue.push([[nx, ny], step + 1, h, umb - 1, usedUmb])
    //                         }
    //                         else {
    //                             if (h > 1) {
    //                                 queue.push([[nx, ny], step + 1, h - 1, 0, usedUmb])
    //                             }
    //                         }
    //                     }
    //                 }
    //                 else if (map[nx][ny] === '.') {
    //                     if (umb > 0) {
    //                         queue.push([[nx, ny], step + 1, h, umb - 1, usedUmb])
    //                     }
    //                     else {
    //                         if (h > 1) {
    //                             queue.push([[nx, ny], step + 1, h - 1, 0, usedUmb])
    //                         }
    //                     }
    //                 }
    //                 isVisited[nx][ny] = true
    //             }

    //         }
    //     }
    // }

    // if (minStep === Infinity) {
    //     return -1
    // } else {
    //     return minStep
    // }

}

console.log(solve(input))

// 00:35:17 런타임 에러 -> pop shift로 변경
// 00:41:30 런타임 에러 -> N 하드코딩된 부분 수정
// 00:44:00 틀렸습니다 (67%) -> 우산이 사용된지 안된지 알아야한다. -> 우산 사용 여부 넘김
// 01:06:50 틀렸습니다 (0%) -> 우산 들고 있으면 isVisited 무시
// 01:23:00 시간초과 (0%) -> 우산 들면 isVisited 초기화 
// 01:26:50 시간초과 (0%) -> 우산 들면 isVisited 초기화 그리고 우산 자리 isVisited true
// 01:53:38 포기 너무 복잡해짐


// 10 10000 4
// S........U
// ..........
// ..........
// ..........
// ..........
// ..........
// ..........
// ..........
// ..........
// .........E

// function solve(input) {
//     const [N, H, D] = input[0].split(' ').map(Number)
//     const map = []
//     let start
//     for (let i = 0; i < N; i++) {
//         const row = input[i + 1].split('')
//         let sCol = row.indexOf('S')
//         if (sCol !== -1) {
//             start = [i, sCol]
//         }
//         map.push(row)
//     }

//     const queue = [[start, 0, H, 0, [], []]]
//     const isVisited = []
//     let minStep = Infinity
//     for (let i = 0; i < N; i++) {
//         isVisited.push(Array(N).fill(false))
//     }

//     while (queue.length > 0) {
//         const [pos, step, h, umb, usedUmb] = queue.shift()
//         for (let i = 0; i < 4; i++) {
//             const nx = dirX[i] + pos[0]
//             const ny = dirY[i] + pos[1]

//             if (0 <= nx && nx < N && 0 <= ny && ny < N) {
//                 if (!isVisited[nx][ny]) {
//                     if (map[nx][ny] === 'E') {
//                         return step + 1
//                     }
//                     else if (map[nx][ny] === 'U') {
//                         if (!usedUmb.find(e => e[0] === nx && e[1] === ny)) {
//                             for (let t = 0; t < isVisited.length; t++) {
//                                 isVisited[t].fill(false)
//                             }
//                             isVisited[nx][ny] = true
//                             queue.push([[nx, ny], step + 1, h, D - 1, [...usedUmb, [nx, ny]]])
//                         } else {
//                             if (umb > 0) {
//                                 queue.push([[nx, ny], step + 1, h, umb - 1, usedUmb])
//                             }
//                             else {
//                                 if (h > 1) {
//                                     queue.push([[nx, ny], step + 1, h - 1, 0, usedUmb])
//                                 }
//                             }
//                         }
//                     }
//                     else if (map[nx][ny] === '.') {
//                         if (umb > 0) {
//                             queue.push([[nx, ny], step + 1, h, umb - 1, usedUmb])
//                         }
//                         else {
//                             if (h > 1) {
//                                 queue.push([[nx, ny], step + 1, h - 1, 0, usedUmb])
//                             }
//                         }
//                     }
//                     isVisited[nx][ny] = true
//                 }

//             }
//         }
//     }

//     if (minStep === Infinity) {
//         return -1
//     } else {
//         return minStep
//     }

// }