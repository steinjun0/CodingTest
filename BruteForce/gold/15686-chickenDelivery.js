const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [N, M] = input[0].split(' ').map(e => +e)
const chickenMap = []

for (let i = 1; i <= N; i++) {
    chickenMap.push(input[i].split(' '))
}

function getDistance([x1, y1], [x2, y2]) {
    return Math.abs(x1 - x2) + Math.abs(y1 - y2)
}

function getCombination(arr, startIndex, r) {
    if (r === 1) {
        const result = []
        for (let i = startIndex; i <= arr.length - r; i++) {
            result.push(arr[i])
        }
        return result
    } else {
        const result = []
        for (let i = startIndex; i <= arr.length - r; i++) {
            result.push(getCombination(arr, i + 1, r - 1).map(e => {
                if (e.flat) {
                    return [arr[i], ...e]
                }
                return [arr[i], e]
            }))
        }
        return result.flat()
    }

}


function getCityDistance(cityMap) {
    const chickens = []
    const homeList = []
    let result = 0

    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (cityMap[i][j] === '2') {
                chickens.push([i, j])
            }
            if (cityMap[i][j] === '1') {
                homeList.push([i, j])
            }
        }
    }
    // console.log(JSON.stringify(cityMap))
    for (let i = 0; i < homeList.length; i++) {
        let shortestDistance = Infinity
        for (let j = 0; j < chickens.length; j++) {
            const distance = getDistance(homeList[i], chickens[j])
            // console.log(i, j, distance)
            if (shortestDistance > distance) {
                shortestDistance = distance
            }
        }
        // console.log(i, shortestDistance)
        result += shortestDistance
    }
    return result
}

function solve() {
    const chickens = []
    const newMap = []
    for (let i = 0; i < N; i++) {
        const temp = []
        for (let j = 0; j < N; j++) {
            if (chickenMap[i][j] === '2') {
                chickens.push([i, j])
                temp.push('0')
            } else {
                temp.push(chickenMap[i][j])
            }
        }
        newMap.push(temp)
    }

    if (chickens.length === M) {
        return getCityDistance(chickenMap)
    }

    let result = Infinity
    const combinations = getCombination(Array(chickens.length).fill(0).map((e, i) => i), 0, M)
    let chickenCombs = []
    if (M === 1) {
        combinations.forEach(i => {
            chickenCombs.push([chickens[i]])
        })
    } else {
        combinations.forEach(arr => {
            const temp = []
            arr.forEach((i) => {
                temp.push(chickens[i])
            })
            chickenCombs.push(temp)
        })
    }
    for (chickenComb of chickenCombs) {
        for (let chicken of chickenComb) {
            newMap[chicken[0]][chicken[1]] = '2'
        }
        const distance = getCityDistance(newMap)
        if (result > distance) {
            result = distance
        }
        for (let chicken of chickenComb) {
            newMap[chicken[0]][chicken[1]] = '0'
        }
    }


    return result

}

console.log(solve())

// 01:21:00 다시 시작
// 01:40:00 틀렸습니다(0%)
// 01:50:00 틀렸습니다(0%)
// 02:27:00 맞았습니다!

for (let count = 0; count < M; count++) {
    // 거리를 최소로 만드는 치킨집 한개를 찾아야함 X -> 모든 치킨집의 조합을 다 넣어봐야함
    let shortestDistance = Infinity

    // let selectedChickenIndex = null
    // for (let i = 0; i < chickens.length; i++) {
    //     if (newMap[chickens[i][0]][chickens[i][1]] = '2')
    //         continue
    //     newMap[chickens[i][0]][chickens[i][1]] = '2'
    //     const distance = getCityDistance(newMap)
    //     if (shortestDistance >= distance) {
    //         result = distance
    //         shortestDistance = distance
    //         selectedChickenIndex = i
    //     }
    //     newMap[chickens[i][0]][chickens[i][1]] = '0'
    // }
    // newMap[chickens[selectedChickenIndex][0]][chickens[selectedChickenIndex][1]] = '2'
}


// function getCityDistance(homeToChickenSet) {
//     let result = 0
//     for (let key in homeToChickenSet) {
//         result += homeToChickenSet[key][0][1]
//     }
//     return result
// }

// function solve() {
//     const homeListSet = {}
//     const chickenListSet = {}
//     const homeToChickenSet = {}
//     for (let i = 0; i < N; i++) {
//         for (let j = 0; j < N; j++) {
//             const location = chickenMap[i][j]
//             if (location === '1') {
//                 homeListSet[i * N + j] = [i, j]
//             }
//             else if (location === '2') {
//                 chickenListSet[i * N + j] = [i, j]
//             }
//         }
//     }


//     for (let homeKey in homeListSet) {
//         const homePosition = homeListSet[homeKey]
//         const temp = []
//         for (let chickenKey in chickenListSet) {
//             const chickenPosition = chickenListSet[chickenKey]
//             temp.push([chickenKey, getDistance(homePosition, chickenPosition)])
//         }
//         temp.sort((a, b) => a[1] - b[1])

//         homeToChickenSet[homeKey] = temp
//     }

//     console.log(JSON.stringify(homeToChickenSet))

//     while (Object.keys(chickenListSet).length > M) {
//         // delete logic
//         let lostDistance = 0
//         let worstChickenKey = null
//         let bestLostDistance = 101

//         for (let chickenKey in chickenListSet) {
//             for (let homeKey in homeToChickenSet) {
//                 if (homeToChickenSet[homeKey][0][0] === chickenKey) {
//                     lostDistance += homeToChickenSet[homeKey][1][1] - homeToChickenSet[homeKey][0][1]
//                 }
//             }
//             console.log(chickenKey, lostDistance, worstChickenKey, bestLostDistance)
//             if (lostDistance < bestLostDistance) {
//                 // console.log(chickenKey, lostDistance)
//                 bestLostDistance = lostDistance
//                 worstChickenKey = chickenKey
//             }
//             lostDistance = 0
//         }

//         delete chickenListSet[worstChickenKey]

//         for (let homeKey in homeToChickenSet) {
//             homeToChickenSet[homeKey] = homeToChickenSet[homeKey].filter((e) => {
//                 return e[0] !== worstChickenKey
//             }).sort((a, b) => a[1] - b[1])
//         }
//     }

//     console.log('homeToChickenSet', JSON.stringify(homeToChickenSet))
//     return getCityDistance(homeToChickenSet)
// }