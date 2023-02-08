const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const N = +input[0].split(' ')[0]
const M = +input[0].split(' ')[1]
const table = []
for (let i = 1; i < N + 1; i++) {
    const temp = []
    for (let j = 0; j < M; j++) {
        temp.push(+input[i][j])
    }
    table.push(temp)
}

// console.log(JSON.stringify(table))

function isSquare(numStr) {
    const num = +numStr
    return (~~Math.sqrt(num)) * (~~Math.sqrt(num)) === num
}

function solve() {
    let result = -1
    for (let x = 0; x < N; x++) {
        for (let y = 0; y < M; y++) {
            for (let p = -x; p < N - x; p++) {
                for (let q = -y; q < M - y; q++) {
                    // console.log(x, y, p, 'q', q)
                    if (p === 0 && q === 0) {
                        if (isSquare(table[x][y])) {
                            if (result === -1) {
                                result = `${table[x][y]}`
                            } else {
                                result = +result < +table[x][y] ? `${table[x][y]}` : result
                            }
                        }
                        continue
                    }
                    let numStr = ''
                    for (let i = 0; i < 9; i++) {
                        if (x + i * p < 0 || x + i * p >= N || y + i * q < 0 || y + i * q >= M)
                            continue
                        numStr += table[x + i * p][y + i * q]
                        // console.log(numStr)
                        const numStrRvs = `${+numStr.split('').reverse().join('')}`

                        if (+numStr > result && isSquare(numStr)) {
                            // console.log('numStr', numStr)
                            if (result === -1) {
                                result = `${+numStr}`
                            } else {
                                result = +result < +numStr ? `${+numStr}` : result
                            }
                        }

                        if (+numStrRvs > result && isSquare(numStrRvs)) {
                            // console.log('numStrRvs', numStrRvs)
                            if (result === -1) {
                                result = numStrRvs
                            } else {
                                result = +result < +numStrRvs ? numStrRvs : result
                            }
                        }
                    }
                }
            }
        }
    }
    return result
}

console.log(solve())

// 00:50:22 틀렸습니다(6%) -> 테스트용 숫자 제거
// 00:52:47 틀렸습니다(96%) -> ???? -> N=1, M=1 예외처리
// 00:57:18 맞았습니다!
// 그래프 탐색은 재귀 함수도 나쁘지 않다