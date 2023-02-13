const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [N, M] = input[0].split(' ').map(Number)
const waterMap = []
for (let i = 1; i <= N; i++) {
    waterMap.push(...input[i].split(' ').map(Number))
}

const commands = []
for (let i = 1 + N; i < 1 + N + M; i++) {
    commands.push(input[i].split(' ').map(Number))
}

const commandsConverter = {
    1: [0, -1],
    2: [-1, -1],
    3: [-1, 0],
    4: [-1, 1],
    5: [0, 1],
    6: [1, 1],
    7: [1, 0],
    8: [1, -1],
}

function printMap(someMap) {
    for (let i = 0; i < N; i++) {
        console.log(someMap[i])
    }
    console.log('')
}

function solve() {
    let clouds = [[N - 1, 0], [N - 1, 1], [N - 2, 0], [N - 2, 1]]


    for (let count = 0; count < M; count++) {
        const direction = commandsConverter[commands[count][0]]
        const step = commands[count][1]

        // 1. move clouds
        for (let i = 0; i < clouds.length; i++) {
            clouds[i][0] += direction[0] * step
            clouds[i][1] += direction[1] * step

            for (let j = 0; j < 2; j++) {
                if (clouds[i][j] >= N)
                    clouds[i][j] %= N
                if (clouds[i][j] < 0)
                    clouds[i][j] = (clouds[i][j] % N) + N === N ? 0 : (clouds[i][j] % N) + N
            }
        }

        // 2. rain
        for (let i = 0; i < clouds.length; i++) {
            const [x, y] = [clouds[i][0], clouds[i][1]]
            waterMap[x * N + y] += 1
        }



        // 4. water bug
        const memoWater = Array(N * N).fill(0)


        const checkPoints = [[-1, -1], [1, -1], [1, 1], [-1, 1]]
        for (pastCloud of clouds) {
            const [i, j] = pastCloud
            for (checkPoint of checkPoints) {
                const nx = i + checkPoint[0]
                const ny = j + checkPoint[1]
                if (0 <= nx && nx < N && 0 <= ny && ny < N) {
                    if (waterMap[nx * N + ny] > 0) {
                        memoWater[i * N + j] += 1
                    }
                }
            }
        }


        for (let i = 0; i < N * N; i++) {
            waterMap[i] += memoWater[i]
        }

        // 3. remove clouds
        const pastCloudsIndex = clouds.map(e => e[0] * N + e[1])
        clouds = []

        // 5. create cloud
        for (let i = 0; i < N * N; i++) {
            if (waterMap[i] >= 2) {
                clouds.push([~~(i / N), i % N])
                waterMap[i] -= 2
            }
        }

        clouds = clouds.filter(cloud => {
            if (pastCloudsIndex.includes(cloud[0] * N + cloud[1])) {
                waterMap[cloud[0] * N + cloud[1]] += 2
                return false
            } else {
                return true
            }
        })

    }

    let result = 0
    for (let i = 0; i < N * N; i++) {
        result += waterMap[i]
    }
    // printMap(waterMap)

    return result
}


console.log(solve())

// 00:52:46 시간초과(0%) -> 위치 보정 계산 while 제거
// 00:58:38 시간초과(0%) -> 3중 for문 제거
// 01:08:00 시간초과(0%) -> 2차원 배열 1차원으로 축소
// 01:18:20 시간초과(0%) -> 2중 for문 제거
// 01:21:20 시간초과(0%) -> for문 내 array fill 제거
// 01:22:50 시간초과(0%) -> postClouds 1차원으로 축소
// 01:45:00 맞았습니다