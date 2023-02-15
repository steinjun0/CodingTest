const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
const N = +input[0]
const final = input[1].split(' ').map(Number)

function tkShuffle(card, k) {
    let tempCard = [...card]
    tempCard = [...tempCard.slice(N - (2 ** k)), ...tempCard.slice(0, N - (2 ** k))]

    for (let i = k - 1; i >= 0; i--) {
        tempCard = [...tempCard.slice(2 ** i, 2 ** (i + 1)), ...tempCard.slice(0, 2 ** i), ...tempCard.slice(2 ** (i + 1))]
    }

    return tempCard
}

function solve() {
    const card = Array(N).fill(0).map((e, i) => i + 1)
    for (let i = 1; i <= Math.log2(N); i++) {
        const firstShuffle = tkShuffle(card, i)
        for (let j = 1; j <= Math.log2(N); j++) {
            const lastShuffle = tkShuffle(firstShuffle, j)
            if (lastShuffle.join(' ') === input[1]) {
                return [i, j]
            }
        }
    }


}

console.log(solve().join(' '))

// 30:46 맞았습니다!