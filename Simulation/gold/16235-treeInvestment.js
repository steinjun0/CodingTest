const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [N, M, K] = input[0].split(' ').map(Number)
const A = input.slice(1, 1 + N).map(e => e.split(' ').map(Number))
const initialTrees = input.slice(1 + N).map(e => e.split(' ').map(Number)).map(e => [e[0] - 1, e[1] - 1, e[2]])

const directions = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]]

function solve(N, M, K, A, initialTrees) {

    const soils = []
    for (let i = 0; i < N; i++) {
        soils.push(Array(N).fill(5))
    }

    let trees = [...initialTrees]
    let count = 0
    while (count++ < K) {
        // Spring
        trees.sort((a, b) => b[2] - a[2])
        for (let i = trees.length - 1; i >= 0; i--) {
            const [x, y, age] = trees[i]
            if (soils[x][y] < age) {
                trees[i][2] *= -1
            } else {
                soils[x][y] -= age
                trees[i][2] += 1
            }
        }

        // Summer&&Autumn
        const newTrees = []
        // console.table(trees)
        for (const tree of trees) {
            const [x, y, age] = tree
            if (age < 0) {
                soils[x][y] += Math.floor(-age / 2)
            } else {
                newTrees.push([x, y, age])
                if (tree[2] % 5 === 0) {
                    for (const direction of directions) {
                        const nx = tree[0] + direction[0]
                        const ny = tree[1] + direction[1]
                        if (0 <= nx && nx < N && 0 <= ny && ny < N) {
                            newTrees.push([nx, ny, 1])
                        }
                    }
                }
            }
        }
        trees = newTrees

        // Winter
        for (let i = 0; i < N; i++) {
            for (let j = 0; j < N; j++) {
                soils[i][j] += A[i][j]
            }
        }

    }

    return trees.length
}

console.log(solve(N, M, K, A, initialTrees))

// 00:44:50 시간초과 (10%)(...) -> newTree 새배열 없이 생성
// 00:48:40 시간초과 (0%) ??? -> newTree는 롤백, splice 제거, summer, autumn 합침
// 00:59:30 맞았습니다!