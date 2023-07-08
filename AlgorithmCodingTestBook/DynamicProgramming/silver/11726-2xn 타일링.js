const N = +require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()

const dp = Array({length: N+1},()=>0)
dp[0] = 0n
dp[1] = 1n
dp[2] = 2n
dp[3] = 3n

const mod = 10007n
for(let i=4;i<=N;i++){
    dp[i] = (dp[i-1]%mod + dp[i-2]%mod)%mod
}
console.log(String(dp[N]))

// 00:13:02 맞았습니다