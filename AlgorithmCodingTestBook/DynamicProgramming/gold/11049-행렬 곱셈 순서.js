const [[N],...matrix] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const dp = Array.from({length: N}, ()=>Array(N).fill(0))

if(N === 1) return console.log(0)
if(N === 2) return console.log(matrix[0][0]*matrix[0][1]*matrix[1][1])

dp[0][0] = 0
dp[0][1] = matrix[0][0]*matrix[0][1]*matrix[1][1]

for(let i=2;i<N;i++){
    for(let j=0;j<i;j++){
        dp[j][i] = dp[j][i-1] + 
                    matrix[j][0] * matrix[i][0] * matrix[i][1]
        if(j !== 0){
            dp[j][i] += dp[0][j-1] +
                    matrix[0][0] * matrix[0][1] * matrix[i][1]
        }
    }
}

console.table(dp)
// 01:24:00 포기