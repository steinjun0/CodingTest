const input = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(Number)

const max = Math.max(...input.slice(1))
const dp = Array(max+1).fill(0)
dp[0] = 1
for(let n=1;n<=3;n++){
    for(let i=n;i<=max;i++){
        dp[i] += dp[i-n]
    }
}
const result = Array(input[0]-1).fill(0)
for(let i=0;i<input[0];i++){
    result[i] = dp[input[i+1]]
}
console.log(result.join('\n'))
// 00:20:14 맞았습니다!