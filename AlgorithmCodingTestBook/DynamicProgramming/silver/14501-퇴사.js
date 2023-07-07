const [[N], ...dates] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' :require('path').resolve(__dirname,'../../../testcase.txt') )
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const dp = Array(N+1).fill(0)
let max = 0
for(let i=1;i<=N;i++){
    const [d,c] = dates[i-1]
    if(i+d-1 <= N) {
        dp[i+d-1] = Math.max(dp[i-1] + c, dp[i+d-1])
    }
    if(max < dp[i]){
        max=dp[i]
    }else{
        dp[i] = max
    }
}
console.log(max)

// 00:30:17 맞았습니다!