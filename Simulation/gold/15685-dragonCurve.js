const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const N = +input[0]
const dragonCurvesData = input.slice(1).map(e => e.split(' ').map(Number))

const directions = [[1, 0], [0, -1], [-1, 0], [0, 1]]

function getClockwisedPoints(inputPoints, fixedPoint) {
    return inputPoints
        .map(e => [e[0] - fixedPoint[0], e[1] - fixedPoint[1]])
        .map(e => [e[1] * -1, e[0]])
        .map(e => [e[0] + fixedPoint[0], e[1] + fixedPoint[1]])
}

function getDragonCurve(x, y, d, g) {
    let direction = directions[d]

    const points = new Set()
    points.add(`${x} ${y}`)
    points.add(`${x + direction[0]} ${y + direction[1]}`)
    let endPoint = [x + direction[0], y + direction[1]]
    for (let i = 1; i <= g; i++) {
        const nextPoints = getClockwisedPoints(Array.from(points).map(e => e.split(' ').map(Number)), endPoint)
        nextPoints.map(e => `${e[0]} ${e[1]}`).forEach(e => points.add(e)) // review!!
        endPoint = getClockwisedPoints([[x, y]], endPoint)[0]
    }

    return points
}

function countSquare(points) {
    let squareCount = 0
    for (let i = 0; i < 100; i++) {
        for (let j = 0; j < 100; j++) {
            const squarePoints = [[i, j], [i + 1, j], [i + 1, j + 1], [i, j + 1]]
            let count = 0

            for (let p = 0; p < points.length; p++) {
                if (squarePoints.find(e => (e[0] === points[p][0] && e[1] === points[p][1])) !== undefined) {
                    count++
                }
            }

            if (count === 4) {
                squareCount++
            }
        }
    }

    return squareCount
}

const temp = []
for (const data of dragonCurvesData) {
    temp.push(...getDragonCurve(...data))
}
resultPoints = [...new Set(temp)].map(e => e.split(' ').map(Number))
console.log(countSquare(resultPoints))

// 02:00:08 맞았습니다!!


// function getFarthestPoint(points, startPoint) {
//     const distances = points
//         .map(p => (p[0] - startPoint[0]) ** 2 + (p[1] - startPoint[1]) ** 2)

//     let most = -1
//     let result
//     for (let i = 0; i < points.length; i++) {
//         if (distances[i] > most) {
//             most = distances[i]
//             result = points[i]
//         }
//     }
//     return result
// }