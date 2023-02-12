const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [H, W] = input[0].split(' ').map(Number)
const blocks = input[1].split(' ').map(Number)

function solve() {
    let start = -2
    let result = 0
    for (let h = 0; h <= H; h++) {
        for (let i = 0; i < W; i++) {
            if (start === -2 && blocks[i] > h) {
                start = -1
            }
            if (start === -1) {
                if (blocks[i] <= h) {
                    start = i
                }
            } else {
                if (blocks[i] > h) {
                    const end = i
                    // console.log('end - start, h', end - start, h)
                    result += end - start
                    start = -1
                }
            }
            // console.log(start, h)
        }
        start = -2
    }
    return result
}

console.log(solve())

// 00:34:51 틀렸습니다(0%) -> 연속 감소 케이스 고려
// 00:48:40 틀렸습니다(0%) -> 로직 변경
// 01:10:00 틀렸습니다(0%) -> 연속 등장 케이스 고려
// 01:13:10 맞았습니다!


//     let maxTop = 0
//     let top = 0
//     let isPond = false
//     let startIndex = 0
//     let result = 0
//     for (let i = 0; i < W - 1; i++) {
//         if (isPond) {
//             if (blocks[i + 1] >= maxTop || i === W - 2) {
//                 top = Math.min(Math.max(blocks[i + 1], top), maxTop)

//                 const step = i - startIndex + 1
//                 // console.log('blocks.slice(startIndex, i)', blocks.slice(startIndex, i + 1))
//                 const underBlocks = (blocks.slice(startIndex, i + 1)
//                     .reduce((sum, e) => {
//                         if (e > top) {
//                             return sum + top
//                         } else {
//                             return sum + e
//                         }
//                     })) - (blocks[startIndex] - top)
//                 // console.log('underBlocks', underBlocks)
//                 const water = (top) * step - underBlocks
//                 console.log('top', top, 'maxTop', maxTop, 'step', step)
//                 console.log(water)
//                 result += water
//                 isPond = false
//                 startIndex = 0
//                 top = 0
//             }
//         } else {
//             // if decrease
//             if (blocks[i] > blocks[i + 1]) {
//                 isPond = true
//                 maxTop = blocks[i]
//                 startIndex = i + 1
//             }
//         }
//     }