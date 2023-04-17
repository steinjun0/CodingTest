const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname, '../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')

const [N,K] = input[0].split(' ').map(Number)
const coins = input.slice(1).map(Number)

const dp = Array(K+1).fill(0)
for(const coin of coins){
    for(let i=coin;i<=K;i++){
        if(i===coin){
            dp[i] += 1
        }else{
            dp[i] += dp[i-coin] ?? 0
        }
    }
}
console.log(dp[K])

// 00:10:33 메모리 초과 -> 
// 