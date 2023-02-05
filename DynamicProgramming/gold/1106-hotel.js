const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const C = +input[0].split(' ')[0]
const N = +input[0].split(' ')[1]

const data = input.slice(1).map(e => [+e.split(' ')[0], +e.split(' ')[1]])

function getMinimumMoney(customer, data) {
    for (let i = 0; i < data.length; i++) {
        if (customer % data[i][1] === 0) {
            return (customer / data[i][1]) * data[i][0]
        }
    }
    return -1
}

function solve(C, N, data) {
    data.sort((a, b) => (b[1] / b[0]) - (a[1] / a[0]))
    const dp = Array(C + 101).fill(-1)
    let res = 100000000
    for (let i = 1; i < C + 101; i++) {
        const money = getMinimumMoney(i, data)
        dp[i] = money

        for (let j = i - 1; j >= ~~(i / 2); j--) {
            if (dp[j] !== -1) {
                if (dp[i - j] !== -1) {
                    if (dp[i] === -1) {
                        dp[i] = dp[j] + dp[i - j]
                    } else {
                        dp[i] = Math.min(dp[i], dp[j] + dp[i - j])
                    }
                }
            }
        }
        if (dp[i] !== -1) {
            if (i === C)
                res = dp[i]
            else if (i > C)
                res = Math.min(res, dp[i])
        }


    }
    // console.log(dp)
    // return Math.min(...dp.slice(C).filter(e => e !== -1))
    return res
}

console.log(solve(C, N, data))

// 00:35:10 틀렸습니다(0%) -> 예제에 틀린게 있었음 -> C보다 큰 경우 처리
// 00:45:22 틀렸습니다(0%) -> input 다르게 받음
// 00:54:40 틀렸습니다(0%) -> for 범위 조정 -> 틀렸습니다 -> 예외처리(최소갑에 -1이 들어가는게 있었음)
// 01:11:53 맞았습니다!!
// 1. 로직이 맞다고 생각이 될 때는, 고민을 더 하지 말고 코드를 다시 살펴보자
// 2. dp를 풀때 고려하자.
// i보다 큰 값을 가장 작은 값으로 구해라 -> i+j가 i보다 작은 값이라면 i를 그것으로 갱신
// 마지막에 갱신하지 않고, 중간에 갱신하면 된다.
