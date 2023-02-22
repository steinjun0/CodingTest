const tetrominos = [
    [
        [0, 0], [0, 1], [0, 2], [0, 3]
    ],
    [
        [0, 0],
        [1, 0],
        [2, 0],
        [3, 0]
    ],

    [
        [0, 0], [0, 1], [0, 2],
        [1, 0]
    ],
    [
        [0, 0], [0, 1], [0, 2],
        [1, 1]
    ],
    [
        [0, 0], [0, 1], [0, 2],
        [1, 2]
    ],

    [
        [0, 0],
        [1, 0], [1, 1], [1, 2]
    ],
    [
        [0, 1],
        [1, 0], [1, 1], [1, 2]
    ],
    [
        [0, 2],
        [1, 0], [1, 1], [1, 2]
    ],

    [
        [0, 0], [0, 1],
        [1, 0],
        [2, 0],
    ],
    [
        [0, 0], [1, 1],
        [1, 0],
        [2, 0],
    ],
    [
        [0, 0], [2, 1],
        [1, 0],
        [2, 0],
    ],

    [
        [0, 0], [0, 1],
        [1, 1],
        [2, 1],
    ],
    [
        [1, 0], [0, 1],
        [1, 1],
        [2, 1],
    ],
    [
        [2, 0], [0, 1],
        [1, 1],
        [2, 1],
    ],

    [
        [0, 1],
        [1, 0], [1, 1],
        [2, 0]
    ],
    [
        [0, 0],
        [1, 0], [1, 1],
        [2, 1]
    ],

    [
        [0, 0], [0, 1],
        [1, 0], [1, 1]
    ],

    [
        [0, 1], [0, 2],
        [1, 0], [1, 1]
    ],
    [
        [0, 0], [0, 1],
        [1, 1], [1, 2]
    ]
]

const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [N, M] = input[0].split(' ').map(Number)

const paper = input.slice(1).map(e => e.split(' ').map(Number))

function solve(N, M, paper) {

    let result = 0
    for (tetromino of tetrominos) {
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < M; j++) {
                const filter = tetromino
                    .map(e => [e[0] + i, e[1] + j])
                if (filter.find(e => 0 > e[0] || e[0] >= N || 0 > e[1] || e[1] >= M))
                    continue
                const sum = filter.reduce((sum, e) =>
                    sum += paper[e[0]][e[1]], 0)
                result = Math.max(result, sum)

            }
        }
    }
    return result
}

console.log(solve(N, M, paper))

// 00:30:35 틀렸습니다 -> tetromino 틀린부분 발견
// 00:50:12 틀렸습니다 -> tetromino 빠진 부분 발견(...)
// 01:03:00 맞았습니다!!