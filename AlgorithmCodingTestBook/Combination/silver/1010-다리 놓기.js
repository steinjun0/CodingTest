const [[T], ...testcases] = require('fs').readFileSync(process.platform === 'linux' ? '/dev/stdin' : require('path').resolve(__dirname,'../../../testcase.txt'))
    .toString()
    .trim()
    .split('\n')
    .map(row=>row.split(' ').map(Number))

const maxCount = 30
const dp = Array.from({length: maxCount+1},()=>Array(maxCount+1).fill(1))
for(let i=0;i<=maxCount;i++){
    dp[i][1] = i
    dp[0][i] = 0
    dp[i][i] = 1
}

for(let i=1;i<=maxCount;i++){
    for(let j=1;j<=maxCount;j++){
        if(j>i) dp[i][j] = 0
        else dp[i][j] = dp[i-1][j] + dp[i-1][j-1]
    }
}

const result = []
for(let count=0;count<T;count++){
    const [N,M] = testcases[count]
    result.push(dp[M][N])
}
console.log(result.join('\n'))

// 00:16:30 맞았습니다!