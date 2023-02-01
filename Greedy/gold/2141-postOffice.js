const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

// [위치, 사람]

function getSame(towns, start, end) {
    let son = 0
    let mom = 0
    for (let i = start; i < end; i++) {
        son += towns[i][0] * towns[i][1]
        mom += towns[i][1]
    }
    return [son / mom, mom]
}

function solve(input) {
    const towns = input.slice(1).map(e => [+e.split(' ')[0], +e.split(' ')[1]]).sort((a, b) => a[0] - b[0])

    let min = 9999999999999999
    let pos = undefined

    for (let i = 1; i < towns.length; i++) {
        let left = 0
        let right = 0


        for (let j = 0; j < i; j++) {
            left += (i - towns[j][0]) * towns[j][1]
        }
        for (let j = i; j < towns.length; j++) {
            right += (towns[j][0] - i) * towns[j][1]
        }
        const res = Math.abs(left - right)
        if (res < min) {
            pos = i
        }
    }

    const start = pos === 0 ? 0 : towns[pos - 1][0]
    const end = towns[pos][0]
    let sameLeft
    let sameRight
    sameLeft = getSame(towns, 0, start)
    sameRight = getSame(towns, end, towns.length)
    const result = (sameLeft[0] * sameLeft[1] + sameRight[0] * sameRight[1]) / (sameLeft[1] + sameRight[1])


    return Math.round(result)

}
console.log(solve(input))

// 00:52:20 틀렸습니다(4%) -> 정답기 제작 ->  가중평균 아닌걸 알아냄 -> 그냥 그리디하게 로직 새로
// 02:02:00 시간초과 (4%)
// 02:36:54 포기
// 마지막에 구현에서 포기. 로직은 어느정도 정리가 됐는데 아쉽다.

// function getAvgPos([x, a], [y, b]) {
//     console.log('[x, a], [y, b]', [x, a], [y, b])
//     console.log('(a * x + b * y) / (a + b)', (a * x + b * y) / (a + b))
//     return (a * x + b * y) / (a + b)
//     // if ((a * x + b * y) === 2 * (a + b)) { // xxx.5일때
//     //     return Math.floor((a * x + b * y) / (a + b))
//     // } else {
//     //     return Math.round((a * x + b * y) / (a + b))
//     // }

// }

// function solve(input) {
//     const N = +input[0]
//     const towns = input.slice(1).map(e => [+e.split(' ')[0], +e.split(' ')[1]]).sort((a, b) => b[1] - a[1])

//     // const total = []
//     // for (let i = 1; i <= Math.max(...towns.map(e => e[0])); i++) {
//     //     let res = 0
//     //     for (let j = 0; j < towns.length; j++) {
//     //         res += Math.abs(i - towns[j][0]) * towns[j][1]
//     //     }
//     //     total.push(res)
//     // }
//     // console.log(total, Math.min(...total), total.indexOf(Math.min(...total)) + 1)

//     let pos = towns[0][0]
//     const tempTowns = [towns[0]]
//     for (let i = 1; i < towns.length; i++) {
//         const town = towns[i]
//         // console.log(town)
//         tempTowns.push(town)

//         // get min
//         let min = 0
//         for (let k = 0; k < tempTowns.length; k++) {
//             min += Math.abs(pos - tempTowns[k][0]) * tempTowns[k][1]
//         }

//         // find new pos
//         if (pos <= town[0]) {
//             for (let j = pos + 1; j <= town[0]; j++) {
//                 let res = 0
//                 for (let k = 0; k < tempTowns.length; k++) {
//                     res += Math.abs(j - tempTowns[k][0]) * tempTowns[k][1]
//                 }

//                 if (res < min) {
//                     min = res
//                 } else {
//                     pos = j - 1
//                     break
//                 }
//             }
//         } else if (pos > town[0]) {
//             for (let j = pos - 1; j >= town[0]; j--) {
//                 let res = 0
//                 for (let k = 0; k < tempTowns.length; k++) {
//                     res += Math.abs(j - tempTowns[k][0]) * tempTowns[k][1]
//                 }
//                 if (res < min) {
//                     min = res
//                 } else {
//                     pos = j + 1
//                     break
//                 }
//             }
//         }
//         // console.log('pos', pos)

//     }
//     return pos

// }