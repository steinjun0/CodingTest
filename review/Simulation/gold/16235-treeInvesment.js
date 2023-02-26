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
        const newTree = []
        const diedSoil = new Set()
        for (let i = trees.length - 1; i >= 0; i--) {
            const [x, y, age] = trees[i]
            if (soils[x][y] < age || diedSoil.has(x * N + y)) {
                soils[x][y] += Math.floor(age / 2)
                diedSoil.add(x * N + y)
            } else {
                soils[x][y] -= age
                trees[i][2] += 1

                newTree.push(trees[i])
                if (trees[i][2] % 5 === 0) {
                    for (const direction of directions) {
                        const nx = trees[i][0] + direction[0]
                        const ny = trees[i][1] + direction[1]
                        if (0 <= nx && nx < N && 0 <= ny && ny < N) {
                            newTree.push([nx, ny, 1])
                        }
                    }
                }
            }
        }

        trees = newTree

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
// for...of -> for문으로 변경 -> 시간늘어남(...?)
// newTree 제거(다시) -> 시간 초과... -> filter로 false 제거 -> 시간초과
// for ...of 로 변경

// for of, for 와 같은 문제가 아니라
// iterate할 데이터를 tree로 잡는냐 soil로 잡느냐의 문제
// soil로 잡도록 데이터를 구성했으면 스킵할 iteration이 많아짐
// tree로 iterate하면 무조건 전체 길이를 iteration해야함