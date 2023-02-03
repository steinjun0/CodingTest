const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const N = +input[0]
const originLights = input[1].split('').map(Number)
const resultLights = input[2].split('').map(Number)

function solve(N, originLights, resultLights) {
    if (originLights === resultLights) {
        return 0
    }

    const normalLights = originLights.map((e, i) => e === resultLights[i] ? 0 : 1)
    const zCommands = Array(N).fill(-1)
    const oCommands = Array(N).fill(-1)

    let isFailZCommands = false
    let isFailOCommands = false

    for (let i = 0; i < normalLights.length; i++) {
        if (i === 0) {
            zCommands[0] = 0
            oCommands[0] = 1
        }
        else if (i === 1) {
            if (normalLights[0] === 0) {
                zCommands[1] = 0
                oCommands[1] = 1
            }
            else if (normalLights[0] === 1) {
                zCommands[1] = 1
                oCommands[1] = 0
            }
        }
        else {
            if (normalLights[i - 1] === 0) {
                if ([0, 2].includes(zCommands[i - 2] + zCommands[i - 1])) {
                    zCommands[i] = 0
                }
                else {
                    zCommands[i] = 1
                }

                if ([0, 2].includes(oCommands[i - 2] + oCommands[i - 1])) {
                    oCommands[i] = 0
                }
                else {
                    oCommands[i] = 1
                }
            }
            else if (normalLights[i - 1] === 1) {
                if ([0, 2].includes(zCommands[i - 2] + zCommands[i - 1])) {
                    zCommands[i] = 1
                }
                else {
                    zCommands[i] = 0
                }

                if ([0, 2].includes(oCommands[i - 2] + oCommands[i - 1])) {
                    oCommands[i] = 1
                }
                else {
                    oCommands[i] = 0
                }
            }
        }

    }

    if (normalLights[normalLights.length - 1] === 1) {
        if (zCommands[zCommands.length - 2] + zCommands[zCommands.length - 1] !== 1)
            isFailZCommands = true
        if (oCommands[oCommands.length - 2] + oCommands[oCommands.length - 1] !== 1)
            isFailOCommands = true
    } else {
        if (zCommands[zCommands.length - 2] + zCommands[zCommands.length - 1] === 1)
            isFailZCommands = true
        if (oCommands[oCommands.length - 2] + oCommands[oCommands.length - 1] === 1)
            isFailOCommands = true
    }

    // console.log(zCommands, oCommands)
    // console.log(isFailZCommands, isFailOCommands)

    if (isFailZCommands && isFailOCommands)
        return -1

    let min = N
    if (!isFailZCommands) {
        const temp = zCommands.reduce((sum, e) => sum += e)
        if (temp < min)
            min = temp
    }

    if (!isFailOCommands) {
        const temp = oCommands.reduce((sum, e) => sum += e)
        if (temp < min)
            min = temp
    }


    return min
}

console.log(solve(N, originLights, resultLights))

// 00:40:00~00:50:00 알고리즘 확정
// 01:45:43 방식 변경
// 02:18:11 맞았습니다!


// for (let i = 0; i < originLights.length - 1; i++) {
//     const isDiff = originLights[i] !== resultLights[i]

//     if (i === 0) {
//         if (isDiff) {
//             commands[i] = 1
//         } else {
//             commands[i] = 0
//             // commands[i] = [0, 2]
//         }
//     }
//     else if (i === originLights.length - 1) {
//         if (isDiff) {
//             commands[i] = 1
//         } else {
//             if ([0, 1].includes(commands[i - 1])) {
//                 commands[i] = 0
//             } else {
//                 commands[i] = 2
//             }
//         }
//     } else {
//         if (isDiff) {
//             if ([0, 1].includes(commands[i - 1])) {
//                 commands[i] = 1
//             } else if (commands[i - 1] === 2) {
//                 commands[i] = 1
//                 //     const isNextDiff = originLights[i + 1] !== resultLights[i + 1]
//                 // if (isNextDiff) {
//                 //     commands[i] = 1
//                 // } else {
//                 //     commands[i] = [1, 3]
//                 // }
//             } else if (commands[i - 1] === 3) {
//                 commands[i] = 3
//             }

//         } else {
//             if (commands[i - 1] === 0) {
//                 commands[i] = 0
//             } else if (commands[i - 1] === 1) {
//                 commands[i] = 0
//                 // commands[i] = [0, 2]
//             } else if ([2, 3].includes(commands[i - 1])) {
//                 commands[i] = 2
//             }

//         }
//     }
// }

// const tempResultLights = [...originLights]
// for (let i = 0; i < commands.length; i++) {
//     const command = commands[i]
//     if (i === 0) {
//         tempResultLights[0]
//     }

// }