const input = require('fs')
    .readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const N = +input[0]
const K = +input[1]
const tempSensors = input[2].split(' ').map(e => +e)
const sensors = Array.from(new Set(tempSensors)).sort((a, b) => a - b)

function solve(N, K, sensors) {
    // console.log(sensors)
    const diff = {}
    for (let i = 0; i < sensors.length - 1; i++) {
        const gap = sensors[i + 1] - sensors[i]
        if (diff[gap] === undefined)
            diff[gap] = []
        diff[gap].push(i)
    }
    // console.log(JSON.stringify(diff))
    let numBases = K - 1
    // const bases = []
    keys = Object.keys(diff)
    keys.sort((a, b) => b - a)

    let partitions = 0
    for (let key of keys) {
        if (diff[key].length <= numBases) {
            partitions += +key * diff[key].length
            // bases.push(...diff[key])
            numBases -= diff[key].length
        } else {
            partitions += +key * numBases
            // bases.push(+key)
            numBases = 0
        }
        if (numBases === 0)
            break
    }
    let sum = 0
    for (let key in diff) {
        // console.log('key', key, diff[key].length)
        sum += (+key) * diff[key].length
    }
    // console.log(partitions)
    // console.log(sum)
    console.log(sum - partitions)


    for (let i = 0; i < K; i++) {

    }
}

solve(sensors.length, K, sensors)

// 02:11:13 맞았습니다! -> 동전 문제가 너무 늦게 생각남