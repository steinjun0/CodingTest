// const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
//     .toString()
//     .trim()
//     .split('\n')


const rl = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout,
});

let count = 0
let N = 0, K = 0

let dp = []
// input.sort((a, b) => b - a)
// for (let i = 1; i <= N; i++) {
//     const coin = +input[i]
//     for (let i = 1; i * coin <= K; i++) {
//         dp[i * coin] += 1
//     }

//     for (let i = coin + 1; i <= K - coin; i++) {
//         if (dp[i] !== 0) {
//             dp[i + coin] += dp[i]
//             if ((i + coin) % coin === 0)
//                 dp[i + coin] -= 1
//         }
//     }
// }
rl.on('line',
    function (line) {
        // console.log('count', count)
        if (count === 0) {
            input.push(line.trim());
            N = +input[0].split(' ')[0]
            K = +input[0].split(' ')[1]
            dp = Array(K + 1).fill(0)
        }
        else {
            input.push(line.trim());
            const coin = +line.trim()
            // console.log('coin', coin)

            for (let i = 1; i * coin <= K; i++) {
                dp[i * coin] += 1
            }


            for (let i = 1; i <= K - coin; i++) {
                if (dp[i] !== 0) {
                    dp[i + coin] += dp[i]
                    if ((i + coin) % coin === 0)
                        dp[i + coin] -= 1
                }
            }
            // console.log(dp)

        }
        if (count === N) {
            rl.close()
        }
        count++


    })
    .on('close',
        function () {
            console.log(dp[dp.length - 1])
        });


// const N = +input[0].split(' ')[0]
// const K = +input[0].split(' ')[1]

// function solve(N, K, input) {
//     const dp = Array(K + 1).fill(0)
//     input.sort((a, b) => b - a)
//     for (let i = 1; i <= N; i++) {
//         const coin = +input[i]
//         for (let i = 1; i * coin <= K; i++) {
//             dp[i * coin] += 1
//         }

//         for (let i = coin + 1; i <= K - coin; i++) {
//             if (dp[i] !== 0) {
//                 dp[i + coin] += dp[i]
//                 if ((i + coin) % coin === 0)
//                     dp[i + coin] -= 1
//             }
//         }
//     }
//     return dp[dp.length - 1]
// }

// console.log(solve(N, K, input))

// 00:39:55 메모리초과(0%) -> 코인 개수로 반복 회수 줄임, 매번 중복 제거
// 00:46:40 메모리 초과(0%) -> 문자열로 변환
// 00:52:20 메모리 초과(3%) -> 개수만 세는걸로 변경
// 01:27:16 메모리 초과(3%) -> ??? -> slice 제거
// 01:31:50 메모리 초과(3%) -> input 자체를 못받음 -> 중단 후 input 변경
// 01:42:16 

// const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
//     .toString()
//     .trim()
//     .split('\n')

// const N = +input[0].split(' ')[0]
// const K = +input[0].split(' ')[1]
// const coins = input.slice(1).map((e) => +e)
// function solve(N, K, coins) {
//     const dp = Array(K + 1).fill(0)
//     coins.sort((a, b) => b - a)

//     for (let coin of coins) {
//         // console.log(coin)
//         for (let i = 1; i * coin <= K; i++) {
//             dp[i * coin] += 1
//         }

//         for (let i = coin + 1; i <= K - coin; i++) {
//             if (dp[i] !== 0) {
//                 dp[i + coin] += dp[i]
//                 if ((i + coin) % coin === 0)
//                     dp[i + coin] -= 1
//             }
//         }
//     }
//     return dp[dp.length - 1]
// }

// console.log(solve(N, K, coins))

// // 00:39:55 메모리초과(0%) -> 코인 개수로 반복 회수 줄임, 매번 중복 제거
// // 00:46:40 메모리 초과(0%) -> 문자열로 변환
// // 00:52:20 메모리 초과(3%)

// const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
//     .toString()
//     .trim()
//     .split('\n')

// const N = +input[0].split(' ')[0]
// const K = +input[0].split(' ')[1]

// function solve(N, K, input) {
//     const dp = Array(K + 1).fill(0)
//     input.sort((a, b) => b - a)
//     for (let i = 1; i <= N; i++) {
//         const coin = +input[i]
//         for (let i = 1; i * coin <= K; i++) {
//             dp[i * coin] += 1
//         }

//         for (let i = coin + 1; i <= K - coin; i++) {
//             if (dp[i] !== 0) {
//                 dp[i + coin] += dp[i]
//                 if ((i + coin) % coin === 0)
//                     dp[i + coin] -= 1
//             }
//         }
//     }
//     return dp[dp.length - 1]
// }

// console.log(solve(N, K, input))

// // 00:39:55 메모리초과(0%) -> 코인 개수로 반복 회수 줄임, 매번 중복 제거
// // 00:46:40 메모리 초과(0%) -> 문자열로 변환
// // 00:52:20 메모리 초과(3%) -> 개수만 세는걸로 변경
// // 01:27:16 메모리 초과(3%) -> ???