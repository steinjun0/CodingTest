const N = +require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()

const dp = Array.from({length: N+1},()=>[])
dp[0] = [0n,0n]
dp[1] = [0n,1n]
dp[2] = [1n,0n]

for(let i=3;i<=N;i++){
    dp[i][0] = dp[i-1][0] + dp[i-1][1]
    dp[i][1] = dp[i-1][0]
}
console.log((dp[N][0]+dp[N][1]).toString())

// 00:10:36 틀렸습니다 -> BigInt로 변경
// 00:12:30 맞았습니다